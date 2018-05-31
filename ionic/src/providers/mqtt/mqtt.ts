import { Http } from '@angular/http';
import { Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';

declare var navigator: any;
declare var Connection: any;

const mqtt_url = '13.58.141.26';

@Injectable()
export class MqttProvider {
  public mqttClient: Paho.MQTT.Client;
  public mqttConnectionStatus: boolean = false;
  public mqttSubscribedTopics: any = [];

  mqttUrl: string = '';
  mqttPort: number = 8000;
  mqttOptions: any = {
    timeout: 10,
    keepAliveInterval: 10
  };
  mqttRegisteredBrokerList: any = [];
  readyObservable: Observable<any>;
  observer: any;
  callbacks: any = [];
  noReconnect: boolean = false;
  failureTimeout: any;
  disconnectTimeout: any;
  private _readyPromise: Promise<any>;
  private _readyResolve: any;

  constructor(
    private storage: Storage,
    private platform: Platform,
    private http: Http,
    private events: Events
  ) {
    console.log('[mqtt] Initiating MQTT...')
    this.prepareReady();
    // create observer
    this._readyPromise = new Promise(res => { this._readyResolve = res; });
    // check for default broker from broker list
    this.storage.get('mqttBrokers').then(value => {
      if (value && value.length > 0) {

        // update broker list
        this.mqttRegisteredBrokerList = value;
        console.log(this.mqttRegisteredBrokerList);

        // start broker
        this.startBroker();
      } else { // we set default values
        this.addBroker(mqtt_url).then(()=>{
          this.setDefaultBroker(mqtt_url).then(()=>{
            
            this.startBroker();
          })
        })
      }
    })
  }

  ready(): Promise<boolean> {
    return this._readyPromise;
  }

  private triggerReady() {
    this._readyResolve()
  }

  prepareReady() {
    if (this.mqttConnectionStatus)
      this.triggerReady()
    else {
      this.events.subscribe('mqtt:ready', this.completed.bind(this))
    }
  }

  private completed() {
    this.events.unsubscribe('mqtt:ready')
    this.triggerReady()
  }

  reset() {
    this.mqttRegisteredBrokerList = [];
    this.callbacks = [];
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout)
      this.disconnectTimeout = null;
    }
    if (this.failureTimeout) {
      clearTimeout(this.failureTimeout)
      this.failureTimeout = null;
    }
    this.mqttUrl = '';
    this.disconnectBroker();
  }

  startBroker() {
    console.log('[mqtt] start broker')
    this.disconnectBroker();

    let defaultBroker = this.getDefaultBroker();
    console.log('Default', defaultBroker)

    if (!defaultBroker.url) return;

    this.mqttUrl = defaultBroker.url;
    this.mqttPort = defaultBroker.port ? parseInt(defaultBroker.port) : 8000;
    this.mqttOptions = defaultBroker.options ? defaultBroker.options : this.mqttOptions;

    if (this.failureTimeout)
      clearTimeout(this.failureTimeout);
    if (this.disconnectTimeout)
      clearTimeout(this.disconnectTimeout);

    let reconnectOnStart = () => {
      setTimeout(() => {
        if (this.isOnline()) {
          this.noReconnect = false;
          this.connect()
        }
        else reconnectOnStart()
      }, 2000)
    }
    //reconnectOnStart();
    this.triggerReady();
  }

  callback(message: Paho.MQTT.Message) {
    //this.observer.next(message)
    for (let i in this.callbacks) {
      this.callbacks[i](message)
    }
  }

  registerCallback(id, cb) {
    this.callbacks[id] = cb;
  }
  unregisterCallback(id) {
    this.callbacks = this.callbacks.filter((item, key) => {
      return key != id;
    })
  }

  /*getObservable() {
    return this.observable;
  }*/

  publish(topic: string, payload: string, qos) {
    let msg = new Paho.MQTT.Message(payload);
    msg.destinationName = topic;
    msg.qos = qos;
    this.mqttClient.send(msg);
  }

  subscribeTopic(topic, qos) {
    if (this.mqttSubscribedTopics.indexOf(topic) == -1) {
      // add the topic
      this.mqttSubscribedTopics.push(topic)
      this.mqttClient.subscribe(topic, { qos: qos })
    }
    console.log(this.mqttSubscribedTopics)
  }

  unsubscribeTopic(topic: string) {
    this.mqttClient.unsubscribe(topic, {})
    this.mqttSubscribedTopics = this.mqttSubscribedTopics.filter(_topic => {
      return _topic != topic
    })
    console.log(this.mqttSubscribedTopics)
  }

  unsubscribeTopics(topics: Array<string>) {
    topics.forEach(topic => {
      this.unsubscribeTopic(topic);
    })
  }

  unsubscribeAllTopics() {
    this.mqttSubscribedTopics.forEach(topic => {
      this.unsubscribeTopic(topic)
    })
    this.mqttSubscribedTopics = [];
  }

  onConnected() {
    this.events.publish('mqtt:ready')
    this.mqttConnectionStatus = true;
    console.log('[mqtt] MQTT connected');
    this.mqttSubscribedTopics.forEach(topic => {
      this.mqttClient.subscribe(topic, { qos: 1 })
    })
  }

  onLostConnection() {
    console.log('[mqtt] MQTT disconnected')
    this.mqttConnectionStatus = false;
    // Trying to reconnect
    if (!this.noReconnect) {

      let reconnectOnDisconnect = () => {
        this.disconnectTimeout = setTimeout(() => {
          if (this.isOnline()) this.connect()
          else reconnectOnDisconnect()
        }, 0);
      }

      reconnectOnDisconnect();
    }
  }

  onFailure(err) {
    console.log('[mqtt] MQTT Failure: ', err);
    this.mqttConnectionStatus = false;

    // Trying to reconnect
    if (!this.noReconnect) {
      let reconnectOnFailure = () => {
        this.failureTimeout = setTimeout(() => {
          if (this.isOnline()) this.connect()
          else reconnectOnFailure()
        }, 3000);
      }

      reconnectOnFailure();
    }
  }

  connect() {
    /*console.log('[mqtt] Connecting...')
    this.mqttClient = new Paho.MQTT.Client(this.mqttUrl, this.mqttPort, "clientId_" + Math.random().toString(16).substring(2, 8));

    this.mqttClient.onConnectionLost = this.onLostConnection.bind(this);
    this.mqttClient.onMessageArrived = this.callback.bind(this);

    let options = JSON.parse(JSON.stringify(this.mqttOptions));
    options.onSuccess = this.onConnected.bind(this);
    options.onFailure = this.onFailure.bind(this);

    this.mqttClient.connect(options);*/
  }

  getAllSubscribedTopics(): Observable<any> {
    return Observable.of(this.mqttSubscribedTopics);
  }

  getRegisteredBrokerList(): Observable<Array<Object>> {
    return Observable.of(this.mqttRegisteredBrokerList);
  }

  addBroker(url, port?, options?): Promise<any> {
    return new Promise((rs) => {
      let isExist = this.mqttRegisteredBrokerList.filter(broker => {
        return broker.url == url;
      }).length > 0;

      if (isExist)
        rs()
      else {
        this.mqttRegisteredBrokerList.push({
          'url': url,
          'port': port ? port : 8000,
          'options': options ? options : this.mqttOptions,
          'default': false
        })
        this.storage.set('mqttBrokers', this.mqttRegisteredBrokerList)
          .then(() => rs())
      }
    })
  }

  removeBroker(url): Promise<any> {
    return new Promise((rs) => {
      if (url == this.mqttUrl) {
        this.disconnectBroker();
      }
      this.mqttRegisteredBrokerList = this.mqttRegisteredBrokerList.filter(broker => {
        return broker.url != url
      })
      this.storage.set('mqttBrokers', this.mqttRegisteredBrokerList)
        .then(() => rs())
    })
  }

  disconnectBroker() {
    console.log('[mqtt] Disconnect from current broker')
    if (this.mqttClient) {
      console.log('[mqtt] Got client, disconnect first...')
      this.noReconnect = true;
      if (this.isOnline() && this.mqttClient.isConnected()) {
        this.mqttClient.disconnect();
        this.unsubscribeAllTopics();
      }
      this.mqttClient = null;
      this.mqttSubscribedTopics = [];
    }
  }

  setDefaultBroker(url): Promise<any> {
    this.mqttRegisteredBrokerList.forEach(broker => {
      if (broker.url != url) {
        broker.default = false
      }
      else {
        broker.default = true;
      }
    })
    return this.storage.set('mqttBrokers', this.mqttRegisteredBrokerList)
  }

  getDefaultBroker() {
    let brokers = this.mqttRegisteredBrokerList.filter(broker => {
      return broker.default
    });
    if (brokers.length > 0) return brokers[0];
    else return {}
  }

  isOnline(): boolean {
    if (this.platform.is('cordova')) {
      return navigator.connection.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }

  }

}
