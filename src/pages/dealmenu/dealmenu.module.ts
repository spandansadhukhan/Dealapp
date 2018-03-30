import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealmenuPage } from './dealmenu';

@NgModule({
  declarations: [
    DealmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(DealmenuPage),
  ],
})
export class DealmenuPageModule {}
