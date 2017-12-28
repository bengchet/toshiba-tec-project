import { ApiService } from './../providers/api-service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { PopoverPage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { Device } from '@ionic-native/device';
import { MqttProvider } from '../providers/mqtt/mqtt';
import { Push } from '@ionic-native/push';
import { PushServiceProvider } from '../providers/push/push-service';
import { AlertProvider } from '../providers/alert';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { DeviceConsolePage } from '../pages/device-console/device-console';
import { DeviceInfoPage } from '../pages/device-info/device-info';
import { DevicePage } from '../pages/device/device';
import { SocketIoProvider } from '../providers/socket-io/socket-io';

@NgModule({
  declarations: [
    MyApp,
    PopoverPage,
    DeviceConsolePage,
    DeviceInfoPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      preloadModules: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverPage,
    DeviceConsolePage,
    DeviceInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    MqttProvider,
    Push,
    PushServiceProvider,
    AlertProvider,
    ApiService,
    SocketIoProvider
  ]
})
export class AppModule {}
