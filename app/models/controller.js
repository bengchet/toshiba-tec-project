var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var task = require('../agenda/create')

var ControllerSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Number,
        default: Date.now()
    }
});

ControllerSchema.pre('save', function (next) {
    let device = this;
    task.createJob('Ping', '10 seconds',
        {
            device: {
                id: device.id,
                status: 0,
                retries: 0,
                messageCount: 0
            }
        })
        .then(()=>next())
        .catch(err=>next(new Error(err)))
})

module.exports = mongoose.model('Controller', ControllerSchema);