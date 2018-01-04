import { SocketIoProvider } from './../../providers/socket-io/socket-io';
import { Storage } from '@ionic/storage';
import { MqttProvider } from './../../providers/mqtt/mqtt';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, NgZone } from '@angular/core';
import { Platform, NavController, PopoverController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { App } from 'ionic-angular/components/app/app';
import { ApiService } from '../../providers/api-service';
import { AlertProvider } from '../../providers/alert';
import { PushServiceProvider } from '../../providers/push/push-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /*devices = [{
    id: '1078310',
    status: 0,
    lastSeen: moment(Date.now()).format('LLL')
  },{
    id: '1077772',
    status: 0,
    lastSeen: moment(Date.now()).format('LLL')
  }];*/
  devices: any = [];
  isLoading: boolean = true;

  constructor(
    public navCtrl: NavController,
    private popover: PopoverController,
    public mqtt: MqttProvider,
    private socket: SocketIoProvider,
    private auth: AuthProvider,
    private platform: Platform,
    private storage: Storage,
    private alertCtrl: AlertController,
    private api: ApiService,
    private alert: AlertProvider,
    private push: PushServiceProvider
  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.auth.checkAuthentication()
  }

  ionViewWillEnter() {
    /*this.storage.get('devices').then(devices => {
      if(devices)
        this.devices = JSON.parse(JSON.stringify(devices))
    })*/
    this.refresh();
  }

  ionViewDidLoad() {
    if (this.platform.is('core') && !this.push.isPermissionGranted()) {
      // asking permission for notification
      this.push.onDesktopReady().then(() => {
        this.push.requestPermission()
      })
    }
  }

  refresh() {
    this.isLoading = true;
    this.api.getControllers().subscribe(res => {
      if (res.success) {
        console.log(res.result)
        this.devices = res.result;
      }

      this.isLoading = false;
    })
  }

  goToDevicePage(dev) {
    this.navCtrl.push('DevicePage', { id: dev })
  }

  showAddDeviceDialog() {
    let alert = this.alertCtrl.create({
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
          handler: data => {
            if (data.id) {
              this.addDevice(data.id)
            }
          }
        }
      ]
    })
    alert.present()
  }

  addDevice(id) {
    console.log(this.devices);
    let dev = this.devices.filter(item => {
      return item.id == id
    })
    if (dev.length == 0) {
      this.api.addController({ id: id }).subscribe((res) => {
        if (res.success) {
          this.refresh()
        }
        else {
          this.alert.showToast(res.msg, 3000, true)
        }
      })
      /*this.devices.push({
        id: id,
        status: 0,
        lastSeen: moment(Date.now()).format('LLL')
      })
      this.storage.set('devices', this.devices)*/
    }
  }

  removeDevice(id) {
    this.devices = this.devices.filter(item => {
      return item.id != id
    })
    this.storage.set('devices', this.devices)
  }

  updateDevices() {

  }

  presentPopover(ev) {
    let popover = this.popover.create(PopoverPage)
    popover.onDidDismiss(() => { })
    popover.present({
      ev: ev
    })
  }
}

@Component({
  template: `
    <ion-list>
    <button ion-item detail-none (click)="goToSettingsPage()">
      <ion-icon name="build" margin-right></ion-icon>
      Settings
    </button>
      <button ion-item detail-none (click)="logout()">
        <ion-icon name="exit" margin-right></ion-icon>
        Logout
      </button>
    </ion-list>
  `
})

export class PopoverPage {
  constructor(
    public viewCtrl: ViewController,
    private auth: AuthProvider,
    private app: App,
    private socket: SocketIoProvider
    //private mqtt: MqttProvider
  ) { }

  close(action?) {
    this.viewCtrl.onDidDismiss(action)
    this.viewCtrl.dismiss();
  }

  goToSettingsPage() {
    this.close(() => this.app.getRootNavs()[0].push('SettingsPage'))
  }

  logout() {
    this.auth.logout().then((isAuthenticated) => {
      if (!isAuthenticated)
        this.close(() => {
          // clear topics
          //this.mqtt.unsubscribeAllTopics();
          this.socket.unsubscribeAllTopics();
          this.app.getRootNavs()[0].setRoot('LoginPage')
        })
    })
  }
}
