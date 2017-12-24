var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    deviceToken: {
        type: String,
        required: true
    },
    deviceType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Device', DeviceSchema);