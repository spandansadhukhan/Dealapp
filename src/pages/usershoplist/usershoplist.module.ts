import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsershoplistPage } from './usershoplist';

@NgModule({
  declarations: [
    UsershoplistPage,
  ],
  imports: [
    IonicPageModule.forChild(UsershoplistPage),
  ],
})
export class UsershoplistPageModule {}
