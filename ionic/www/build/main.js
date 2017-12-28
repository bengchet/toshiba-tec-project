webpackJsonp([4],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Constants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return firebaseConfig; });
var Config = (function () {
    function Config() {
        this.host = 'http://localhost:3001';
        this.endpoint = this.host + '/api';
    }
    return Config;
}());

var Constants = {
    'UNAUTHORIZED_MESSAGE': 'Seems like we have problem identifying your account. Please login again.',
    'OFFLINE_MESSAGE': 'Seems like there is no Internet connection. Please check your Internet connection.',
    'NOT_FOUND': 'Seems like we have problem connecting to server. Please try again later.',
    'SERVER_ERR': 'Seems like there is server problem. Please consult our technical support for more details.'
};
var firebaseConfig = {
    apiKey: "AIzaSyCyLL3j363FRmxxa05m8pBoYXl-_0wuBAo",
    authDomain: "nbc-ionic2-push-notification.firebaseapp.com",
    databaseURL: "https://nbc-ionic2-push-notification.firebaseio.com",
    projectId: "nbc-ionic2-push-notification",
    storageBucket: "nbc-ionic2-push-notification.appspot.com",
    messagingSenderId: "620756868871"
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertProvider = (function () {
    function AlertProvider(alertCtrl, loadingCtrl, toastCtrl) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
    }
    AlertProvider.prototype.dismissAll = function () {
        this.dismissAlert();
        this.dismissToast();
        //this.dismissLoading();
    };
    AlertProvider.prototype.showAlert = function (title, message, buttons, inputs, mode, cb) {
        var _this = this;
        // dismiss any existing alerts
        this.dismissAlert();
        var _buttons = [];
        if (buttons) {
            _buttons = buttons;
        }
        else {
            _buttons = [{
                    text: 'OK',
                    handler: function () { }
                }];
        }
        this.alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: _buttons,
            inputs: inputs ? inputs : [],
            mode: mode ? mode : null
        });
        if (cb)
            this.alertCallback = cb;
        this.alert.onDidDismiss(function () {
            _this.alert = null;
            if (_this.alertCallback) {
                _this.alertCallback();
                _this.alertCallback = null;
            }
        });
        this.alert.present();
    };
    AlertProvider.prototype.dismissAlert = function () {
        if (this.alert) {
            this.alert.dismiss();
        }
    };
    AlertProvider.prototype.showToast = function (message, duration, showCloseBtn) {
        var _this = this;
        this.dismissToast();
        this.toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            showCloseButton: showCloseBtn,
            position: 'bottom',
            closeButtonText: 'Close'
        });
        this.toast.onDidDismiss(function () {
            _this.toast = null;
        });
        this.toast.present();
    };
    AlertProvider.prototype.dismissToast = function () {
        if (this.toast)
            this.toast.dismiss();
    };
    AlertProvider.prototype.showLoading = function (action, content) {
        var _this = this;
        if (action)
            this.loadingCallback = action;
        if (!this.loading) {
            this.loading = this.loadingCtrl.create({
                cssClass: 'loginLoading',
                content: content ? content : null
            });
            this.loading.onDidDismiss(function (status) {
                _this.loading = null;
                if (_this.loadingCallback) {
                    if (status != null)
                        _this.loadingCallback(status);
                    else
                        _this.loadingCallback();
                }
                _this.loadingCallback = null;
            });
            this.loading.present();
            this.loadingTimeout = setTimeout(function () {
                if (_this.loading) {
                    // clear all callback actions first
                    _this.loadingCallback = function () {
                        _this.showToast('Not responding', 3000, true);
                    };
                    _this.dismissLoading();
                    _this.loadingTimeout = null;
                }
            }, 30000);
        }
    };
    AlertProvider.prototype.dismissLoading = function (status) {
        if (this.loading) {
            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
                this.loadingTimeout = null;
            }
            if (status != null)
                this.loading.dismiss(status);
            else
                this.loading.dismiss();
        }
    };
    AlertProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["t" /* ToastController */]])
    ], AlertProvider);
    return AlertProvider;
}());

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alert__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_push__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { Service } from './../service-manager';



// Native



// Storage



