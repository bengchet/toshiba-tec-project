import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevicePage } from './device';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    DevicePage,
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(DevicePage),
  ],
})
export class HomePageModule {}