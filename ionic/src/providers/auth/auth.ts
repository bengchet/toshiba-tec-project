import { MqttProvider } from './../mqtt/mqtt';
import { Storage } from '@ionic/storage';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  username =  'toshiba';
  password = 'toshibatec1234';
  isAuthenticated = false;
  token: string = '';

  constructor(
    //public http: HttpClient, 
    private storage: Storage,
    private mqtt: MqttProvider,
    private events: Events
  ) {
    this.storage.get('token').then(token=>{
      if(token)
        this.token = token
    })
  }

  login(credentials): Promise<boolean>{
    return new Promise((rs, rj)=>{
      this.isAuthenticated = 
        (credentials.username == this.username && credentials.password == this.password);
      this.storage.set('isAuthenticated', this.isAuthenticated).then(()=>{
        if(this.isAuthenticated){
          this.token = btoa(this.username+':'+this.password);
          this.storage.set('token', this.token)
        }
        rs(this.isAuthenticated)
      })
    })
  }

  logout(){
    return new Promise((rs, rj)=>{
      this.isAuthenticated = false;
      this.token = '';
      this.storage.set('isAuthenticated', this.isAuthenticated).then(()=>{
        this.storage.clear()
        this.mqtt.reset()
	this.events.publish('user:logout');
        rs(this.isAuthenticated)
      })
    })
  }

  checkAuthentication(){
    return this.storage.get('isAuthenticated')
  }

}
