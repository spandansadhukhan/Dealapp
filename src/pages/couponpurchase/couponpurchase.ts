import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { EmailValidator } from '@angular/forms';
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

  public loguser:any;
  public userid:any;
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
  public msg:any;
  public fname:any;
  public lname:any;
  public email:any;
  public mob_no:any;


  constructor(public navCtrl: NavController,public authService:AuthServiceProvider, public navParams: NavParams,private payPal: PayPal, public alertCtrl: AlertController,) {
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

         this.loguser =  JSON.parse(localStorage.getItem('userData'));
         this.fname=this.loguser.first_name;
         this.lname=this.loguser.last_name
         this.email=this.loguser.email;
        this.mob_no=this.loguser.mobile_number;
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

  
   paypalPayment(formData,price){
     
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AS5crcxYYgjiPybED_DVEXA1I18IkTpkuU_N_16BaEJyNcHveb7830REmz2fwPeHc9_uZqQwdOeIzTHX'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        //formData.package_id = this.package_id;
     //  formData.package_price=this.package_price;
       console.log("PACKAGGEIIDDDD",formData);
        console.log("priceeee",price);
        let payment = new PayPalPayment(price, 'USD', 'Description', 'coupon');
        console.log("PAYMENTTTTTTTTTTTTTTTT",payment);
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          console.log("IDDDDD",res.response.id);

          this.loguser =  JSON.parse(localStorage.getItem('userData')); 
          this.userid=this.loguser.id;
      
            //alert(type);
            let serval={
              "coupon_id":formData,
              "user_id":this.userid,
              "tx_id":res.response.id
             };
             console.log("servalservalservalserval",serval);
            this.authService.postData(serval,'coupons/coupon_payment_api').then((result) => {
              this.responseData = result
         // console.log("CHATRESULTTTT",result);
              if(this.responseData.ACK == 1)
              {
                const alert = this.alertCtrl.create({
                  title: 'Payment SuccessFul',
                  subTitle: "Paid",
                  buttons: ['OK']
                });
                alert.present();
               this.navCtrl.setRoot('HomePage');
              //  console.log('ccc',this.stampresult);
              }
              else
              {
               // this.stampresult = '';
                this.msg =this.responseData.msg; 
              }
             
            }, (err) => {
              console.log(err);
              // Error log
            });
          
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }



}
