import { firebaseConfig } from './../providers/config';
import { MqttProvider } from './../providers/mqtt/mqtt';
import { PushServiceProvider } from './../providers/push/push-service'
import { ViewChild, Component } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { Nav } from 'ionic-angular';

import * as firebase from 'firebase/app';
import 'firebase/messaging'
import { SocketIoProvider } from '../providers/socket-io/socket-io';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = '';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private socket: SocketIoProvider,
    private auth: AuthProvider,
    private mqtt: MqttProvider,
    private events: Events,
    private push: PushServiceProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      if (platform.is('core'))
        firebase.initializeApp(firebaseConfig);

      if (platform.is('mobile'))
        statusBar.styleDefault()

      // init push service
      if (platform.is('mobile')) {
        this.push.init()
      }
      else {
        this.push.initDesktop();
      }

      this.auth.checkAuthentication().then((allowed) => {
        if (allowed) {
          this.events.publish('user:login')
          this.rootPage = HomePage;
        }
        else
          this.rootPage = 'LoginPage';

        if (platform.is('mobile'))
          splashScreen.hide();
      })
    })
      ;
  }
}

