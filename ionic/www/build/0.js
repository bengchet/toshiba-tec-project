webpackJsonp([0],{

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(609);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SettingsPageModule = (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]),
            ],
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_mqtt_mqtt__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_platform_platform__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_socket_io_socket_io__ = __webpack_require__(65);
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
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams, mqtt, socket, auth, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mqtt = mqtt;
        this.socket = socket;
        this.auth = auth;
        this.platform = platform;
        this.input = {
            url: 'broker.hivemq.com',
            port: 8000
        };
    }
    SettingsPage.prototype.ionViewCanEnter = function () {
        return this.auth.checkAuthentication();
    };
    SettingsPage.prototype.addMQTTServer = function () {
        this.mqtt.addBroker(this.input.url, this.input.port);
    };
    SettingsPage.prototype.removeMQTTServer = function (broker) {
        this.mqtt.removeBroker(broker.url);
    };
    SettingsPage.prototype.setAsDefaultMQTTServer = function (broker) {
        var _this = this;
        this.mqtt.setDefaultBroker(broker.url).then(function () {
            _this.mqtt.startBroker();
            _this.socket.initialise();
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/pages/settings/settings.html"*/`<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n    <ion-list>\n      <ion-item>\n        <ion-label stacked>MQTT Broker Url</ion-label>\n        <ion-input type="text" placeholder="e.g. broker.hivemq.com" [(ngModel)]="input.url"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>MQTT Broker Port</ion-label>\n        <ion-input type="number" placeholder="e.g. 8000" [(ngModel)]="input.port"></ion-input>\n      </ion-item>\n    </ion-list>\n    <div text-center padding-bottom>\n      <button ion-button (click)="addMQTTServer()">\n        Add New MQTT Broker\n      </button>\n    </div>\n    <ion-list>\n      <ion-item-group>\n        <ion-item-divider color="light">\n          MQTT Server List\n        </ion-item-divider>\n        <ion-item *ngFor="let broker of mqtt.getRegisteredBrokerList() | async">\n          <h2>\n            <b>{{ broker.url }}</b>\n            <ion-icon *ngIf="broker.default" color="secondary" name="ios-checkmark-circle"></ion-icon>\n          </h2>\n          <p>Port: {{ broker.port }}</p>\n          <button *ngIf="!broker.default" ion-button clear item-right (click)="setAsDefaultMQTTServer(broker)">Set as Default</button>\n          <button ion-button clear icon-only item-right (click)="removeMQTTServer(broker)">\n            <ion-icon name="trash"></ion-icon>\n          </button>\n        </ion-item>\n      </ion-item-group>\n    </ion-list>\n  \n  </ion-content>\n`/*ion-inline-end:"/home/beng/Desktop/toshiba_tec_project (nightly)/ionic/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_mqtt_mqtt__["a" /* MqttProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_socket_io_socket_io__["a" /* SocketIoProvider */],
            __WEBPACK_IMPORTED_MODULE_0__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_platform_platform__["a" /* Platform */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=0.js.map