import { AuthProvider } from './../../providers/auth/auth';
import { DeviceConsolePage } from './../device-console/device-console';
import { DeviceInfoPage } from './../device-info/device-info';
import { MqttProvider } from './../../providers/mqtt/mqtt';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

@IonicPage(
  {
    name: 'DevicePage',
    segment: 'device/:id'
  }
)
@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {

  ctrlID: string = '';
  tabs = [];
  topic: string;
  isMqttInit: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mqtt: MqttProvider,
    private events: Events,
    private auth: AuthProvider
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.auth.checkAuthentication()
  }

  ionViewWillLeave() {
    // stop all subscription
    this.events.publish('subscription:stop');
    if (this.isMqttInit){
      this.mqtt.unsubscribeTopic(this.topic);
      this.mqtt.unregisterCallback(this.ctrlID);
    }
  }

  ionViewDidLoad() {
    if (this.navParams.get('id')) {
      this.ctrlID = this.navParams.get('id');
      this.tabs = [
        {
          page: DeviceInfoPage,
          params: {
            id: this.ctrlID
          },
          title: 'Info',
          id: 'Info'
        }, {
          page: DeviceConsolePage,
          params: {
            id: this.ctrlID
          },
          title: 'Console',
          id: 'Console'
        }
      ]

      console.log(this.tabs)
      // register callback
      this.mqtt.ready().then(() => {
        this.isMqttInit = true;
        this.topic = this.ctrlID + '/#';
        this.mqtt.subscribeTopic(this.topic, 1);
        this.mqtt.registerCallback(this.ctrlID, this.callback.bind(this))
      })
    }
  }

  callback(message) {
    //console.log(message)
    this.events.publish('subscription:mqtt', message)
  }
}
