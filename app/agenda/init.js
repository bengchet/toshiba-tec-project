import Agenda from 'agenda'
import mqtt from 'mqtt'
import gcm from '../gcm/gcm'

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

    let client = mqtt.connect(process.env.MQTT_BROKER_URL, { clientId: 'mqttjs_' + id }),
        clientConnectTimeout,
        status = 0,
        retries = job.attrs.data.device.retries,
        reason = ''

    console.log('Status from device ' + id + ': ' + job.attrs.data.device.status, ', Retries: ' + job.attrs.data.device.retries.toString())

    var summarize = function () {
        if (status == 0) {
            if (retries < 3) {
                retries = retries + 1;
                if (retries == 3) {
                    // fire notification once
                    agenda.now('Send Notification', {id: job.attrs.data.device.id, code: 1, messageCount:job.attrs.data.device.messageCount})
                    job.attrs.data.device.messageCount = (job.attrs.data.device.messageCount + 1) % 65536;
                }
                job.attrs.data.device.retries = retries;
            }
        }
        else {
            if (retries == 3) {
                agenda.now('Send Notification', {id: job.attrs.data.device.id, code: 0, messageCount:job.attrs.data.device.messageCount})
                job.attrs.data.device.messageCount = (job.attrs.data.device.messageCount + 1) % 65536;
            }
            retries = job.attrs.data.device.retries = 0;
        }
        job.attrs.data.device.status = status;
        job.save()
    }

    client.on('connect', function () {
        //console.log('Connected.')
        clientConnectTimeout = setTimeout(() => {
            reason = 'response timeout'
            client.end()
        }, 10000)
        client.subscribe(id + '/OUT/CHECK', { qos: 1 })
        client.publish(id + '/IN/CHECK',
            JSON.stringify({ CTRL_ID: id }),
            { qos: 1 })
    })

    client.on('message', function (topic, message) {
        //console.log('Message arrived.')
        if (topic == id + '/OUT/CHECK' &&
            JSON.parse(message.toString())['CTRL_ID'] == id) {
            status = 1;
            console.log(new Date() + ' Connection alive from device ' + id + '!')
            client.unsubscribe(id + '/OUT/CHECK')
        }
        client.end()
    })

    client.on('close', function(){
        console.log('Connection closed.' + (reason? ' Reason: ' + reason:''));
        client.removeAllListeners();
        client = null;
        if (clientConnectTimeout) {
            clearTimeout(clientConnectTimeout)
            clientConnectTimeout = null
        }
        summarize();
    })

    client.on('error', function (e) {
        console.log(e)
        reason = e.toString()
        client.end()
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
            agenda.processEvery('10 seconds');

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
