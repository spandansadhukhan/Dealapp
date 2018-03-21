import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponlistPage } from './couponlist';

@NgModule({
  declarations: [
    CouponlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CouponlistPage),
  ],
})
export class CouponlistPageModule {}
