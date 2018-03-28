import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the CouponlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-couponlist',
  templateUrl: 'couponlist.html',
})
export class CouponlistPage {

 public response:any;
 responseData : any;
 public couponlist:any;
 public msg:any;
 public type:any;
 public id:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService:AuthServiceProvider,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponlistPage');
    this.type = this.navParams.get('type');
    this.id = this.navParams.get('id');
    this.coupons(this.type,this.id);
  }


  coupons(type,id){
    //alert(type);
    let serval={
      "type":type,
      "id":id,
     };
     
    this.authService.postData(serval,'coupons/coupon_list_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.couponlist =  this.responseData.Coupons; 
        
        console.log('ccc',this.couponlist);
      }
      else
      {
        this.couponlist = '';
        this.msg= this.responseData.msg;
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  }


  openModal() {

    let modal = this.modalCtrl.create("ModalContentPage");
    modal.present();
  }


purchase(coupon_id,coupon_type){

  this.navCtrl.push('CouponpurchasePage',{'coupon_id':coupon_id,'coupon_type':coupon_type});

}




}






  


