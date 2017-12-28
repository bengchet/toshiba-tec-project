import mqtt from 'mqtt'
var passport = require('../passport/passport');
let _io;

var initialize = function (url) {

    let broker_url = url;
    //url = '/' + url;
    if(broker_url && broker_url.indexOf('mqtt://') == -1){
        broker_url = 'mqtt://' + broker_url;
    }

    let client = mqtt.connect( broker_url || 'mqtt://localhost', {
        connectTimeout: 5 * 1000
    }), clientStatus = false;
    
    client.on('connect', () => {
        clientStatus = true;
        _io.of(url).emit('mqtt:connection', { result: true })
    })
    
    client.on('close', () => {
        clientStatus = false;
        _io.of(url).emit('mqtt:connection', { result: false })
    })
    
    client.on('error', () => {
        clientStatus = false;
        _io.of(url).emit('mqtt:connection', { result: false })
    })
    
    client.on('message', (topic, message) => {
        //console.log(topic, message.toString())
        let room = topic.substring(0, topic.indexOf('/')) + '/#';
    
        //console.log(_io.of(url).adapter.rooms);
    
        // check if there is any client for room, if not automatically unsubscribe
        if (!_io.of(url).adapter.rooms[room]) {
            client.unsubscribe(room)
        } else {
            _io.of(url).in(room).emit('mqtt:message', { 'destinationName': topic, 'payloadString': message.toString() });
        }
    
        if (!_io.of(url).adapter.rooms[topic]) {
            client.unsubscribe(topic);
        } else {
            _io.of(url).in(topic).emit('mqtt:message', { 'destinationName': topic, 'payloadString': message.toString() });
        }
    
    })

    _io.of(url).on('connection', function (socket) {
        console.log('Client ' + socket.id + ' connected')
        //console.log(io.sockets.adapter.rooms)
        socket.on('authentication', function (data) {
            if (new Buffer(data, 'base64').toString() == process.env.USERNAME + ':' + process.env.PASSWORD) {
                socket.isAuthenticated = true;
                socket.emit('authentication', { 'success': true })
            }
            else {
                socket.isAuthenticated = false;
                socket.emit('authentication', { 'success': false })
            }
        })
        socket.on('mqtt:publish', function (data) {
            if (socket.isAuthenticated) {
                client.publish(data.topic, data.payload, { qos: data.qos })
            }
        })

        socket.on('mqtt:connection', function () {
            //console.log('Request connection status from client')
            socket.emit('mqtt:connection', { result: clientStatus })
        })

        socket.on('mqtt:subscribe', function (data) {
            //console.log('Receiving request for mqtt:subscribe')
            if (socket.isAuthenticated) {
                let roomId = data.topic;
                if (roomId) {
                    if (!_io.of(url).adapter.rooms[roomId]) {
                        //console.log('subscribing topic')
                        client.subscribe(data.topic, { qos: data.qos })
                    }
                    socket.join(roomId, () => {
                        //console.log(_io.of(url).adapter.rooms)
                    })
                }
            }
        })

        socket.on('mqtt:unsubscribe', function (topic) {
            if (socket.isAuthenticated) {
                if (topic in socket.rooms)
                    socket.leave(topic)
                if (!_io.of(url).adapter.rooms[topic]) {
                    client.unsubscribe(topic)
                }
            }
            //console.log(_io.of(url).adapter.rooms)
        })

        socket.on('disconnect', function () {
            console.log('Client ' + socket.id + ' disconnected')
            //console.log(_io.of(url).adapter.rooms)
        })
    })
    
    return client;
}

module.exports = function (io) {
    _io = io;
    return {
        initialize
    }
}