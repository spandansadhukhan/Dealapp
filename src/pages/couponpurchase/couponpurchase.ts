import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the CouponpurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-couponpurchase',
  templateUrl: 'couponpurchase.html',
})
export class CouponpurchasePage {

  public response:any;
  responseData : any;
  public coupondetails:any;
  public couponname:any;
  public couponprice:any;
  public couponid:any;
  public coupontype:any;
  public couponno:any;
  public id:any;
  public type:any;

  constructor(public navCtrl: NavController,public authService:AuthServiceProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponpurchasePage');
    this.id = this.navParams.get('coupon_id');
    this.type = this.navParams.get('coupon_type');
    this.details(this.id);
  }

  details(id){
    // alert(id);
     let serval={
       "id":id,
      };
      
     this.authService.postData(serval,'coupons/coupon_details_api').then((result) => {
       this.responseData = result
  
       if( this.responseData.ACK == 1)
       {
        
         this.coupondetails =  this.responseData.Coupons_details;
         this.couponname=this.responseData.Coupons_details.coupon_name;
         this.couponprice=this.responseData.Coupons_details.coupon_price;
         this.couponid=this.responseData.Coupons_details.coupon_id;
         this.coupontype=this.responseData.Coupons_details.coupon_type;
         this.couponno=this.responseData.Coupons_details.coupon_no;
         //this.deallocation=this.responseData.Coupons_details.deal_location;
         //this.deallat=this.responseData.Coupons_details.deal_lat;
         
        // alert(JSON.stringify(this.dealdetails))
         console.log('ccc',this.coupondetails);
       }
       else
       {
         this.coupondetails = '';
         
       }
      
     }, (err) => {
       console.log(err);
       // Error log
     });
   }



}