var PushServiceProvider = (function () {
    function PushServiceProvider(platform, device, push, events, storage, zone, alertService, api) {
        var _this = this;
        this.platform = platform;
        this.device = device;
        this.push = push;
        this.events = events;
        this.storage = storage;
        this.zone = zone;
        this.alertService = alertService;
        this.api = api;
        this.pushOptions = {
            android: {
                senderID: '620756868871',
                forceShow: 'true'
            },
            ios: {
                senderID: '620756868871',
                gcmSandbox: true,
                alert: true,
                badge: true,
                sound: true,
                clearBadge: true
            },
            windows: {}
        };
        this.notifications = [];
        this.isDeviceRegistered = false;
        this.registerSchedulerInterval = 10000;
        this.isLoggedIn = false;
        this.subscription = __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].create(function (observer) {
            _this.observer = observer;
        });
        this.registerFunc = function () {
            console.log('[PUSH] Running scheduler...');
            if (!_this.isLoggedIn || !_this.isDeviceRegistered) {
                _this.restartScheduler();
            }
            else {
                _this.registerDevice().then(function (success) {
                    if (!success)
                        _this.restartScheduler();
                    else {
                        console.log('[PUSH] Successfully registered device!');
                        _this.stopScheduler();
                    }
                }).catch(function (Err) {
                    _this.restartScheduler();
                });
            }
        };
        platform.ready().then(function () {
            if (_this.platform.is('mobile')) {
                _this.device_uuid = _this.device.uuid;
                console.log("[PUSH] Device uuid:", _this.device_uuid);
            }
            else {
                var nav = window.navigator;
                var screen_1 = window.screen;
                var guid = nav.mimeTypes.length;
                guid += nav.userAgent.replace(/\D+/g, '');
                guid += nav.plugins.length;
                guid += screen_1.height || '';
                guid += screen_1.width || '';
                guid += screen_1.pixelDepth || '';
                _this.device_uuid = guid;
                _this._desktopReadyPromise = new Promise(function (rs) { _this._desktopResolve = rs; });
                _this.triggerReady();
            }
        });
        events.subscribe('user:login', function () {
            _this.isLoggedIn = true;
        });
        events.subscribe('user:logout', function () {
            console.log('user logout');
            _this.isLoggedIn = false;
            // when logout, trigger register func
            _this.triggerScheduler();
        });
        // trigger register func at start
        this.triggerScheduler();
    }
    PushServiceProvider.prototype.isInitialised = function () {
        return this.isDeviceRegistered;
    };
    PushServiceProvider.prototype.isWiFiRequired = function () {
        return false;
    };
    PushServiceProvider.prototype.isCordovaRequired = function () {
        return true;
    };
    PushServiceProvider.prototype.isLoggedInRequired = function () {
        return false;
    };
    PushServiceProvider.prototype.name = function () {
        return 'PushService';
    };
    PushServiceProvider.prototype.triggerScheduler = function () {
        if (this.platform.is('mobile')) {
            console.log('[PUSH] Trigger scheduler...');
            this.registerFunc();
        }
    };
    PushServiceProvider.prototype.restartScheduler = function () {
        // start scheduler
        this.registerScheduler = setTimeout(this.registerFunc.bind(this), this.registerSchedulerInterval);
    };
    PushServiceProvider.prototype.stopScheduler = function () {
        clearTimeout(this.registerScheduler);
    };
    PushServiceProvider.prototype.init = function () {
        var _this = this;
        console.log('[PUSH] Starting Push Service');
        // local and push notification settings
        Promise.all([
            this.storage.get('notifications'),
            this.initNotificationsCounter()
        ]).then(function (data) {
            // store the data
            if (data[0])
                _this.notifications = data[0];
            else {
                _this.notifications = [];
                _this.updateStorage();
            }
            console.log('[PUSH] Push notifications list: ', _this.notifications);
            _this.pushObject = _this.push.init(_this.pushOptions);
            _this.pushObject.on('notification').subscribe(function (notification) {
                var action = function () {
                    console.log('[PUSH] Received a notification', JSON.stringify(notification));
                    // add notifcations to storage
                    _this.zone.run(function () {
                        _this.addNotification(notification);
                    });
                };
                if (_this.platform.is('ios')) {
                    _this.pushObject.finish().then(function () {
                        action();
                    });
                }
                else if (_this.platform.is('android')) {
                    action();
                }
            });
            _this.pushObject.on('registration').subscribe(function (registration) {
                console.log('[PUSH] Device registered ' + JSON.stringify(registration));
                _this.registerId = registration.registrationId;
                _this.isDeviceRegistered = true;
            });
            _this.pushObject.on('error').subscribe(function (error) {
                console.error('[PUSH] Error with Push plugin', error);
                //this.alertService.showToast('We have error with push notification activation. Please restart the app', 3000, true);
                _this.isDeviceRegistered = false;
            });
        });
    };
    PushServiceProvider.prototype.updateStorage = function () {
        return this.storage.set('notifications', this.notifications);
    };
    PushServiceProvider.prototype.update = function () {
        var _this = this;
        this.storage.get('notifications').then(function (data) {
            // store the data
            if (data)
                _this.notifications = data;
            else {
                _this.notifications = [];
            }
            //this.broadcast();
        });
    };
    PushServiceProvider.prototype.addNotification = function (notification) {
        var _this = this;
        //let array = this.notifications.map(function (d) { return d['additionalData']['google.message_id']; });
        //let idx = array.indexOf(notification['additionalData']['google.message_id']);
        var array = this.notifications.map(function (d) { return d['additionalData']['notId']; });
        var idx = array.indexOf(notification['additionalData']['notId']);
        //console.log(array, notification)
        if (idx == -1 && notification['additionalData']['jobId']) {
            this.notifications.push(notification);
            // update storage
            this.updateStorage().then(function () {
                // broadcast new notifications list
                _this.observer.next(true);
            });
        }
    };
    PushServiceProvider.prototype.removeNotification = function (id) {
        var _this = this;
        // filter any notification that related to same id
        var isRemoved = false;
        var array = this.notifications.filter(function (item) {
            if (item.additionalData.jobId == id)
                isRemoved = true;
            return (item.additionalData.jobId != id);
        });
        if (isRemoved) {
            this.notifications = array;
            // update storage
            this.updateStorage().then(function () {
                // broadcast new notifications list
                _this.observer.next(false);
            });
        }
    };
    PushServiceProvider.prototype.getAmount = function () {
        return this.notifications.length;
    };
    PushServiceProvider.prototype.registerDevice = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('mobile')) {
                var _request = function () {
                    var type = _this.platform.is('ios') ? 'ios' : 'android';
                    _this.api.registerDevice({
                        deviceId: _this.device_uuid,
                        deviceToken: _this.registerId,
                        deviceType: type
                    }).subscribe(function (resp) {
                        console.log('[PUSH] Got response from server', resp);
                        if (resp.success) {
                            console.log('[PUSH] Push registration successful!');
                            _this.storage.set('fcm_token', _this.registerId).then(function () { return resolve(true); });
                        }
                        else {
                            console.log('[PUSH] Push registration failed!');
                            resolve(false);
                            // set retry after 5 seconds 
                            //setTimeout(_request, 5000);
                        }
                    });
                };
                _request();
            }
            else {
                resolve(true);
            }
        });
    };
    PushServiceProvider.prototype.unregisterDevice = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('mobile')) {
                _this.api.unregisterDevice({
                    deviceId: _this.device_uuid,
                }).subscribe(function (resp) {
                    console.log('[PUSH] Push unregister response: ', resp);
                    resolve(resp.success);
                }, function (err) {
                    console.log('[PUSH] Push unregister failed!', err);
                    resolve(false);
                });
            }
            else {
                resolve(true);
            }
        });
    };
    PushServiceProvider.prototype.unregisterPushService = function () {
    };
    PushServiceProvider.prototype.initNotificationsCounter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('mobile')) {
                _this.getLocalNotificationsCounter().then(function (val) {
                    if (!val) {
                        _this.setLocalNotificationsCounter(0).then(function () {
                            resolve();
                        });
                    }
                    else
                        resolve();
                });
            }
            else
                resolve();
        });
    };
    PushServiceProvider.prototype.setLocalNotificationsCounter = function (val) {
        return this.storage.set('localCounter', val);
    };
    PushServiceProvider.prototype.getLocalNotificationsCounter = function () {
        return this.storage.get('localCounter');
    };
    // Desktop
    PushServiceProvider.prototype.resetUI = function () {
        var _this = this;
        // [START get_token]
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        this.messaging.getToken()
            .then(function (currentToken) {
            if (currentToken) {
                _this.sendTokenToServer(currentToken);
            }
            else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
                // Show permission UI.
                _this.setTokenSentToServer(false);
            }
        })
            .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
            _this.setTokenSentToServer(false);
        });
    };
    PushServiceProvider.prototype.initDesktop = function () {
        var _this = this;
        navigator.serviceWorker.register('service-worker.js')
            .then(function (registration) {
            _this.messaging = __WEBPACK_IMPORTED_MODULE_8_firebase__["messaging"]();
            _this.messaging.useServiceWorker(registration);
            _this.messaging.onTokenRefresh(function () {
                _this.messaging.getToken().then(function (token) {
                    _this.setTokenSentToServer(false);
                    _this.sendTokenToServer(token);
                    _this.resetUI();
                });
            });
            _this.messaging.onMessage(function (payload) {
                console.log(payload);
            });
            _this.resetUI();
            _this.isDeviceRegistered = true;
            _this.events.publish('desktopPush:ready');
        });
    };
    PushServiceProvider.prototype.onDesktopReady = function () {
        return this._desktopReadyPromise;
    };
    PushServiceProvider.prototype.triggerReady = function () {
        var _this = this;
        if (this.isDeviceRegistered) {
            this._desktopResolve();
        }
        else {
            this.events.subscribe('desktopPush:ready', function () {
                _this._desktopResolve();
            });
        }
    };
    PushServiceProvider.prototype.isTokenSentToServer = function () {
        return window.localStorage.getItem('sentToServer') == 1;
    };
    PushServiceProvider.prototype.setTokenSentToServer = function (sent) {
        window.localStorage.setItem('sentToServer', sent ? 1 : 0);
    };
    PushServiceProvider.prototype.isPermissionGranted = function () {
        return window.localStorage.getItem('gcm_desktop_notifcation') == 1;
    };
    PushServiceProvider.prototype.setPermissionGranted = function (granted) {
        window.localStorage.setItem('gcm_desktop_notification', granted ? 1 : 0);
    };
    PushServiceProvider.prototype.requestPermission = function () {
        var _this = this;
        this.messaging.requestPermission().then(function () {
            console.log('[PUSH] Desktop notification permission granted.');
            _this.setPermissionGranted(true);
            _this.resetUI();
        }).catch(function (e) {
            console.log('[PUSH] Unable to get desktop permission to notify.', e);
            _this.setPermissionGranted(false);
        });
    };
    PushServiceProvider.prototype.deleteToken = function () {
        var _this = this;
        this.messaging.getToken()
            .then(function (currentToken) {
            _this.messaging.deleteToken(currentToken)
                .then(function () {
                console.log('Token deleted.');
                _this.setTokenSentToServer(false);
                _this.resetUI();
            }).catch(function (err) {
                console.log('Unable to delete token. ', err);
            });
        });
    };
    PushServiceProvider.prototype.sendTokenToServer = function (token) {
        if (!this.isTokenSentToServer()) {
            this.setTokenSentToServer(true);
            this.api.registerDevice({
                deviceId: this.device_uuid,
                deviceToken: token,
                deviceType: 'browser'
            }).subscribe(function (resp) {
                console.log('[PUSH] Got response from server', resp);
                if (resp.success) {
                    console.log('[PUSH] Desktop Push registration successful!');
                }
                else {
                    console.log('[PUSH] Desktop Push registration failed!');
                }
            });
        }
        else {
            console.log('[PUSH] Token already sent to server so won\'t send it again ' +
                'unless it changes');
        }
    };
    PushServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_0__alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_7__api_service__["a" /* ApiService */]])
    ], PushServiceProvider);
    return PushServiceProvider;
}());

//# sourceMappingURL=push-service.js.map

/***/ }),

