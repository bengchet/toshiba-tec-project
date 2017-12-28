import { AuthProvider } from './../../providers/auth/auth';
import { DeviceConsolePage } from './../device-console/device-console';
import { DeviceInfoPage } from './../device-info/device-info';
import { MqttProvider } from './../../providers/mqtt/mqtt';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { SocketIoProvider } from '../../providers/socket-io/socket-io';

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
  socketSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mqtt: MqttProvider,
    private events: Events,
    private auth: AuthProvider,
    private socket: SocketIoProvider
  ) {

  }

  ionViewCanEnter(): Promise<boolean> {
    return this.auth.checkAuthentication()
  }

  ionViewWillLeave() {
    // stop all subscription
    this.events.publish('subscription:stop');
    /*if (this.isMqttInit){
      if(this.topic)
        this.mqtt.unsubscribeTopic(this.topic);
      this.mqtt.unregisterCallback(this.ctrlID);
    }*/
    if (this.topic) {
      this.socket.unsubscribeTopic(this.topic)
    }
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
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

      this.topic = this.ctrlID + '/#';

      // register callback
      /*this.mqtt.ready().then(() => {
        this.isMqttInit = true;
        this.mqtt.subscribeTopic(this.topic, 1);
        this.mqtt.registerCallback(this.ctrlID, this.callback.bind(this))
      })*/

      this.socket.subscribeTopic(this.topic, 1);
      this.socketSubscription = this.socket.getMessages().subscribe(data => {
        this.callback(data)
      })
    }
  }

  callback(message) {
    //console.log(message)
    this.events.publish('subscription:mqtt', message)
  }

}
