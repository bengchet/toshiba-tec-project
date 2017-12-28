webpackJsonp([2],{

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__device__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_super_tabs__ = __webpack_require__(421);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomePageModule = (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__device__["a" /* DevicePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ionic2_super_tabs__["a" /* SuperTabsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__device__["a" /* DevicePage */]),
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=device.module.js.map

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__device_console_device_console__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__device_info_device_info__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_mqtt_mqtt__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_socket_io_socket_io__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DevicePage = (function () {
    function DevicePage(navCtrl, navParams, mqtt, events, auth, socket) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mqtt = mqtt;
        this.events = events;
        this.auth = auth;
        this.socket = socket;
        this.ctrlID = '';
        this.tabs = [];
        this.isMqttInit = false;
    }
    DevicePage.prototype.ionViewCanEnter = function () {
        return this.auth.checkAuthentication();
    };
    DevicePage.prototype.ionViewWillLeave = function () {
        // stop all subscription
        this.events.publish('subscription:stop');
        /*if (this.isMqttInit){
          if(this.topic)
            this.mqtt.unsubscribeTopic(this.topic);
          this.mqtt.unregisterCallback(this.ctrlID);
        }*/
        if (this.topic) {
            this.socket.unsubscribeTopic(this.topic);
        }
        if (this.socketSubscription) {
            this.socketSubscription.unsubscribe();
        }
    };
    DevicePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.navParams.get('id')) {
            this.ctrlID = this.navParams.get('id');
            this.tabs = [
                {
                    page: __WEBPACK_IMPORTED_MODULE_2__device_info_device_info__["a" /* DeviceInfoPage */],
                    params: {
                        id: this.ctrlID
                    },
                    title: 'Info',
                    id: 'Info'
                }, {
                    page: __WEBPACK_IMPORTED_MODULE_1__device_console_device_console__["a" /* DeviceConsolePage */],
                    params: {
                        id: this.ctrlID
                    },
                    title: 'Console',
                    id: 'Console'
                }
            ];
            this.topic = this.ctrlID + '/#';
            // register callback
            /*this.mqtt.ready().then(() => {
              this.isMqttInit = true;
              this.mqtt.subscribeTopic(this.topic, 1);
              this.mqtt.registerCallback(this.ctrlID, this.callback.bind(this))
            })*/
            this.socket.subscribeTopic(this.topic, 1);
            this.socketSubscription = this.socket.getMessages().subscribe(function (data) {
                _this.callback(data);
            });
        }
    };
    DevicePage.prototype.callback = function (message) {
        //console.log(message)
        this.events.publish('subscription:mqtt', message);
    };
    DevicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-device',template:/*ion-inline-start:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/pages/device/device.html"*/`<!--\n  Generated template for the DevicePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span class="header">Device {{ ctrlID }}</span>\n      <!--<span class="subheader">{{ mqtt.mqttConnectionStatus? \'MQTT Connected\' : \'Connecting to MQTT...\'}}</span>-->\n      <span class="subheader">{{ socket.connectionStatus? \'MQTT Connected\' : \'Connecting to MQTT...\'}}</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!--<ion-tabs color="custom" *ngIf="ctrlID" name="deviceTabs" tabsPlacement="top" tabsLayout="icon-hide" tabsHighlight="true">\n    <ion-tab *ngFor="let tab of tabs"\n      [root]="tab.page" \n      [rootParams]="tab.params" \n      [tabTitle]="tab.title">\n    </ion-tab>\n  </ion-tabs>-->\n  <super-tabs \n    toolbarBackground="custom" \n    toolbarColor="light"\n    indicatorColor="light"\n    badgeColor="light"\n    *ngIf="ctrlID" \n    id="deviceTabs">\n    <super-tab *ngFor="let tab of tabs"\n      [root]="tab.page" \n      [rootParams]="tab.params" \n      [title]="tab.title">\n    </super-tab>\n  </super-tabs>\n</ion-content>`/*ion-inline-end:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/pages/device/device.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_mqtt_mqtt__["a" /* MqttProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_socket_io_socket_io__["a" /* SocketIoProvider */]])
    ], DevicePage);
    return DevicePage;
}());

//# sourceMappingURL=device.js.map

/***/ })

});
//# sourceMappingURL=2.js.map