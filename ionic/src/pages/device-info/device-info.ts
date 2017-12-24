import { MqttProvider } from './../../providers/mqtt/mqtt';
import { ViewChild, Component, NgZone } from '@angular/core';
import { Events, NavController, NavParams, Content } from 'ionic-angular';
import * as moment from 'moment';

const MAX_SENSORS = 31;

@Component({
  selector: 'page-device-info',
  templateUrl: 'device-info.html',
})

export class DeviceInfoPage {

  sensors: any = [];
  device: any = {
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
  ctrlID: string = '';
  forceShow: boolean = false;

  pingStatus: boolean = false;
  pingInProgress: boolean = false;
  pingTimeout: number = 10000;
  pingSetTimeout: any;

  scrolling: string = 'down';
  refreshInProgress: boolean = true;

  @ViewChild('info') content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mqtt: MqttProvider,
    private events: Events,
    private zone: NgZone
  ) {
  }

  ionViewDidLoad() {
    this.ctrlID = this.navParams.get('id');
    this.device.id = this.ctrlID;
    // initialise sensors
    this.resetSensors();

    this.events.subscribe('subscription:stop', () => {
      console.log('unsubscribing mqtt...');
      this.events.unsubscribe('subscription:mqtt')
      console.log('unsubscribing event...');
      this.events.unsubscribe('subscription:stop')
    })

    this.events.subscribe('subscription:mqtt', this.processPayload.bind(this))
    this.mqtt.ready().then(() => {
      this.refresh();
    })

    this.content.ionScrollEnd.subscribe(() => {
      //console.log(this.content.scrollTop, this.content.scrollHeight, this.content.contentHeight)
      this.zone.run(() => {
        if (this.content.scrollTop + this.content.contentHeight >= this.content.getContentDimensions().scrollHeight - 20) {
          this.scrolling = 'up'
        }
        else {
          this.scrolling = 'down'
        }
      })
    })
  }

  processPayload(value) {
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
      this.device.lastSeen = moment(Date.now()).format('YYYY-MM-D h:mm:ss a');
      return;
    }

    else if (value.destinationName == this.ctrlID + '/IN/RFID/LED1') {
      let json = JSON.parse(value.payloadString);
      console.log(json)
      let pos = parseInt(json.POS);
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
      let json = JSON.parse(value.payloadString);
      this.device.fv = json.CTRL_FIRM;
      this.device.ip = json.IP;
      this.device.intervals.PACKET_INTERVAL = json.PACKET_INTERVAL;
      this.device.intervals.PUB_INTERVAL = json.PUB_INTERVAL;
      this.device.lastReboot = moment(Date.now()).format('YYYY-MM-D h:mm:ss a');
    }

    else if (value.destinationName == this.ctrlID + '/OUT/RFID/STATUS') {
      this.refreshInProgress = false;
      let json = JSON.parse(value.payloadString);
      let pos = parseInt(json.POS);
      if (pos < MAX_SENSORS) {
        this.sensors[pos].fv = json.SNSR_FIRM;
        this.sensors[pos].weight = json.WEIGHT;
        this.sensors[pos].proximity = json.PROXIMITY;
        this.sensors[pos].button = json.BUTTON;
        this.sensors[pos].currentRFID = json.RFID;
        if(json.WEIGHT){
          this.sensors[pos].type = 'Weight'
        }
        else if(json.PROXIMITY){
          this.sensors[pos].type = 'Proximity'
        }else{
          this.sensors[pos].type = 'Button'
        }
      }
      this.sensors[pos].isOnline = true;
    }
    else if (value.destinationName == this.ctrlID + '/OUT/RFID/WEIGHT') {
      let json = JSON.parse(value.payloadString);
      console.log(json)
      let pos = parseInt(json.POS);
      if (pos < MAX_SENSORS) {
        this.sensors[pos].weight = json.WEIGHT;
        this.sensors[pos].currentRFID = json.RFID;
      }
      this.sensors[pos].isOnline = true;
    }

    else if (value.destinationName == this.ctrlID + '/OUT/RFID/PRX1') {
      let json = JSON.parse(value.payloadString);
      console.log(json)
      let pos = parseInt(json.POS);
      if (pos < MAX_SENSORS) {
        this.sensors[pos].proximity = json.PROXIMITY;
      }
      this.sensors[pos].isOnline = true;
    }

    else if (value.destinationName == this.ctrlID + '/OUT/RFID/BTN1') {
      let json = JSON.parse(value.payloadString);
      console.log(json)
      let pos = parseInt(json.POS);
      if (pos < MAX_SENSORS) {
        this.sensors[pos].button = json.BUTTON;
      }
      this.sensors[pos].isOnline = true;
    }

    this.device.lastSeen = moment(Date.now()).format('YYYY-MM-D h:mm:ss a');
    this.device.status = 1;

    //console.log(this.sensors)
  }

  resetSensors(){
    this.sensors = [];
    for (let i = 0; i < MAX_SENSORS; i++) {
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
      })
    }
  }

  ping() {
    this.pingInProgress = true;
    this.pingSetTimeout = setTimeout(() => {
      this.pingInProgress = false;
      this.pingSetTimeout = null;
    }, this.pingTimeout)
    this.mqtt.publish(this.ctrlID + '/IN/CHECK', JSON.stringify(
      { CTRL_ID: this.ctrlID }
    ), 1)
  }

  refresh() {
    this.refreshInProgress = true;
    this.resetSensors();
    this.mqtt.publish(this.ctrlID + '/IN/CTRL/REFRESH', JSON.stringify(
      { CTRL_ID: this.ctrlID }
    ), 1)
  }

  reboot() {
    this.mqtt.publish(this.ctrlID + '/REBOOT', "\"REBOOT\"", 1)
  }

  setIntervals() {
    this.mqtt.publish(this.ctrlID + '/IN/INTERVAL', JSON.stringify(this.device.intervals), 1)
  }

  overrideLED(device, state: string) {
    this.mqtt.publish(this.ctrlID + '/IN/RFID/LED1', JSON.stringify(
      {
        CTRL_ID: this.ctrlID,
        RFID: device.currentRFID,
        POS: device.pos.toString(),
        LED: state
      }
    ), 1)
  }

  scroll() {
    if (this.scrolling == 'up') {
      this.content.scrollToTop()
    }
    else {
      this.content.scrollToBottom()
    }
  }

}
