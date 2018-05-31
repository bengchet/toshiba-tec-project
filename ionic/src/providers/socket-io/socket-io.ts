import { Observable } from 'rxjs/Observable';
import { Events } from 'ionic-angular';
import { Config } from './../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { MqttProvider } from '../mqtt/mqtt';
import * as io from 'socket.io-client';
//declare var io;

@Injectable()
export class SocketIoProvider {

  socket: any;
  isAuthorized: number = -1;
  observable: any;
  observer: any;
  subscribedTopics: any = [];
  connectionStatus: boolean = false;
  brokerReadyResolve: any;
  mqttReady: boolean = false;

  constructor(
    private events: Events,
    private auth: AuthProvider,
    private mqtt: MqttProvider
  ) {
    this.observable = Observable.create(observer => {
      this.observer = observer;
    })

    this.events.subscribe('user:login', () => {
      if (!this.mqttReady) {
        new Promise(rs => {
          this.brokerReadyResolve = rs;
        }).then(() => this.initialise());
      }
      else{
        this.initialise();
      }
    });

    this.mqtt.ready().then(() => {
      if (this.brokerReadyResolve){
        this.mqttReady = true;
        this.brokerReadyResolve();
      } else {
        this.mqttReady = true;
      }
    })
  }

  initialise() {
    if (this.socket) {
      this.socket.close();
    }
    let defaultBroker = this.mqtt.getDefaultBroker();
    this.socket = io(new Config().host + defaultBroker.url ? ('/' + defaultBroker.url) : '', { path: '/toshiba-tec-project/socket.io'})

    this.socket.on('connect', () => {
      console.log('[SOCKET] Connected to server, checking authentication...')
      console.log(this.auth.token)
      this.isAuthorized = -1;
      this.socket.emit('authentication', this.auth.token)
    })

    this.socket.on('authentication', (result) => {
      console.log('[SOCKET] Authentication result from server..', result.success)

      if (result.success) {
        this.isAuthorized = 1;

        // start subscribe if there is any
        this.subscribedTopics.forEach(topic => {
          this.subscribeTopic(topic, 1)
        })
      }
      else {
        this.isAuthorized = 0;
      }
      // start check connection
      this.socket.emit('mqtt:connection')
    })

    this.socket.on('mqtt:message', (data) => {
      this.observer.next(data)
    })

    this.socket.on('mqtt:connection', (data) => {
      console.log('[SOCKET] Getting MQTT connection status...', data.result)
      this.connectionStatus = data.result;
    })

    this.socket.on('disconnect', () => {
      this.connectionStatus = false;
    })
  }

  publish(topic: string, payload: string, qos: number) {
    this.socket.emit('mqtt:publish', {
      topic: topic,
      payload: payload,
      qos: qos
    })
  }

  subscribeTopic(topic: string, qos: number) {
    if (this.subscribedTopics.indexOf(topic) == -1) {
      // add the topic
      this.subscribedTopics.push(topic)
    }
    this.socket.emit('mqtt:subscribe', { topic: topic, qos: qos })
  }

  unsubscribeTopic(topic: string) {
    this.socket.emit('mqtt:unsubscribe', topic)
    this.subscribedTopics = this.subscribedTopics.filter(_topic => {
      return _topic != topic
    })
  }

  unsubscribeAllTopics() {
    this.subscribedTopics.forEach(topic => {
      this.unsubscribeTopic(topic)
    })
  }

  getMessages() {
    return this.observable;
  }

}