/***/ 164:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 164;

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/device/device.module": [
		603,
		2
	],
	"../pages/home/home.module": [
		604,
		3
	],
	"../pages/login/login.module": [
		605,
		1
	],
	"../pages/settings/settings.module": [
		606,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 206;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MqttProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_mqtt_mqttws31__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_mqtt_mqttws31___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_mqtt_mqttws31__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MqttProvider = (function () {
    function MqttProvider(storage, platform, http, events) {
        var _this = this;
        this.storage = storage;
        this.platform = platform;
        this.http = http;
        this.events = events;
        this.mqttConnectionStatus = false;
        this.mqttSubscribedTopics = [];
        this.mqttUrl = '';
        this.mqttPort = 8000;
        this.mqttOptions = {
            timeout: 10,
            keepAliveInterval: 10
        };
        this.mqttRegisteredBrokerList = [];
        this.callbacks = [];
        this.noReconnect = false;
        console.log('[mqtt] Initiating MQTT...');
        this.prepareReady();
        // create observer
        this._readyPromise = new Promise(function (res) { _this._readyResolve = res; });
        // check for default broker from broker list
        this.storage.get('mqttBrokers').then(function (value) {
            if (value && value.length > 0) {
                // update broker list
                _this.mqttRegisteredBrokerList = value;
                console.log(_this.mqttRegisteredBrokerList);
                // start broker
                _this.startBroker();
            }
        });
    }
    MqttProvider.prototype.ready = function () {
        return this._readyPromise;
    };
    MqttProvider.prototype.triggerReady = function () {
        this._readyResolve();
    };
    MqttProvider.prototype.prepareReady = function () {
        if (this.mqttConnectionStatus)
            this.triggerReady();
        else {
            this.events.subscribe('mqtt:ready', this.completed.bind(this));
        }
    };
    MqttProvider.prototype.completed = function () {
        this.events.unsubscribe('mqtt:ready');
        this.triggerReady();
    };
    MqttProvider.prototype.reset = function () {
        this.mqttRegisteredBrokerList = [];
        this.callbacks = [];
        if (this.disconnectTimeout) {
            clearTimeout(this.disconnectTimeout);
            this.disconnectTimeout = null;
        }
        if (this.failureTimeout) {
            clearTimeout(this.failureTimeout);
            this.failureTimeout = null;
        }
        this.mqttUrl = '';
        this.disconnectBroker();
    };
    MqttProvider.prototype.startBroker = function () {
        var _this = this;
        console.log('[mqtt] start broker');
        this.disconnectBroker();
        var defaultBroker = this.getDefaultBroker();
        console.log('Default', defaultBroker);
        if (!defaultBroker.url)
            return;
        this.mqttUrl = defaultBroker.url;
        this.mqttPort = defaultBroker.port ? parseInt(defaultBroker.port) : 8000;
        this.mqttOptions = defaultBroker.options ? defaultBroker.options : this.mqttOptions;
        if (this.failureTimeout)
            clearTimeout(this.failureTimeout);
        if (this.disconnectTimeout)
            clearTimeout(this.disconnectTimeout);
        var reconnectOnStart = function () {
            setTimeout(function () {
                if (_this.isOnline()) {
                    _this.noReconnect = false;
                    _this.connect();
                }
                else
                    reconnectOnStart();
            }, 2000);
        };
        //reconnectOnStart();
        this.triggerReady();
    };
    MqttProvider.prototype.callback = function (message) {
        //this.observer.next(message)
        for (var i in this.callbacks) {
            this.callbacks[i](message);
        }
    };
    MqttProvider.prototype.registerCallback = function (id, cb) {
        this.callbacks[id] = cb;
    };
    MqttProvider.prototype.unregisterCallback = function (id) {
        this.callbacks = this.callbacks.filter(function (item, key) {
            return key != id;
        });
    };
    /*getObservable() {
      return this.observable;
    }*/
    MqttProvider.prototype.publish = function (topic, payload, qos) {
        var msg = new __WEBPACK_IMPORTED_MODULE_4_ng2_mqtt_mqttws31__["Paho"].MQTT.Message(payload);
        msg.destinationName = topic;
        msg.qos = qos;
        this.mqttClient.send(msg);
    };
    MqttProvider.prototype.subscribeTopic = function (topic, qos) {
        if (this.mqttSubscribedTopics.indexOf(topic) == -1) {
            // add the topic
            this.mqttSubscribedTopics.push(topic);
            this.mqttClient.subscribe(topic, { qos: qos });
        }
        console.log(this.mqttSubscribedTopics);
    };
    MqttProvider.prototype.unsubscribeTopic = function (topic) {
        this.mqttClient.unsubscribe(topic, {});
        this.mqttSubscribedTopics = this.mqttSubscribedTopics.filter(function (_topic) {
            return _topic != topic;
        });
        console.log(this.mqttSubscribedTopics);
    };
    MqttProvider.prototype.unsubscribeTopics = function (topics) {
        var _this = this;
        topics.forEach(function (topic) {
            _this.unsubscribeTopic(topic);
        });
    };
    MqttProvider.prototype.unsubscribeAllTopics = function () {
        var _this = this;
        this.mqttSubscribedTopics.forEach(function (topic) {
            _this.unsubscribeTopic(topic);
        });
        this.mqttSubscribedTopics = [];
    };
    MqttProvider.prototype.onConnected = function () {
        var _this = this;
        this.events.publish('mqtt:ready');
        this.mqttConnectionStatus = true;
        console.log('[mqtt] MQTT connected');
        this.mqttSubscribedTopics.forEach(function (topic) {
            _this.mqttClient.subscribe(topic, { qos: 1 });
        });
    };
    MqttProvider.prototype.onLostConnection = function () {
        var _this = this;
        console.log('[mqtt] MQTT disconnected');
        this.mqttConnectionStatus = false;
        // Trying to reconnect
        if (!this.noReconnect) {
            var reconnectOnDisconnect_1 = function () {
                _this.disconnectTimeout = setTimeout(function () {
                    if (_this.isOnline())
                        _this.connect();
                    else
                        reconnectOnDisconnect_1();
                }, 0);
            };
            reconnectOnDisconnect_1();
        }
    };
    MqttProvider.prototype.onFailure = function (err) {
        var _this = this;
        console.log('[mqtt] MQTT Failure: ', err);
        this.mqttConnectionStatus = false;
        // Trying to reconnect
        if (!this.noReconnect) {
            var reconnectOnFailure_1 = function () {
                _this.failureTimeout = setTimeout(function () {
                    if (_this.isOnline())
                        _this.connect();
                    else
                        reconnectOnFailure_1();
                }, 3000);
            };
            reconnectOnFailure_1();
        }
    };
    MqttProvider.prototype.connect = function () {
        /*console.log('[mqtt] Connecting...')
        this.mqttClient = new Paho.MQTT.Client(this.mqttUrl, this.mqttPort, "clientId_" + Math.random().toString(16).substring(2, 8));
    
        this.mqttClient.onConnectionLost = this.onLostConnection.bind(this);
        this.mqttClient.onMessageArrived = this.callback.bind(this);
    
        let options = JSON.parse(JSON.stringify(this.mqttOptions));
        options.onSuccess = this.onConnected.bind(this);
        options.onFailure = this.onFailure.bind(this);
    
        this.mqttClient.connect(options);*/
    };
    MqttProvider.prototype.getAllSubscribedTopics = function () {
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(this.mqttSubscribedTopics);
    };
    MqttProvider.prototype.getRegisteredBrokerList = function () {
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(this.mqttRegisteredBrokerList);
    };
    MqttProvider.prototype.addBroker = function (url, port, options) {
        var _this = this;
        return new Promise(function (rs) {
            var isExist = _this.mqttRegisteredBrokerList.filter(function (broker) {
                return broker.url == url;
            }).length > 0;
            if (isExist)
                rs();
            else {
                _this.mqttRegisteredBrokerList.push({
                    'url': url,
                    'port': port ? port : 8000,
                    'options': options ? options : _this.mqttOptions,
                    'default': false
                });
                _this.storage.set('mqttBrokers', _this.mqttRegisteredBrokerList)
                    .then(function () { return rs(); });
            }
        });
    };
    MqttProvider.prototype.removeBroker = function (url) {
        var _this = this;
        return new Promise(function (rs) {
            if (url == _this.mqttUrl) {
                _this.disconnectBroker();
            }
            _this.mqttRegisteredBrokerList = _this.mqttRegisteredBrokerList.filter(function (broker) {
                return broker.url != url;
            });
            _this.storage.set('mqttBrokers', _this.mqttRegisteredBrokerList)
                .then(function () { return rs(); });
        });
    };
    MqttProvider.prototype.disconnectBroker = function () {
        console.log('[mqtt] Disconnect from current broker');
        if (this.mqttClient) {
            console.log('[mqtt] Got client, disconnect first...');
            this.noReconnect = true;
            if (this.isOnline() && this.mqttClient.isConnected()) {
                this.mqttClient.disconnect();
                this.unsubscribeAllTopics();
            }
            this.mqttClient = null;
            this.mqttSubscribedTopics = [];
        }
    };
    MqttProvider.prototype.setDefaultBroker = function (url) {
        this.mqttRegisteredBrokerList.forEach(function (broker) {
            if (broker.url != url) {
                broker.default = false;
            }
            else {
                broker.default = true;
            }
        });
        return this.storage.set('mqttBrokers', this.mqttRegisteredBrokerList);
    };
    MqttProvider.prototype.getDefaultBroker = function () {
        var brokers = this.mqttRegisteredBrokerList.filter(function (broker) {
            return broker.default;
        });
        if (brokers.length > 0)
            return brokers[0];
        else
            return {};
    };
    MqttProvider.prototype.isOnline = function () {
        if (this.platform.is('cordova')) {
            return navigator.connection.type !== Connection.NONE;
        }
        else {
            return navigator.onLine;
        }
    };
    MqttProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */]])
    ], MqttProvider);
    return MqttProvider;
}());

