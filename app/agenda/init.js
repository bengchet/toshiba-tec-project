import Agenda from 'agenda'
import mqtt from 'mqtt'
import gcm from '../gcm/gcm'
import logger from '../logger/logger'

let clients = [];
var mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL,
        {
            clientId: 'mqttjs_toshiba',
            connectTimeout: 5 * 1000
        })

mqttClient.on('connect', function() {
	console.log('Mqtt for check status & button trigger is now connected');
	mqttClient.subscribe('+/OUT/RFID/+', {qos:1});
})

mqttClient.on('message', function(topic, msg) {
	if (topic.indexOf('/OUT/RFID/BTN1') != -1) {
            var json = JSON.parse(msg.toString());
	    var pos = json['POS'];
	    var btn = json['BUTTON'];
	    var message = 'The button from device with position ' + pos + ' has been ';
 	    message += (btn == "0")? 'turned off': 'triggered';
	    console.log(message);
            logger.info(message);
            gcm.sendCustomGCMMessage(message);	    
        }
	else if(topic.indexOf('/OUT/RFID/STATUS') !=-1) {
	    var json = JSON.parse(msg.toString());
	    var pos = json['POS'];
	    var rfid = json['RFID'];
	    var led = json['BUTTON'];
	    var id = topic.substring(0, topic.indexOf('/'));
	    console.log(pos, rfid, led, id);
	    mqttClient.publish(
	    id + '/IN/RFID/LED',
            JSON.stringify({ CTRL_ID: id, RFID: rfid, POS: pos, LED: led == "0"? "ON":"OFF"}),
            { qos: 1 });
	}
})

//const agenda = new Agenda()
const agenda = new Agenda(
    { db: { address: process.env.DATABASE_URL, collection: 'jobs' } }
);

// define jobs here

agenda.define('Send Notification', (job, done) => {
    console.log('Firing notification...')
    gcm.sendGCMMessage(job.attrs.data.id, job.attrs.data.code, job.attrs.data.messageCount)
    done()
    job.remove()
})

agenda.define('Ping', (job, done) => {
    if (job.attrs.data.runAtFirstTime == true) {
        job.attrs.data.runAtFirstTime = false;
        job.repeatEvery('20 seconds');
        job.schedule('20 seconds');
        job.save();
        return done();
    }

    let id = job.attrs.data.device.id;
    if (!id) return done()
    if (!(id in clients)) {
        // create a new client array
        clients[id] = {
            client: null,
            clientConnectTimeout: null,
            status: 0,
            retries: job.attrs.data.device.retries,
            disconnectReason: ''
        }
    }

    if (clients[id].client) return done()

    clients[id].client = mqtt.connect(process.env.MQTT_BROKER_URL,
        {
            clientId: 'mqttjs_' + id,
            connectTimeout: 5 * 1000
        }
    )

    console.log('Status from device ' + id + ': ' + job.attrs.data.device.status, ', Retries: ' + job.attrs.data.device.retries.toString())
    
    // obtain the retries record
    clients[id].retries = job.attrs.data.device.retries;
    // reset status
    clients[id].status = 0;
    
    var summarize = function () {
        if (clients[id].status == 0) {
            if (clients[id].retries < 3) {
                clients[id].retries = clients[id].retries + 1;
                if (clients[id].retries == 3) {
                    // fire notification once
                    agenda.now('Send Notification', { id: job.attrs.data.device.id, code: 1, messageCount: job.attrs.data.device.messageCount })
                    job.attrs.data.device.messageCount = (job.attrs.data.device.messageCount + 1) % 65536;
                }
                job.attrs.data.device.retries = clients[id].retries;
            }
        }
        else {
            if (clients[id].retries == 3) {
                agenda.now('Send Notification', { id: job.attrs.data.device.id, code: 0, messageCount: job.attrs.data.device.messageCount })
                job.attrs.data.device.messageCount = (job.attrs.data.device.messageCount + 1) % 65536;
            }
            clients[id].retries = job.attrs.data.device.retries = 0;
        }
        job.attrs.data.device.status = clients[id].status;
        job.save()
        //console.log(clients[id])
    }

    clients[id].client.on('connect', function () {
        //console.log('Connected.')
        clients[id].clientConnectTimeout = setTimeout(() => {
            clients[id].disconnectReason = 'response timeout'
            clients[id].client.end()
        }, 10000)
        clients[id].client.subscribe(id + '/OUT/CHECK', { qos: 1 })
        clients[id].client.publish(id + '/IN/CHECK',
            JSON.stringify({ CTRL_ID: id }),
            { qos: 1 })
    })

    clients[id].client.on('message', function (topic, message) {
        //console.log('Message arrived.')
        if (topic == id + '/OUT/CHECK' &&
            JSON.parse(message.toString())['CTRL_ID'] == id) {
            clients[id].status = 1;
            console.log(new Date() + ' Connection alive from device ' + id + '!')
            clients[id].client.unsubscribe(id + '/OUT/CHECK')
        }
        clients[id].client.end()
    })

    clients[id].client.on('close', function () {
        console.log('Connection closed from device ' + id + '.' + (clients[id].disconnectReason ? ' Reason: ' + clients[id].disconnectReason : ''));
        clients[id].client.removeAllListeners();
        clients[id].client = null;
        if (clients[id].clientConnectTimeout) {
            clearTimeout(clients[id].clientConnectTimeout)
            clients[id].clientConnectTimeout = null
        }
        clients[id].disconnectReason =  '';
        summarize();
    })

    clients[id].client.on('error', function (e) {
        console.log(e)
        clients[id].disconnectReason = e.toString()
        clients[id].client.end()
    })

    return done()
})

// agenda ready, starts agenda
agenda.on('ready', () => {
    console.log('Agenda ready');
    agenda._collection.update(
        { lockedAt: { $exists: true } },
        { $set: { lockedAt: null } })
        .then(() => {
            //agenda.processEvery('2 hours');

            // start the agenda
            agenda.start();

        }).catch(err => {
            console.log(err.toString())
        })
})

let graceful = () => {
    agenda.stop(() => process.exit(0))
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);

/*module.exports = function (mongoose) {
    //agenda.mongo(mongoose.connection.collection('jobs').conn.db, 'jobs', () => {
    //});
    return agenda;
}*/

module.exports = agenda;
