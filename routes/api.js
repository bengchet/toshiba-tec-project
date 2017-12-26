var express = require('express');
var router = express.Router();
import cors from 'cors'
import Device from '../app/models/device'
import Controller from '../app/models/controller'

var passport      = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(function(username, password, done) {
    if (username == process.env.USERNAME && password == process.env.PASSWORD) {
        return done(null, true);
	}
	return done(null, false);
}));

router.use(cors())

router.get('/getRegisteredControllers', function(req, res, next){
    Controller.find({}).then(controllers=>{
        res.json({success: true, result: controllers.map(controller=>{
            return controller.id
        })})
    }).catch(e=>{
        console.log(e)
        res.json({ success: false, msg: 'Server error' })
    })
})

router.post('/addController', 
    passport.authenticate('basic', {session: false}),
    function(req, res, next){
    Controller.findOne({ id: req.body.id }).then(controller=>{
        if(!controller){
            new Controller({
                id: req.body.id,
            }).save((err)=>{
                if(!err) return res.json({success: true, msg: 'Successfully register controller'})
                return res.json({success: false, msg: 'Error register controller'})
            })
        }
        else{
            res.json({ success: false, msg: 'Controller already existed!' })
        }
    }).catch(e=>{
        console.log(e)
        res.json({ success: false, msg: 'Server error, fail to register controller' })
    })
})

router.post('/addDeviceId', 
    passport.authenticate('basic', {session: false}),
    function (req, res, next) {
    console.log(req.body)
    Device.findOne({ uuid: req.body.deviceId }).then(device => {
        console.log(device)
        if (!device) {
            new Device({
                uuid: req.body.deviceId,
                deviceToken: req.body.deviceToken,
                deviceType: req.body.deviceType
            }).save((err) => {
                if (err) {
                    console.log(err);
                    res.json({ success: false, msg: 'Failed to register new device.' });
                }
                else
                    res.json({ success: true, msg: 'Device registered to the user.' });
            })
        }
        else {
            Device.update(
                { _id: device._id },
                { $set: { deviceType: req.body.deviceType, deviceToken: req.body.deviceToken } },
                { upsert: true },
                function (err) {
                    if (err) {
                        console.log(err)
                        res.json({ success: false, msg: 'Device update failed.' });
                    }
                    else
                        res.json({ success: true, msg: 'Device is successfully updated.' });
                })

        }
    }).catch(err => {
        res.json({ success: false, msg: 'Server error' })
    })

});

router.post('/removeDeviceId', 
    passport.authenticate('basic', {session: false}),
    function (req, res, next) {
    console.log(req.body)
    res.json({ success: true })
})

module.exports = router;
