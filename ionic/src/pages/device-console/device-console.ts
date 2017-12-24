import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, Events } from 'ionic-angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { MqttProvider } from '../../providers/mqtt/mqtt';
/**
 * Generated class for the DeviceConsolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-device-console',
  templateUrl: 'device-console.html',
})
export class DeviceConsolePage {
  logs = [];
  autoScroll: boolean = true;
  timeout: any;
  initialized: boolean = false;
  subscription: Subscription;
  topic: string;
  @ViewChild('content') content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private mqtt: MqttProvider
  ) {
  }


  ionViewWillLeave() {
    clearTimeout(this.timeout);
  }

  ionViewWillEnter() {
    setTimeout(() => this.content.scrollToBottom())
  }

  ionViewDidLoad() {

    console.log('Trying to subscribe...')
    this.events.subscribe('subscription:stop', () => {
      console.log('unsubscribing mqtt...');
      this.events.unsubscribe('subscription:mqtt')
      console.log('unsubscribing event...');
      this.events.unsubscribe('subscription:stop')
    })

    this.events.subscribe('subscription:mqtt', value => {
      //console.log(value)
      value.timestamp = moment(Date.now()).format('YYYY-MM-D h:mm:ss a')
      if(this.logs.length >= 1800){
        this.logs = [];
      }
      this.logs.push(value);
      this.timeout = setTimeout(() => {
        if (this.autoScroll && this.initialized) {
          this.content.scrollToBottom()
        }
      })
    })

    this.content.ionScroll.subscribe(() => {
      
      if (this.content.isScrolling && this.content.directionY == 'up') {
        this.autoScroll = false;
      }
      // check reach bottom line, trigger autoscroll
      else if (!this.autoScroll && this.content.scrollTop + this.content.contentHeight >= this.content.getContentDimensions().scrollHeight - 20) {
        this.autoScroll = true;
      }
    })
    setTimeout(() => this.initialized = true)
  }
}