//# sourceMappingURL=mqtt.js.map

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceConsolePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_mqtt_mqtt__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the DeviceConsolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DeviceConsolePage = (function () {
    function DeviceConsolePage(navCtrl, navParams, events, mqtt) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.mqtt = mqtt;
        this.logs = [];
        this.autoScroll = true;
        this.initialized = false;
    }
    DeviceConsolePage.prototype.ionViewWillLeave = function () {
        clearTimeout(this.timeout);
    };
    DeviceConsolePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        setTimeout(function () { return _this.content.scrollToBottom(); });
    };
    DeviceConsolePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('Trying to subscribe...');
        this.events.subscribe('subscription:stop', function () {
            console.log('unsubscribing mqtt...');
            _this.events.unsubscribe('subscription:mqtt');
            console.log('unsubscribing event...');
            _this.events.unsubscribe('subscription:stop');
        });
        this.events.subscribe('subscription:mqtt', function (value) {
            //console.log(value)
            value.timestamp = __WEBPACK_IMPORTED_MODULE_2_moment__(Date.now()).format('YYYY-MM-D h:mm:ss a');
            if (_this.logs.length >= 1800) {
                _this.logs = [];
            }
            _this.logs.push(value);
            _this.timeout = setTimeout(function () {
                if (_this.autoScroll && _this.initialized) {
                    _this.content.scrollToBottom();
                }
            });
        });
        this.content.ionScroll.subscribe(function () {
            if (_this.content.isScrolling && _this.content.directionY == 'up') {
                _this.autoScroll = false;
            }
            else if (!_this.autoScroll && _this.content.scrollTop + _this.content.contentHeight >= _this.content.getContentDimensions().scrollHeight - 20) {
                _this.autoScroll = true;
            }
        });
        setTimeout(function () { return _this.initialized = true; });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], DeviceConsolePage.prototype, "content", void 0);
    DeviceConsolePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-device-console',template:/*ion-inline-start:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/pages/device-console/device-console.html"*/`<!--\n  Generated template for the DeviceConsolePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content #content padding-bottom>\n  <ion-fab bottom right *ngIf="logs.length > 0">\n    <button ion-fab color="secondary" (click)="content.scrollToBottom()">\n      <ion-icon name="ios-arrow-down"></ion-icon>\n    </button>\n  </ion-fab>\n  <ion-list>\n    <ion-item color="lighter-custom" *ngFor="let log of logs; let i=index">\n      <small>{{ log.timestamp }}</small>\n      <h2>\n        <b>{{ log.destinationName }}</b>\n      </h2>\n      <p text-wrap>{{ log.payloadString }}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>`/*ion-inline-end:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/pages/device-console/device-console.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__providers_mqtt_mqtt__["a" /* MqttProvider */]])
    ], DeviceConsolePage);
    return DeviceConsolePage;
}());

