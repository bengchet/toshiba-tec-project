import gcm from 'node-gcm'
import Device from '../models/device'

const retry_times = 4; //the number of times to retry sending the message if it fails
const sender = new gcm.Sender(process.env.GCM_API_KEY); //create a new sender


let constructMessage = (type, msg) => {
    if (type == 'ios') {
        let ios_msg = {};

        return ios_msg;
    }
    else if (type == 'browser') {
        let browser_msg = {}
        browser_msg.notification = {
            "title": msg.data.title,
            "body": msg.data.message,
            "icon": "assets/icon/icon.png",
            "click_action": "http://localhost:8100",
            "sound": "default"
        }
        return browser_msg
    }
    return msg;
}

let sendGCMMessage = (id, code, count) => {

    //create a new message
    let message = {};
    let data = {
        'title': 'Toshiba Tec Project',
        'sound': 'default',
        'content-available': '1',
        'notId': count ? count : 0,
        'timestamp': new Date().getTime()
    };
    if (code == 0) { // ping success
        data.message = 'Device ' + id + ' is back online!'
    } else { // ping failure
        data.message = 'Device ' + id + ' is disconnected!'
    }
    message.data = data;
    message.priority = "high";
    message.restricted_package_name = "com.cytron.toshibatec";

    Device.find({}).then((devices) => {
        // browser
        var browserRegistrationTokens = devices.filter(item => { return item.deviceType == 'browser' }).map(item => {
            return item.deviceToken
        })
        if (browserRegistrationTokens.length > 0) {
            sender.send(new gcm.Message(constructMessage('browser', message)), { registrationTokens: browserRegistrationTokens }, retry_times,
                function (result) {
                    console.log(result)
                },
                function (err) {
                    console.log(err)
                })
        }
        // ios
        var iosRegistrationTokens = devices.filter(item => { return item.deviceType == 'ios' }).map(item => {
            return item.deviceToken
        })
        if (iosRegistrationTokens.length > 0) {
            sender.send(new gcm.Message(constructMessage('ios', message)), { registrationTokens: iosRegistrationTokens }, retry_times,
                function (result) {
                    console.log(result)
                },
                function (err) {
                    console.log(err)
                })
        }
        //android
        var androidRegistrationTokens = devices.filter(item => { return item.deviceType == 'android' }).map(item => {
            return item.deviceToken
        })
        if (androidRegistrationTokens.length > 0) {
            sender.send(new gcm.Message(message), { registrationTokens: androidRegistrationTokens }, retry_times,
                function (result) {
                    console.log(result)
                },
                function (err) {
                    console.log(err)
                })
        }
    }).catch((err) => {
        console.log(err)
    });
}

module.exports = {
    sendGCMMessage
}