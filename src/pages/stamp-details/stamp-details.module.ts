import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StampDetailsPage } from './stamp-details';

@NgModule({
  declarations: [
    StampDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StampDetailsPage),
  ],
})
export class StampDetailsPageModule {}