//# sourceMappingURL=device-console.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_socket_io_socket_io__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_mqtt_mqtt__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MAX_SENSORS = 31;
var DeviceInfoPage = (function () {
    function DeviceInfoPage(navCtrl, navParams, mqtt, socket, events, zone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mqtt = mqtt;
        this.socket = socket;
        this.events = events;
        this.zone = zone;
        this.sensors = [];
        this.device = {
            id: '',
            status: 0,
            lastSeen: '',
            lastReboot: '',
            fv: '',
            ip: '',
            intervals: {
                PUB_INTERVAL: "10000",
                PACKET_INTERVAL: "50"
            }
        };
        this.ctrlID = '';
        this.forceShow = false;
        this.pingStatus = false;
        this.pingInProgress = false;
        this.pingTimeout = 10000;
        this.scrolling = 'down';
        this.refreshInProgress = true;
    }
    DeviceInfoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.ctrlID = this.navParams.get('id');
        this.device.id = this.ctrlID;
        // initialise sensors
        this.resetSensors();
        this.events.subscribe('subscription:stop', function () {
            console.log('unsubscribing mqtt...');
            _this.events.unsubscribe('subscription:mqtt');
            console.log('unsubscribing event...');
            _this.events.unsubscribe('subscription:stop');
        });
        this.events.subscribe('subscription:mqtt', this.processPayload.bind(this));
        /*this.mqtt.ready().then(() => {
          this.refresh();
        })*/
        this.refresh();
        this.content.ionScrollEnd.subscribe(function () {
            //console.log(this.content.scrollTop, this.content.scrollHeight, this.content.contentHeight)
            _this.zone.run(function () {
                if (_this.content.scrollTop + _this.content.contentHeight >= _this.content.getContentDimensions().scrollHeight - 20) {
                    _this.scrolling = 'up';
                }
                else {
                    _this.scrolling = 'down';
                }
            });
        });
    };
    DeviceInfoPage.prototype.processPayload = function (value) {
        if (value.destinationName == this.ctrlID + '/IN/CHECK' ||
            value.destinationName == this.ctrlID + '/IN/CTRL/REFRESH' ||
            value.destinationName == this.ctrlID + '/REBOOT') {
            return;
        }
        else if (value.destinationName == this.ctrlID + '/OUT/CHECK') {
            this.pingInProgress = false;
            clearTimeout(this.pingSetTimeout);
            this.pingSetTimeout = null;
            this.device.status = 1;
            this.device.lastSeen = __WEBPACK_IMPORTED_MODULE_4_moment__(Date.now()).format('YYYY-MM-D h:mm:ss a');
            return;
        }
        else if (value.destinationName == this.ctrlID + '/IN/RFID/LED1') {
            var json = JSON.parse(value.payloadString);
            console.log(json);
            var pos = parseInt(json.POS);
            if (pos < MAX_SENSORS) {
                if (json.LED == 'ON') {
                    this.sensors[pos].button = '1';
                }
                else {
                    this.sensors[pos].button = '0';
                }
            }
            return;
        }
        else if (value.destinationName == this.ctrlID + '/OUT/INTERVAL') {
            var json = JSON.parse(value.payloadString);
            this.device.fv = json.CTRL_FIRM;
            this.device.ip = json.IP;
            this.device.intervals.PACKET_INTERVAL = json.PACKET_INTERVAL;
            this.device.intervals.PUB_INTERVAL = json.PUB_INTERVAL;
            this.device.lastReboot = __WEBPACK_IMPORTED_MODULE_4_moment__(Date.now()).format('YYYY-MM-D h:mm:ss a');
        }
        else if (value.destinationName == this.ctrlID + '/OUT/RFID/STATUS') {
            this.refreshInProgress = false;
            var json = JSON.parse(value.payloadString);
            var pos = parseInt(json.POS);
            if (pos < MAX_SENSORS) {
                this.sensors[pos].fv = json.SNSR_FIRM;
                this.sensors[pos].weight = json.WEIGHT;
                this.sensors[pos].proximity = json.PROXIMITY;
                this.sensors[pos].button = json.BUTTON;
                this.sensors[pos].currentRFID = json.RFID;
                if (json.WEIGHT) {
                    this.sensors[pos].type = 'Weight';
                }
                else if (json.PROXIMITY) {
                    this.sensors[pos].type = 'Proximity';
                }
                else {
                    this.sensors[pos].type = 'Button';
                }
            }
            this.sensors[pos].isOnline = true;
        }
        else if (value.destinationName == this.ctrlID + '/OUT/RFID/WEIGHT') {
            var json = JSON.parse(value.payloadString);
            console.log(json);
            var pos = parseInt(json.POS);
            if (pos < MAX_SENSORS) {
                this.sensors[pos].weight = json.WEIGHT;
                this.sensors[pos].currentRFID = json.RFID;
            }
            this.sensors[pos].isOnline = true;
        }
        else if (value.destinationName == this.ctrlID + '/OUT/RFID/PRX1') {
            var json = JSON.parse(value.payloadString);
            console.log(json);
            var pos = parseInt(json.POS);
            if (pos < MAX_SENSORS) {
                this.sensors[pos].proximity = json.PROXIMITY;
            }
            this.sensors[pos].isOnline = true;
        }
        else if (value.destinationName == this.ctrlID + '/OUT/RFID/BTN1') {
            var json = JSON.parse(value.payloadString);
            console.log(json);
            var pos = parseInt(json.POS);
            if (pos < MAX_SENSORS) {
                this.sensors[pos].button = json.BUTTON;
            }
            this.sensors[pos].isOnline = true;
        }
        this.device.lastSeen = __WEBPACK_IMPORTED_MODULE_4_moment__(Date.now()).format('YYYY-MM-D h:mm:ss a');
        this.device.status = 1;
        //console.log(this.sensors)
    };
    DeviceInfoPage.prototype.resetSensors = function () {
        this.sensors = [];
        for (var i = 0; i < MAX_SENSORS; i++) {
            this.sensors.push({
                pos: i,
                isOnline: false,
                fv: '',
                type: '',
                weight: '',
                button: '',
                proximity: '',
                led: '',
                currentRFID: '',
                previousRFID: ''
            });
        }
    };
    DeviceInfoPage.prototype.ping = function () {
        var _this = this;
        this.pingInProgress = true;
        this.pingSetTimeout = setTimeout(function () {
            _this.pingInProgress = false;
            _this.pingSetTimeout = null;
        }, this.pingTimeout);
        /*this.mqtt.publish(this.ctrlID + '/IN/CHECK', JSON.stringify(
          { CTRL_ID: this.ctrlID }
        ), 1)*/
        this.socket.publish(this.ctrlID + '/IN/CHECK', JSON.stringify({ CTRL_ID: this.ctrlID }), 1);
    };
    DeviceInfoPage.prototype.refresh = function () {
        this.refreshInProgress = true;
        this.resetSensors();
        /*this.mqtt.publish(this.ctrlID + '/IN/CTRL/REFRESH', JSON.stringify(
          { CTRL_ID: this.ctrlID }
        ), 1)*/
        this.socket.publish(this.ctrlID + '/IN/CTRL/REFRESH', JSON.stringify({ CTRL_ID: this.ctrlID }), 1);
    };
    DeviceInfoPage.prototype.reboot = function () {
        //this.mqtt.publish(this.ctrlID + '/REBOOT', "\"REBOOT\"", 1)
        this.socket.publish(this.ctrlID + '/REBOOT', "\"REBOOT\"", 1);
    };
    DeviceInfoPage.prototype.setIntervals = function () {
        //this.mqtt.publish(this.ctrlID + '/IN/INTERVAL', JSON.stringify(this.device.intervals), 1)
        this.socket.publish(this.ctrlID + '/IN/INTERVAL', JSON.stringify(this.device.intervals), 1);
    };
    DeviceInfoPage.prototype.overrideLED = function (device, state) {
        /*this.mqtt.publish(this.ctrlID + '/IN/RFID/LED1', JSON.stringify(
          {
            CTRL_ID: this.ctrlID,
            RFID: device.currentRFID,
            POS: device.pos.toString(),
            LED: state
          }
        ), 1)*/
        this.socket.publish(this.ctrlID + '/IN/RFID/LED1', JSON.stringify({
            CTRL_ID: this.ctrlID,
            RFID: device.currentRFID,
            POS: device.pos.toString(),
            LED: state
        }), 1);
    };
    DeviceInfoPage.prototype.scroll = function () {
        if (this.scrolling == 'up') {
            this.content.scrollToTop();
        }
        else {
            this.content.scrollToBottom();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])('info'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Content */])
    ], DeviceInfoPage.prototype, "content", void 0);
    DeviceInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-device-info',template:/*ion-inline-start:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/pages/device-info/device-info.html"*/`<!--\n  Generated template for the DeviceInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content padding-bottom #info>\n  <ion-fab bottom right>\n    <button ion-fab color="secondary" (click)="scroll()">\n      <ion-icon [name]="\'ios-arrow-\'+scrolling"></ion-icon>\n    </button>\n  </ion-fab>\n  <ion-item no-lines padding *ngIf="device.id">\n    <!--<ion-icon large name="md-desktop" item-start padding-left></ion-icon>-->\n    <h1 class="title">{{ device.id }}</h1>\n    <ion-badge [color]="device.status? \'secondary\':\'danger\'">{{ device.status? \'Online\': \'Offline\' }}</ion-badge>\n    <p>Firmware Version: {{ device.fv? device.fv: \'--\' }}</p>\n    <p>IP Address: {{ device.ip? device.ip: \'--\' }}</p>\n    <p>Last Seen: {{ device.lastSeen? device.lastSeen: \'--\'}}</p>\n    <p>Last Reboot: {{ device.lastReboot? device.lastReboot:\'--\' }}</p>\n    <!--<button item-end *ngIf="!pingInProgress" ion-button (click)="ping()">PING</button>-->\n    <ion-spinner item-end *ngIf="pingInProgress"></ion-spinner>\n  </ion-item>\n  <ion-row>\n    <ion-col text-center>\n      <button [disabled]="pingInProgress" ion-button clear (click)="ping()">\n        Ping\n      </button>\n    </ion-col>\n    <ion-col text-center>\n      <button ion-button clear (click)="refresh()">\n        Refresh\n      </button>\n    </ion-col>\n    <ion-col text-center>\n      <button ion-button color="danger" (click)="reboot()">\n        Reboot\n      </button>\n    </ion-col>\n  </ion-row>\n  <ion-list>\n    <ion-item-divider color="light">Sensors\n      <button item-end ion-button clear (click)="forceShow = !forceShow">\n        {{ forceShow? \'Show Online Only\': \'Show All\'}}\n      </button>\n    </ion-item-divider>\n    <ion-row>\n      <ion-col [ngClass]="{\'hidden\': !s.isOnline && !forceShow}" class="sensors" col-12 col-sm-6 col-md-4 col-lg-3 *ngFor="let s of sensors">\n        <ion-card [ngClass]="{\'dim\': !s.isOnline}">\n          <ion-card-header>\n            <b>Sensor {{ s.pos }}</b>\n            <ion-note *ngIf="!refreshInProgress" [color]="s.isOnline?\'secondary\':\'danger\'" float-right>{{ s.isOnline? \'Online\': \'Offline\'}}</ion-note>\n            <p style="color:#777">{{ s.fv? \'v\'+s.fv:\'--\' }}</p>\n          </ion-card-header>\n          <ion-card-content>\n            <p>Type: {{ s.type? s.type: \'--\' }}</p>\n            <p>RFID: {{ s.currentRFID? s.currentRFID: \'--\' }}</p>\n            <p>Weight: {{ s.weight? s.weight: \'--\' }}</p>\n            <p>Button: {{ s.button? s.button: \'--\' }}</p>\n            <p>Proximity: {{ s.proximity? s.proximity: \'--\' }}</p>\n          </ion-card-content>\n          <ion-row>\n            <ion-col text-center>\n              <button [disabled]="!s.isOnline" ion-button clear (click)="overrideLED(s, \'ON\')">\n                On\n              </button>\n            </ion-col>\n            <ion-col text-center>\n              <button [disabled]="!s.isOnline" ion-button clear (click)="overrideLED(s, \'OFF\')">\n                Off\n              </button>\n            </ion-col>\n            <ion-col text-center>\n              <button [disabled]="!s.isOnline" ion-button (click)="overrideLED(s, \'BLINK\')">\n                Blink\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n    <!--<div text-center padding>\n      <button ion-button class="btn-special" large color="custom" (click)="refresh()">\n        Refresh\n      </button>\n    </div>-->\n    <ion-item-divider color="light">Set Interval</ion-item-divider>\n    <ion-item-group padding-bottom>\n      <p padding-left style="font-size: 1.6rem">Set the packet delay and MQTT publish interval for the device.\n      </p>\n      <ion-item>\n        <ion-label stacked>Packet Delay (ms)</ion-label>\n        <ion-input type="text" placeholder="e.g 50 (50ms)" [(ngModel)]="device.intervals.PACKET_INTERVAL"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>Publish Interval (ms)</ion-label>\n        <ion-input type="text" placeholder="e.g 10000 (10 seconds)" [(ngModel)]="device.intervals.PUB_INTERVAL"></ion-input>\n      </ion-item>\n      <div text-center margin-top>\n        <button ion-button class="btn-special" large color="custom" (click)="setIntervals()">\n          Set\n        </button>\n      </div>\n    </ion-item-group>\n    <!--<ion-item-divider color="danger">Reboot</ion-item-divider>\n    <ion-item-group padding-bottom>\n      <ion-item no-lines>\n        Restart the device immediately.\n      </ion-item>\n      <div text-center>\n        <button class="btn-special" ion-button large color="custom" (click)="reboot()">\n          Reboot Now\n        </button>\n      </div>\n    </ion-item-group>-->\n  </ion-list>\n</ion-content>`/*ion-inline-end:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/pages/device-info/device-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_mqtt_mqtt__["a" /* MqttProvider */],
            __WEBPACK_IMPORTED_MODULE_0__providers_socket_io_socket_io__["a" /* SocketIoProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__angular_core__["M" /* NgZone */]])
    ], DeviceInfoPage);
    return DeviceInfoPage;
}());

