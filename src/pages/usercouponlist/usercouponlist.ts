import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the UsercouponlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usercouponlist',
  templateUrl: 'usercouponlist.html',
})
export class UsercouponlistPage {


  public response:any;
  responseData : any;
  public usercouponlist:any;
  public delete_coupon: any;
  public msg:any;
  public id:any;

  constructor(public navCtrl: NavController,
    public authService:AuthServiceProvider,
    public alertCtrl: AlertController,
    private storage: Storage,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsercouponlistPage');
    this.usercoupons();
  }



  usercoupons(){
    
    this.storage.get('uid').then(val => {
      
      //console.log(val);
      this.id = val;
     
    let serval={
      "user_id":this.id,
     };
     console.log(serval);
    this.authService.postData(serval,'coupons/userwise_coupon_list_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.usercouponlist =  this.responseData.Coupons; 
        
        //console.log('ccc',this.userdeallist);
      }
      else
      {
        this.usercouponlist = '';
        this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });

  });
  }

  coupondelete(id){
    // alert('ok');
      let serval={
        "id": id,
       };
       //console.log(serval);
      this.authService.postData(serval,'coupons/coupon_delete_api').then((result) => {
        this.response = result
   // console.log("CHATRESULTTTT",result);
        if( this.response.ACK == 1)
        {
         
          const alert = this.alertCtrl.create({
            title: this.response.msg,
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push('UsercouponlistPage');
        }
        else
        {
          const alert = this.alertCtrl.create({
            title: this.response.msg,
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push('UsercouponlistPage');
        }
       
      }, (err) => {
        console.log(err);
        // Error log
      });
  
   
    }

    couponedit(id){
    
      this.navCtrl.push('CouponeditPage',{'id':id});
  
      }


}
