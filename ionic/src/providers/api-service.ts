import { Http } from '@angular/http';
import { NgZone, Injectable } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

declare var navigator: any;
declare var Connection: any;

// Storage
import { Storage } from '@ionic/storage';
// Config
import { Config, Constants } from './config';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { AuthProvider } from './auth/auth';

@Injectable()
export class ApiService {
  host: String;
  endpoint: String;
  connect_timeout: number = 25000;
  retry: number = 1;
  
  username: String = ''
  password: String = ''

  constructor(
    public platform: Platform,
    public http: Http,
    public zone: NgZone,
    public storage: Storage,
    public events: Events,
    private auth: AuthProvider
  ) {
    let config = new Config();
    this.host = config.host;
    this.endpoint = config.endpoint;
  }

  getControllers(){
    return this.getRequest('getRegisteredControllers')
  }

  addController(params){
    return this.postRequest('addController', params, true);
  }

  registerDevice(params) {
    return this.postRequest('addDeviceId', params, true);
  }

  unregisterDevice(params) {
    return this.postRequest('removeDeviceId', params, true);
  }

  getRequest(uri, params?) {

    return Observable.create(observer => {

      let _getRequest = () => {

        let url = this.endpoint + '/' + uri;

        console.log('[API] Get request endpoint', url);

        let headers = new Headers({
          'Authorization': 'Basic ' + this.auth.token
        });

        let options = new RequestOptions({
          headers: headers,
          search: params ? this.json2url(params) : null
        });

        console.log('[API] Get request params', options.search ? options.search.toString() : 'none');

        this.http.get(url, options).timeout(this.connect_timeout).retry(this.retry)
          .subscribe(data => {
            let _data = data.json();
            console.log('[API] Get request response', _data);
            observer.next(_data);
            observer.complete();
          }, error => {
            //console.debug('ERROR', error)
            console.log('[API] Get request error', error.status, error);

            //handle unauthorized by refresh token
            if (error.status == 401) { }

            else if (error.status == 404) {
              observer.next({
                success: false,
                message: Constants.NOT_FOUND,
                result: null
              });
              observer.complete();
            }

            else if (error.status == 500) { // can be internal server error or internet problem
              let _msg = '';
              if (!this.isOnline()) {
                _msg = Constants.OFFLINE_MESSAGE;
              }
              else
                _msg = Constants.SERVER_ERR
              observer.next({
                success: false,
                message: _msg,
                result: null
              });
              observer.complete();
            }

            // other unknown errors
            else {
              observer.next({
                success: false,
                message: error.message,
                result: null
              });
              observer.complete();
            }

          }, () => {
            console.log('[API] Get request completed');
          });
      }

      // start the get request
      _getRequest();
    })
  }

  postRequest(uri, params, isAuthorized?, isJSON?) {
    return Observable.create(observer => {

      let _postRequest = () => {
        let url = this.endpoint + '/' + uri;

        console.log('[API] Post request endpoint', url);

        let headers = new Headers({
          'Authorization': isAuthorized ? ('Basic ' + this.auth.token) : null,
          'Content-Type': isJSON ? 'application/json' : 'application/x-www-form-urlencoded'
        });

        let options = new RequestOptions({
          headers: headers
        });

        let body = isJSON ? params : this.json2url(params).toString();
        console.log('[API] Post request params', body);

        this.http.post(url, body, options).timeout(this.connect_timeout).retry(this.retry)
          .subscribe(data => {
            let _data = data.json();

            console.log('[API] Post request response', _data);
            observer.next(_data);
            observer.complete();
          }, error => {
            console.log('[API] Post request error', error.status, error);

            //handle unauthorized by refresh token
            if (error.status == 401) { }

            else if (error.status == 404) {
              observer.next({
                success: false,
                message: Constants.NOT_FOUND,
                result: null
              });
              observer.complete();
            }

            else if (error.status == 500) { // can be internal server error or internet problem
              let _msg = '';
              if (!this.isOnline()) {
                _msg = Constants.OFFLINE_MESSAGE;
              }
              else
                _msg = Constants.SERVER_ERR
              observer.next({
                success: false,
                message: _msg,
                result: null
              });
              observer.complete();
            }

            // other unknown errors
            else {
              observer.next({
                success: false,
                message: error.message,
                result: null
              });
              observer.complete();
            }
          }, () => {
            console.log('[API] Post request completed');
          });
      }

      // start the post request
      _postRequest();
    })
  }

  json2url(json) {
    let params = new URLSearchParams();
    for (var p in json) {
      if (json.hasOwnProperty(p)) {
        params.append(p, json[p])
      }
    }
    return params;
  }

  isOnline(): boolean {
    if (this.platform.is('cordova')) {
      return navigator.connection.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }

  }
}