//# sourceMappingURL=device-info.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_socket_io_socket_io__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_mqtt_mqtt__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular_navigation_view_controller__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_app_app__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_api_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_alert__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_push_push_service__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = (function () {
    function HomePage(navCtrl, popover, mqtt, socket, auth, platform, storage, alertCtrl, api, alert, push) {
        this.navCtrl = navCtrl;
        this.popover = popover;
        this.mqtt = mqtt;
        this.socket = socket;
        this.auth = auth;
        this.platform = platform;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.api = api;
        this.alert = alert;
        this.push = push;
        /*devices = [{
          id: '1078310',
          status: 0,
          lastSeen: moment(Date.now()).format('LLL')
        },{
          id: '1077772',
          status: 0,
          lastSeen: moment(Date.now()).format('LLL')
        }];*/
        this.devices = [];
        this.isLoading = true;
    }
    HomePage.prototype.ionViewCanEnter = function () {
        return this.auth.checkAuthentication();
    };
    HomePage.prototype.ionViewWillEnter = function () {
        /*this.storage.get('devices').then(devices => {
          if(devices)
            this.devices = JSON.parse(JSON.stringify(devices))
        })*/
        this.refresh();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.platform.is('core') && !this.push.isPermissionGranted()) {
            // asking permission for notification
            this.push.onDesktopReady().then(function () {
                _this.push.requestPermission();
            });
        }
    };
    HomePage.prototype.refresh = function () {
        var _this = this;
        this.isLoading = true;
        this.api.getControllers().subscribe(function (res) {
            if (res.success) {
                console.log(res.result);
                _this.devices = res.result;
            }
            _this.isLoading = false;
        });
    };
    HomePage.prototype.goToDevicePage = function (dev) {
        this.navCtrl.push('DevicePage', { id: dev });
    };
    HomePage.prototype.showAddDeviceDialog = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Add a device',
            subTitle: '<p>Please enter the device ID<p>',
            inputs: [
                {
                    name: 'id',
                    placeholder: 'controller ID e.g. 1078310'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        if (data.id) {
                            _this.addDevice(data.id);
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.addDevice = function (id) {
        var _this = this;
        console.log(this.devices);
        var dev = this.devices.filter(function (item) {
            return item.id == id;
        });
        if (dev.length == 0) {
            this.api.addController({ id: id }).subscribe(function (res) {
                if (res.success) {
                    _this.refresh();
                }
                else {
                    _this.alert.showToast(res.msg, 3000, true);
                }
            });
            /*this.devices.push({
              id: id,
              status: 0,
              lastSeen: moment(Date.now()).format('LLL')
            })
            this.storage.set('devices', this.devices)*/
        }
    };
    HomePage.prototype.removeDevice = function (id) {
        this.devices = this.devices.filter(function (item) {
            return item.id != id;
        });
        this.storage.set('devices', this.devices);
    };
    HomePage.prototype.updateDevices = function () {
    };
    HomePage.prototype.presentPopover = function (ev) {
        var popover = this.popover.create(PopoverPage);
        popover.onDidDismiss(function () { });
        popover.present({
            ev: ev
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/pages/home/home.html"*/`<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <img src="assets/icon/icon.png" />\n      <div class="custom-title">\n        <span class="header">Toshiba Tec Project</span>\n        <span class="subheader" *ngIf="mqtt.mqttRegisteredBrokerList.length == 0">\n          No registered MQTT Brokers\n        </span>\n        <span class="subheader" *ngIf="mqtt.mqttRegisteredBrokerList.length > 0 && !mqtt.mqttUrl">\n          Please choose a MQTT broker\n        </span>\n        <!--<span class="subheader" *ngIf="mqtt.mqttRegisteredBrokerList.length > 0 && mqtt.mqttUrl">\n          {{ mqtt.mqttConnectionStatus? \'MQTT Connected\' : \'Connecting to MQTT...\'}}\n        </span>-->\n        <div *ngIf="mqtt.mqttRegisteredBrokerList.length > 0 && mqtt.mqttUrl">\n          <!--<span class="subheader">{{ mqtt.mqttConnectionStatus? \'MQTT Connected\' : \'Connecting to MQTT...\'}}\n          </span>-->\n          <span class="subheader" *ngIf="socket.isAuthorized == -1">Checking authentication...</span>\n          <span class="subheader" *ngIf="socket.isAuthorized == 0">Authentication failed</span>\n          <span class="subheader" *ngIf="socket.isAuthorized == 1">\n            {{ socket.connectionStatus? \'MQTT Connected\' : \'Connecting to MQTT...\'}}\n          </span>\n        </div>\n      </div>\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentPopover($event)">\n        <ion-icon name="more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header color="light">\n      Main Controller List\n      <ion-spinner *ngIf="isLoading" item-end></ion-spinner>\n      <button *ngIf="!isLoading" ion-button clear item-end (click)="refresh()">\n        Refresh\n      </button>\n    </ion-list-header>\n    <ion-item-sliding *ngFor="let device of devices">\n      <button [disabled]="!socket.connectionStatus" detail-none ion-item (click)="goToDevicePage(device)">\n        <ion-icon large name="md-desktop" item-start padding-left></ion-icon>\n        <h2>\n          <b>{{ device }}</b>\n        </h2>\n        <!--<p>Last seen: {{ device.lastSeen }}</p>-->\n      </button>\n      <ion-item-options side="left">\n        <button ion-button clear icon-only (click)="removeDevice(device.id)">\n          <ion-icon name="remove-circle" color="danger"></ion-icon>\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n    <div text-center margin-top *ngIf="!isLoading">\n      <button ion-button (click)="showAddDeviceDialog()">\n        <ion-icon margin-right name="add"></ion-icon>\n        Add a device\n      </button>\n    </div>\n  </ion-list>\n</ion-content>`/*ion-inline-end:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["r" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_mqtt_mqtt__["a" /* MqttProvider */],
            __WEBPACK_IMPORTED_MODULE_0__providers_socket_io_socket_io__["a" /* SocketIoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_9__providers_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_push_push_service__["a" /* PushServiceProvider */]])
    ], HomePage);
    return HomePage;
}());

