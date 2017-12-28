import { AuthProvider } from './../../providers/auth/auth';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MqttProvider } from '../../providers/mqtt/mqtt';
import { Platform } from 'ionic-angular/platform/platform';
import { SocketIoProvider } from '../../providers/socket-io/socket-io';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'SettingsPage',
    segment: 'settings',
    defaultHistory: ['HomePage']
  }
)
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  input = {
    url: 'broker.hivemq.com',
    port: 8000
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mqtt: MqttProvider,
    private socket: SocketIoProvider,
    private auth: AuthProvider,
    public platform: Platform
  ) {
  }

  ionViewCanEnter(): Promise<boolean>{
    return this.auth.checkAuthentication()
  }

  addMQTTServer(){
    this.mqtt.addBroker(this.input.url, this.input.port)
  }

  removeMQTTServer(broker){
    this.mqtt.removeBroker(broker.url)
  }

  setAsDefaultMQTTServer(broker){
    this.mqtt.setDefaultBroker(broker.url).then(()=>{
      this.mqtt.startBroker();
      this.socket.initialise();
    })
  }

}
