webpackJsonp([2],{

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__device__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_super_tabs__ = __webpack_require__(420);
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

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__device_console_device_console__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__device_info_device_info__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_mqtt_mqtt__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(15);
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
    function DevicePage(navCtrl, navParams, mqtt, events, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mqtt = mqtt;
        this.events = events;
        this.auth = auth;
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
        if (this.isMqttInit) {
            this.mqtt.unsubscribeTopic(this.topic);
            this.mqtt.unregisterCallback(this.ctrlID);
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
            console.log(this.tabs);
            // register callback
            this.mqtt.ready().then(function () {
                _this.isMqttInit = true;
                _this.topic = _this.ctrlID + '/#';
                _this.mqtt.subscribeTopic(_this.topic, 1);
                _this.mqtt.registerCallback(_this.ctrlID, _this.callback.bind(_this));
            });
        }
    };
    DevicePage.prototype.callback = function (message) {
        //console.log(message)
        this.events.publish('subscription:mqtt', message);
    };
    DevicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-device',template:/*ion-inline-start:"/home/beng/GitHub/Personal/toshiba-tec-project/ionic/src/pages/device/device.html"*/`<!--\n  Generated template for the DevicePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <span class="header">Device {{ ctrlID }}</span>\n      <span class="subheader">{{ mqtt.mqttConnectionStatus? \'MQTT Connected\' : \'Connecting to MQTT...\'}}</span>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <!--<ion-tabs color="custom" *ngIf="ctrlID" name="deviceTabs" tabsPlacement="top" tabsLayout="icon-hide" tabsHighlight="true">\n    <ion-tab *ngFor="let tab of tabs"\n      [root]="tab.page" \n      [rootParams]="tab.params" \n      [tabTitle]="tab.title">\n    </ion-tab>\n  </ion-tabs>-->\n  <super-tabs \n    toolbarBackground="custom" \n    toolbarColor="light"\n    indicatorColor="light"\n    badgeColor="light"\n    *ngIf="ctrlID" \n    id="deviceTabs">\n    <super-tab *ngFor="let tab of tabs"\n      [root]="tab.page" \n      [rootParams]="tab.params" \n      [title]="tab.title">\n    </super-tab>\n  </super-tabs>\n</ion-content>`/*ion-inline-end:"/home/beng/GitHub/Personal/toshiba-tec-project/ionic/src/pages/device/device.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_mqtt_mqtt__["a" /* MqttProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__["a" /* AuthProvider */]])
    ], DevicePage);
    return DevicePage;
}());

//# sourceMappingURL=device.js.map

/***/ })

});
//# sourceMappingURL=2.js.map