var PopoverPage = (function () {
    function PopoverPage(viewCtrl, auth, app, socket
        //private mqtt: MqttProvider
    ) {
        this.viewCtrl = viewCtrl;
        this.auth = auth;
        this.app = app;
        this.socket = socket;
    }
    PopoverPage.prototype.close = function (action) {
        this.viewCtrl.onDidDismiss(action);
        this.viewCtrl.dismiss();
    };
    PopoverPage.prototype.goToSettingsPage = function () {
        var _this = this;
        this.close(function () { return _this.app.getRootNavs()[0].push('SettingsPage'); });
    };
    PopoverPage.prototype.logout = function () {
        var _this = this;
        this.auth.logout().then(function (isAuthenticated) {
            if (!isAuthenticated)
                _this.close(function () {
                    // clear topics
                    //this.mqtt.unsubscribeAllTopics();
                    _this.socket.unsubscribeAllTopics();
                    _this.app.getRootNavs()[0].setRoot('LoginPage');
                });
        });
    };
    PopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            template: "\n    <ion-list>\n    <button ion-item detail-none (click)=\"goToSettingsPage()\">\n      <ion-icon name=\"build\" margin-right></ion-icon>\n      Settings\n    </button>\n      <button ion-item detail-none (click)=\"logout()\">\n        <ion-icon name=\"exit\" margin-right></ion-icon>\n        Logout\n      </button>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular_navigation_view_controller__["a" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular_components_app_app__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_0__providers_socket_io_socket_io__["a" /* SocketIoProvider */]
            //private mqtt: MqttProvider
        ])
    ], PopoverPage);
    return PopoverPage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);



Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_14" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_api_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_mqtt_mqtt__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_push__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_push_push_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_alert__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic2_super_tabs__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_device_console_device_console__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_device_info_device_info__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_socket_io_socket_io__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["b" /* PopoverPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_device_console_device_console__["a" /* DeviceConsolePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_device_info_device_info__["a" /* DeviceInfoPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_16_ionic2_super_tabs__["a" /* SuperTabsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {
                    preloadModules: true
                }, {
                    links: [
                        { loadChildren: '../pages/device/device.module#HomePageModule', name: 'DevicePage', segment: 'device/:id', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'high', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: ['HomePage'] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["b" /* PopoverPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_device_console_device_console__["a" /* DeviceConsolePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_device_info_device_info__["a" /* DeviceInfoPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__["a" /* Device */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_mqtt_mqtt__["a" /* MqttProvider */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_14__providers_push_push_service__["a" /* PushServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_15__providers_alert__["a" /* AlertProvider */],
                __WEBPACK_IMPORTED_MODULE_0__providers_api_service__["a" /* ApiService */],
                __WEBPACK_IMPORTED_MODULE_19__providers_socket_io_socket_io__["a" /* SocketIoProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 207,
	"./af.js": 207,
	"./ar": 208,
	"./ar-dz": 209,
	"./ar-dz.js": 209,
	"./ar-kw": 210,
	"./ar-kw.js": 210,
	"./ar-ly": 211,
	"./ar-ly.js": 211,
	"./ar-ma": 212,
	"./ar-ma.js": 212,
	"./ar-sa": 213,
	"./ar-sa.js": 213,
	"./ar-tn": 214,
	"./ar-tn.js": 214,
	"./ar.js": 208,
	"./az": 215,
	"./az.js": 215,
	"./be": 216,
	"./be.js": 216,
	"./bg": 217,
	"./bg.js": 217,
	"./bm": 218,
	"./bm.js": 218,
	"./bn": 219,
	"./bn.js": 219,
	"./bo": 220,
	"./bo.js": 220,
	"./br": 221,
	"./br.js": 221,
	"./bs": 222,
	"./bs.js": 222,
	"./ca": 223,
	"./ca.js": 223,
	"./cs": 224,
	"./cs.js": 224,
	"./cv": 225,
	"./cv.js": 225,
	"./cy": 226,
	"./cy.js": 226,
	"./da": 227,
	"./da.js": 227,
	"./de": 228,
	"./de-at": 229,
	"./de-at.js": 229,
	"./de-ch": 230,
	"./de-ch.js": 230,
	"./de.js": 228,
	"./dv": 231,
	"./dv.js": 231,
	"./el": 232,
	"./el.js": 232,
	"./en-au": 233,
	"./en-au.js": 233,
	"./en-ca": 234,
	"./en-ca.js": 234,
	"./en-gb": 235,
	"./en-gb.js": 235,
	"./en-ie": 236,
	"./en-ie.js": 236,
	"./en-nz": 237,
	"./en-nz.js": 237,
	"./eo": 238,
	"./eo.js": 238,
	"./es": 239,
	"./es-do": 240,
	"./es-do.js": 240,
	"./es-us": 241,
	"./es-us.js": 241,
	"./es.js": 239,
	"./et": 242,
	"./et.js": 242,
	"./eu": 243,
	"./eu.js": 243,
	"./fa": 244,
	"./fa.js": 244,
	"./fi": 245,
	"./fi.js": 245,
	"./fo": 246,
	"./fo.js": 246,
	"./fr": 247,
	"./fr-ca": 248,
	"./fr-ca.js": 248,
	"./fr-ch": 249,
	"./fr-ch.js": 249,
	"./fr.js": 247,
	"./fy": 250,
	"./fy.js": 250,
	"./gd": 251,
	"./gd.js": 251,
	"./gl": 252,
	"./gl.js": 252,
	"./gom-latn": 253,
	"./gom-latn.js": 253,
	"./gu": 254,
	"./gu.js": 254,
	"./he": 255,
	"./he.js": 255,
	"./hi": 256,
	"./hi.js": 256,
	"./hr": 257,
	"./hr.js": 257,
	"./hu": 258,
	"./hu.js": 258,
	"./hy-am": 259,
	"./hy-am.js": 259,
	"./id": 260,
	"./id.js": 260,
	"./is": 261,
	"./is.js": 261,
	"./it": 262,
	"./it.js": 262,
	"./ja": 263,
	"./ja.js": 263,
	"./jv": 264,
	"./jv.js": 264,
	"./ka": 265,
	"./ka.js": 265,
	"./kk": 266,
	"./kk.js": 266,
	"./km": 267,
	"./km.js": 267,
	"./kn": 268,
	"./kn.js": 268,
	"./ko": 269,
	"./ko.js": 269,
	"./ky": 270,
	"./ky.js": 270,
	"./lb": 271,
	"./lb.js": 271,
	"./lo": 272,
	"./lo.js": 272,
	"./lt": 273,
	"./lt.js": 273,
	"./lv": 274,
	"./lv.js": 274,
	"./me": 275,
	"./me.js": 275,
	"./mi": 276,
	"./mi.js": 276,
	"./mk": 277,
	"./mk.js": 277,
	"./ml": 278,
	"./ml.js": 278,
	"./mr": 279,
	"./mr.js": 279,
	"./ms": 280,
	"./ms-my": 281,
	"./ms-my.js": 281,
	"./ms.js": 280,
	"./mt": 282,
	"./mt.js": 282,
	"./my": 283,
	"./my.js": 283,
	"./nb": 284,
	"./nb.js": 284,
	"./ne": 285,
	"./ne.js": 285,
	"./nl": 286,
	"./nl-be": 287,
	"./nl-be.js": 287,
	"./nl.js": 286,
	"./nn": 288,
	"./nn.js": 288,
	"./pa-in": 289,
	"./pa-in.js": 289,
	"./pl": 290,
	"./pl.js": 290,
	"./pt": 291,
	"./pt-br": 292,
	"./pt-br.js": 292,
	"./pt.js": 291,
	"./ro": 293,
	"./ro.js": 293,
	"./ru": 294,
	"./ru.js": 294,
	"./sd": 295,
	"./sd.js": 295,
	"./se": 296,
	"./se.js": 296,
	"./si": 297,
	"./si.js": 297,
	"./sk": 298,
	"./sk.js": 298,
	"./sl": 299,
	"./sl.js": 299,
	"./sq": 300,
	"./sq.js": 300,
	"./sr": 301,
	"./sr-cyrl": 302,
	"./sr-cyrl.js": 302,
	"./sr.js": 301,
	"./ss": 303,
	"./ss.js": 303,
	"./sv": 304,
	"./sv.js": 304,
	"./sw": 305,
	"./sw.js": 305,
	"./ta": 306,
	"./ta.js": 306,
	"./te": 307,
	"./te.js": 307,
	"./tet": 308,
	"./tet.js": 308,
	"./th": 309,
	"./th.js": 309,
	"./tl-ph": 310,
	"./tl-ph.js": 310,
	"./tlh": 311,
	"./tlh.js": 311,
	"./tr": 312,
	"./tr.js": 312,
	"./tzl": 313,
	"./tzl.js": 313,
	"./tzm": 314,
	"./tzm-latn": 315,
	"./tzm-latn.js": 315,
	"./tzm.js": 314,
	"./uk": 316,
	"./uk.js": 316,
	"./ur": 317,
	"./ur.js": 317,
	"./uz": 318,
	"./uz-latn": 319,
	"./uz-latn.js": 319,
	"./uz.js": 318,
	"./vi": 320,
	"./vi.js": 320,
	"./x-pseudo": 321,
	"./x-pseudo.js": 321,
	"./yo": 322,
	"./yo.js": 322,
	"./zh-cn": 323,
	"./zh-cn.js": 323,
	"./zh-hk": 324,
	"./zh-hk.js": 324,
	"./zh-tw": 325,
	"./zh-tw.js": 325
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 477;

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mqtt_mqtt__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { HttpClient } from '@angular/common/http';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = (function () {
    function AuthProvider(
        //public http: HttpClient, 
        storage, mqtt, events) {
        var _this = this;
        this.storage = storage;
        this.mqtt = mqtt;
        this.events = events;
        this.username = 'toshiba';
        this.password = 'toshibatec1234';
        this.isAuthenticated = false;
        this.token = '';
        this.storage.get('token').then(function (token) {
            if (token)
                _this.token = token;
        });
    }
    AuthProvider.prototype.login = function (credentials) {
        var _this = this;
        return new Promise(function (rs, rj) {
            _this.isAuthenticated =
                (credentials.username == _this.username && credentials.password == _this.password);
            _this.storage.set('isAuthenticated', _this.isAuthenticated).then(function () {
                if (_this.isAuthenticated) {
                    _this.token = btoa(_this.username + ':' + _this.password);
                    _this.storage.set('token', _this.token);
                }
                rs(_this.isAuthenticated);
            });
        });
    };
    AuthProvider.prototype.logout = function () {
        var _this = this;
        return new Promise(function (rs, rj) {
            _this.isAuthenticated = false;
            _this.token = '';
            _this.storage.set('isAuthenticated', _this.isAuthenticated).then(function () {
                _this.storage.clear();
                _this.mqtt.reset();
                _this.events.publish('user:logout');
                rs(_this.isAuthenticated);
            });
        });
    };
    AuthProvider.prototype.checkAuthentication = function () {
        return this.storage.get('isAuthenticated');
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_0__mqtt_mqtt__["a" /* MqttProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* Events */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_config__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_mqtt_mqtt__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_push_push_service__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase_messaging__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase_messaging___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase_messaging__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_socket_io_socket_io__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, socket, auth, mqtt, events, push) {
        var _this = this;
        this.socket = socket;
        this.auth = auth;
        this.mqtt = mqtt;
        this.events = events;
        this.push = push;
        this.rootPage = '';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            if (platform.is('core'))
                __WEBPACK_IMPORTED_MODULE_8_firebase_app__["initializeApp"](__WEBPACK_IMPORTED_MODULE_0__providers_config__["c" /* firebaseConfig */]);
            if (platform.is('mobile'))
                statusBar.styleDefault();
            // init push service
            if (platform.is('mobile')) {
                _this.push.init();
            }
            else {
                _this.push.initDesktop();
            }
            _this.auth.checkAuthentication().then(function (allowed) {
                if (allowed) {
                    _this.events.publish('user:login');
                    _this.rootPage = 'HomePage';
                }
                else
                    _this.rootPage = 'LoginPage';
                if (platform.is('mobile'))
                    splashScreen.hide();
            });
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/app/app.html"*/`<ion-nav [root]="rootPage"></ion-nav>\n`/*ion-inline-end:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_10__providers_socket_io_socket_io__["a" /* SocketIoProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_1__providers_mqtt_mqtt__["a" /* MqttProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__providers_push_push_service__["a" /* PushServiceProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketIoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mqtt_mqtt__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SocketIoProvider = (function () {
    function SocketIoProvider(events, auth, mqtt) {
        var _this = this;
        this.events = events;
        this.auth = auth;
        this.mqtt = mqtt;
        this.isAuthorized = -1;
        this.subscribedTopics = [];
        this.connectionStatus = false;
        this.mqttReady = false;
        this.observable = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].create(function (observer) {
            _this.observer = observer;
        });
        this.events.subscribe('user:login', function () {
            if (!_this.mqttReady) {
                new Promise(function (rs) {
                    _this.brokerReadyResolve = rs;
                }).then(function () { return _this.initialise(); });
            }
            else {
                _this.initialise();
            }
        });
        this.mqtt.ready().then(function () {
            if (_this.brokerReadyResolve) {
                _this.mqttReady = true;
                _this.brokerReadyResolve();
            }
        });
    }
    SocketIoProvider.prototype.initialise = function () {
        var _this = this;
        if (this.socket) {
            this.socket.close();
        }
        var defaultBroker = this.mqtt.getDefaultBroker();
        this.socket = io(new __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */]().host + (defaultBroker.url ? ('/' + defaultBroker.url) : ''));
        this.socket.on('connect', function () {
            console.log('[SOCKET] Connected to server, checking authentication...');
            console.log(_this.auth.token);
            _this.isAuthorized = -1;
            _this.socket.emit('authentication', _this.auth.token);
        });
        this.socket.on('authentication', function (result) {
            console.log('[SOCKET] Authentication result from server..', result.success);
            if (result.success) {
                _this.isAuthorized = 1;
                // start subscribe if there is any
                _this.subscribedTopics.forEach(function (topic) {
                    _this.subscribeTopic(topic, 1);
                });
            }
            else {
                _this.isAuthorized = 0;
            }
            // start check connection
            _this.socket.emit('mqtt:connection');
        });
        this.socket.on('mqtt:message', function (data) {
            _this.observer.next(data);
        });
        this.socket.on('mqtt:connection', function (data) {
            console.log('[SOCKET] Getting MQTT connection status...', data.result);
            _this.connectionStatus = data.result;
        });
        this.socket.on('disconnect', function () {
            _this.connectionStatus = false;
        });
    };
    SocketIoProvider.prototype.publish = function (topic, payload, qos) {
        this.socket.emit('mqtt:publish', {
            topic: topic,
            payload: payload,
            qos: qos
        });
    };
    SocketIoProvider.prototype.subscribeTopic = function (topic, qos) {
        if (this.subscribedTopics.indexOf(topic) == -1) {
            // add the topic
            this.subscribedTopics.push(topic);
        }
        this.socket.emit('mqtt:subscribe', { topic: topic, qos: qos });
    };
    SocketIoProvider.prototype.unsubscribeTopic = function (topic) {
        this.socket.emit('mqtt:unsubscribe', topic);
        this.subscribedTopics = this.subscribedTopics.filter(function (_topic) {
            return _topic != topic;
        });
    };
    SocketIoProvider.prototype.unsubscribeAllTopics = function () {
        var _this = this;
        this.subscribedTopics.forEach(function (topic) {
            _this.unsubscribeTopic(topic);
        });
    };
    SocketIoProvider.prototype.getMessages = function () {
        return this.observable;
    };
    SocketIoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_5__mqtt_mqtt__["a" /* MqttProvider */]])
    ], SocketIoProvider);
    return SocketIoProvider;
}());

