//import { Service } from './../service-manager';
import { AlertProvider } from './../alert';
import { NgZone, Injectable } from '@angular/core';
import { Events, Platform } from 'ionic-angular';

// Native
import { Device } from '@ionic-native/device';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { Observable } from 'rxjs/Observable';

// Storage
import { Storage } from '@ionic/storage';

import * as moment from 'moment';
import { ApiService } from '../api-service';
import * as firebase from 'firebase';
declare var window;

@Injectable()
export class PushServiceProvider {

  pushOptions: PushOptions = {
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

  pushObject: PushObject;
  device_uuid: string;
  unread: any;
  notifications: any = [];
  registerId: any;

  public subscription: any;
  observer: any;
  isDeviceRegistered: boolean = false;
  registerScheduler: any;
  registerSchedulerInterval: number = 10000;
  registerFunc: any;
  isLoggedIn: boolean = false;
  messaging: any;

  constructor(
    public platform: Platform,
    public device: Device,
    public push: Push,
    public events: Events,
    public storage: Storage,
    public zone: NgZone,
    private alertService: AlertProvider,
    private api: ApiService
  ) {
    this.subscription = Observable.create(observer => {
      this.observer = observer;
    });

    this.registerFunc = () => {
      console.log('[PUSH] Running scheduler...')
      if (!this.isLoggedIn || !this.isDeviceRegistered) {
        this.restartScheduler();
      }
      else {
        this.registerDevice().then(success => {
          if (!success)
            this.restartScheduler()
          else {
            console.log('[PUSH] Successfully registered device!')
            this.stopScheduler();
          }
        }).catch(Err => {
          this.restartScheduler()
        })
      }
    }

    platform.ready().then(() => {
      if (this.platform.is('mobile')) {
        this.device_uuid = this.device.uuid;
        console.log("[PUSH] Device uuid:", this.device_uuid);
      }
      else {
        let nav = window.navigator;
        let screen = window.screen;
        let guid = nav.mimeTypes.length;
        guid += nav.userAgent.replace(/\D+/g, '');
        guid += nav.plugins.length;
        guid += screen.height || '';
        guid += screen.width || '';
        guid += screen.pixelDepth || '';

        this.device_uuid = guid;
      }
    })

    events.subscribe('user:login', () => {
      this.isLoggedIn = true;
    })

    events.subscribe('user:logout', () => {
      console.log('user logout')
      this.isLoggedIn = false;

      // when logout, trigger register func
      this.triggerScheduler();
    })

    // trigger register func at start
    this.triggerScheduler()
  }

  isInitialised(): boolean {
    return this.isDeviceRegistered;
  }

  isWiFiRequired(): boolean {
    return false;
  }

  isCordovaRequired(): boolean {
    return true;
  }

  isLoggedInRequired(): boolean {
    return false;
  }

  name(): string {
    return 'PushService'
  }

  triggerScheduler() {
    if (this.platform.is('mobile')) {
      console.log('[PUSH] Trigger scheduler...')
      this.registerFunc();
    }
  }

  restartScheduler() {
    // start scheduler
    this.registerScheduler = setTimeout(this.registerFunc.bind(this), this.registerSchedulerInterval)
  }

  stopScheduler() {
    clearTimeout(this.registerScheduler);
  }

  init() {
    console.log('[PUSH] Starting Push Service');
    // local and push notification settings

    Promise.all([

      this.storage.get('notifications'),
      this.initNotificationsCounter()

    ]).then((data) => {
      // store the data
      if (data[0])
        this.notifications = data[0];
      else {
        this.notifications = [];
        this.updateStorage();
      }

      console.log('[PUSH] Push notifications list: ', this.notifications)

      this.pushObject = this.push.init(this.pushOptions);

      this.pushObject.on('notification').subscribe((notification: any) => {
        let action = () => {
          console.log('[PUSH] Received a notification', JSON.stringify(notification));

          // add notifcations to storage
          this.zone.run(() => {
            this.addNotification(notification);
          })
        }
        if (this.platform.is('ios')) {
          this.pushObject.finish().then(() => {
            action();
          })
        }
        else if (this.platform.is('android')) {
          action();
        }

      });

      this.pushObject.on('registration').subscribe((registration: any) => {
        console.log('[PUSH] Device registered ' + JSON.stringify(registration));
        this.registerId = registration.registrationId;
        this.isDeviceRegistered = true;
      });

      this.pushObject.on('error').subscribe(error => {
        console.error('[PUSH] Error with Push plugin', error);
        //this.alertService.showToast('We have error with push notification activation. Please restart the app', 3000, true);
        this.isDeviceRegistered = false;
      });
    });
  }

  updateStorage() {
    return this.storage.set('notifications', this.notifications);
  }

  update() {
    this.storage.get('notifications').then((data) => {
      // store the data
      if (data)
        this.notifications = data;
      else {
        this.notifications = [];
      }
      //this.broadcast();
    });
  }

  addNotification(notification) {
    //let array = this.notifications.map(function (d) { return d['additionalData']['google.message_id']; });
    //let idx = array.indexOf(notification['additionalData']['google.message_id']);
    let array = this.notifications.map(function (d) { return d['additionalData']['notId']; });
    let idx = array.indexOf(notification['additionalData']['notId']);
    //console.log(array, notification)
    if (idx == -1 && notification['additionalData']['jobId']) {
      this.notifications.push(notification);
      // update storage
      this.updateStorage().then(() => {
        // broadcast new notifications list
        this.observer.next(true);
      });
    }
  }

  removeNotification(id) {
    // filter any notification that related to same id
    let isRemoved: boolean = false;
    let array = this.notifications.filter((item) => {
      if (item.additionalData.jobId == id)
        isRemoved = true;
      return (item.additionalData.jobId != id);
    })

    if (isRemoved) {
      this.notifications = array;
      // update storage
      this.updateStorage().then(() => {
        // broadcast new notifications list
        this.observer.next(false);
      });
    }
  }

  public getAmount() {
    return this.notifications.length;
  }

  registerDevice() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('mobile')) {
        let _request = () => {
          let type = this.platform.is('ios') ? 'ios' : 'android'

          this.api.registerDevice({
            deviceId: this.device_uuid,
            deviceToken: this.registerId,
            deviceType: type
          }).subscribe(resp => {
            console.log('[PUSH] Got response from server', resp);
            if (resp.success) {
              console.log('[PUSH] Push registration successful!');
              this.storage.set('fcm_token', this.registerId).then(() => resolve(true))
            }
            else {
              console.log('[PUSH] Push registration failed!');
              resolve(false);
              // set retry after 5 seconds 
              //setTimeout(_request, 5000);
            }
          });
        }
        _request();
      }
      else {
        resolve(true);
      }
    })
  }

  unregisterDevice() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('mobile')) {
        this.api.unregisterDevice({
          deviceId: this.device_uuid,
        }).subscribe((resp) => {
          console.log('[PUSH] Push unregister response: ', resp);
          resolve(resp.success);
        }, err => {
          console.log('[PUSH] Push unregister failed!', err);
          resolve(false);
        });
      }
      else {
        resolve(true);
      }
    })
  }

  unregisterPushService() {
  }

  initNotificationsCounter() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('mobile')) {
        this.getLocalNotificationsCounter().then((val) => {
          if (!val) { // reset to 0
            this.setLocalNotificationsCounter(0).then(() => {
              resolve();
            });
          }
          else // if got value , just skip
            resolve();
        })
      }
      else
        resolve();
    })
  }

  setLocalNotificationsCounter(val) {
    return this.storage.set('localCounter', val);
  }

  getLocalNotificationsCounter() {
    return this.storage.get('localCounter');
  }

  // Desktop
  resetUI() {
    // [START get_token]
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    this.messaging.getToken()
      .then((currentToken) => {
        if (currentToken) {
          this.sendTokenToServer(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          this.setTokenSentToServer(false);
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        this.setTokenSentToServer(false);
      });
  }

  initDesktop() {
    this.messaging = firebase.messaging();
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken().then(token => {
        this.setTokenSentToServer(false);
        this.sendTokenToServer(token)
        this.resetUI();
      })
    })
    this.messaging.onMessage((payload) => {
      console.log(payload)
    })
    this.resetUI()
  }

  isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') == 1;
  }

  setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? 1 : 0);
  }

  isPermissionGranted() {
    return window.localStorage.getItem('gcm_desktop_notifcation') == 1;
  }

  setPermissionGranted(granted) {
    window.localStorage.setItem('gcm_desktop_notification', granted ? 1 : 0);
  }

  requestPermission() {
    this.messaging.requestPermission().then(() => {
      console.log('[PUSH] Desktop notification permission granted.');
      this.setPermissionGranted(true)
      this.resetUI();
    }).catch(e => {
      console.log('[PUSH] Unable to get desktop permission to notify.', e);
      this.setPermissionGranted(false)
    })
  }

  deleteToken() {
    this.messaging.getToken()
      .then((currentToken) => {
        this.messaging.deleteToken(currentToken)
          .then(() => {
            console.log('Token deleted.');
            this.setTokenSentToServer(false);
            this.resetUI();
          }).catch((err) => {
            console.log('Unable to delete token. ', err);
          });
      })
  }

  sendTokenToServer(token) {
    if (!this.isTokenSentToServer()) {
      this.setTokenSentToServer(true);
      this.api.registerDevice({
        deviceId: this.device_uuid,
        deviceToken: token,
        deviceType: 'browser'
      }).subscribe(resp => {
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
  }

}