//# sourceMappingURL=socket-io.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_auth__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// Storage

// Config


var ApiService = (function () {
    function ApiService(platform, http, zone, storage, events, auth) {
        this.platform = platform;
        this.http = http;
        this.zone = zone;
        this.storage = storage;
        this.events = events;
        this.auth = auth;
        this.connect_timeout = 25000;
        this.retry = 1;
        this.username = '';
        this.password = '';
        var config = new __WEBPACK_IMPORTED_MODULE_9__config__["a" /* Config */]();
        this.host = config.host;
        this.endpoint = config.endpoint;
    }
    ApiService.prototype.getControllers = function () {
        return this.getRequest('getRegisteredControllers');
    };
    ApiService.prototype.addController = function (params) {
        return this.postRequest('addController', params, true);
    };
    ApiService.prototype.registerDevice = function (params) {
        return this.postRequest('addDeviceId', params, true);
    };
    ApiService.prototype.unregisterDevice = function (params) {
        return this.postRequest('removeDeviceId', params, true);
    };
    ApiService.prototype.getRequest = function (uri, params) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            var _getRequest = function () {
                var url = _this.endpoint + '/' + uri;
                console.log('[API] Get request endpoint', url);
                var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
                    'Authorization': 'Basic ' + _this.auth.token
                });
                var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({
                    headers: headers,
                    search: params ? _this.json2url(params) : null
                });
                console.log('[API] Get request params', options.search ? options.search.toString() : 'none');
                _this.http.get(url, options).timeout(_this.connect_timeout).retry(_this.retry)
                    .subscribe(function (data) {
                    var _data = data.json();
                    console.log('[API] Get request response', _data);
                    observer.next(_data);
                    observer.complete();
                }, function (error) {
                    //console.debug('ERROR', error)
                    console.log('[API] Get request error', error.status, error);
                    //handle unauthorized by refresh token
                    if (error.status == 401) { }
                    else if (error.status == 404) {
                        observer.next({
                            success: false,
                            message: __WEBPACK_IMPORTED_MODULE_9__config__["b" /* Constants */].NOT_FOUND,
                            result: null
                        });
                        observer.complete();
                    }
                    else if (error.status == 500) {
                        var _msg = '';
                        if (!_this.isOnline()) {
                            _msg = __WEBPACK_IMPORTED_MODULE_9__config__["b" /* Constants */].OFFLINE_MESSAGE;
                        }
                        else
                            _msg = __WEBPACK_IMPORTED_MODULE_9__config__["b" /* Constants */].SERVER_ERR;
                        observer.next({
                            success: false,
                            message: _msg,
                            result: null
                        });
                        observer.complete();
                    }
                    else {
                        observer.next({
                            success: false,
                            message: error.message,
                            result: null
                        });
                        observer.complete();
                    }
                }, function () {
                    console.log('[API] Get request completed');
                });
            };
            // start the get request
            _getRequest();
        });
    };
    ApiService.prototype.postRequest = function (uri, params, isAuthorized, isJSON) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            var _postRequest = function () {
                var url = _this.endpoint + '/' + uri;
                console.log('[API] Post request endpoint', url);
                var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({
                    'Authorization': isAuthorized ? ('Basic ' + _this.auth.token) : null,
                    'Content-Type': isJSON ? 'application/json' : 'application/x-www-form-urlencoded'
                });
                var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({
                    headers: headers
                });
                var body = isJSON ? params : _this.json2url(params).toString();
                console.log('[API] Post request params', body);
                _this.http.post(url, body, options).timeout(_this.connect_timeout).retry(_this.retry)
                    .subscribe(function (data) {
                    var _data = data.json();
                    console.log('[API] Post request response', _data);
                    observer.next(_data);
                    observer.complete();
                }, function (error) {
                    console.log('[API] Post request error', error.status, error);
                    //handle unauthorized by refresh token
                    if (error.status == 401) { }
                    else if (error.status == 404) {
                        observer.next({
                            success: false,
                            message: __WEBPACK_IMPORTED_MODULE_9__config__["b" /* Constants */].NOT_FOUND,
                            result: null
                        });
                        observer.complete();
                    }
                    else if (error.status == 500) {
                        var _msg = '';
                        if (!_this.isOnline()) {
                            _msg = __WEBPACK_IMPORTED_MODULE_9__config__["b" /* Constants */].OFFLINE_MESSAGE;
                        }
                        else
                            _msg = __WEBPACK_IMPORTED_MODULE_9__config__["b" /* Constants */].SERVER_ERR;
                        observer.next({
                            success: false,
                            message: _msg,
                            result: null
                        });
                        observer.complete();
                    }
                    else {
                        observer.next({
                            success: false,
                            message: error.message,
                            result: null
                        });
                        observer.complete();
                    }
                }, function () {
                    console.log('[API] Post request completed');
                });
            };
            // start the post request
            _postRequest();
        });
    };
    ApiService.prototype.json2url = function (json) {
        var params = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["e" /* URLSearchParams */]();
        for (var p in json) {
            if (json.hasOwnProperty(p)) {
                params.append(p, json[p]);
            }
        }
        return params;
    };
    ApiService.prototype.isOnline = function () {
        if (this.platform.is('cordova')) {
            return navigator.connection.type !== Connection.NONE;
        }
        else {
            return navigator.onLine;
        }
    };
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_10__auth_auth__["a" /* AuthProvider */]])
    ], ApiService);
    return ApiService;
}());

//# sourceMappingURL=api-service.js.map

/***/ })

},[423]);
//# sourceMappingURL=main.js.map