import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
/**
 * Generated class for the MywalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mywallet',
  templateUrl: 'mywallet.html',
})
export class MywalletPage {

  
 responseData : any;
 public packagelist:any;
 public id:any;
 public deal_no:any;
 public coupon_no:any;
 public walletdetail:any;
 public package_id:any;
 rForm: FormGroup;
 public loguser:any;
 public userid:any;
 public package_price:any;
 public msg:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public authService:AuthServiceProvider,
     public loadingCtrl: LoadingController,
     private storage: Storage,
     public alertCtrl: AlertController,
     private builder: FormBuilder,
     private payPal: PayPal,
     private fb: FormBuilder) {

      this.rForm = fb.group({
        'package_id':[null, Validators.required],

      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MywalletPage');
    this.packages();
    this.wallets();

  }


  wallets(){
    
    this.storage.get('uid').then(val => {
      
      //console.log(val);
      this.id = val;
     
    let serval={
      "user_id":this.id,
     };
     console.log(serval);
    this.authService.postData(serval,'packages/wallet_details_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.walletdetail=this.responseData.wallet;
        this.deal_no =  this.responseData.wallet.User.total_deal; 
        this.coupon_no =  this.responseData.wallet.User.total_coupon; 
        //console.log('ccc',this.userdeallist);
      }
      else
      {
        this.walletdetail = '';
        //this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });

  });
  }





  packages(){
   
     
    this.authService.getData('packages/package_list_api').then((result) => {
      this.responseData = result
  console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.packagelist =  this.responseData.Package;
        
      }
      else
      {
        this.packagelist = '';
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  }


  oncash(formData) {

    let loading = this.loadingCtrl.create({
      spinner: 'show',
      content: 'Please Wait...'
    });
    loading.present();
    //console.log(this.rForm.valid);
    if (!this.package_id) {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Subscription Failed!',
        subTitle: "Please select one package.",
        buttons: ['OK']
      });
      alert.present();
    }else{
      formData.package_id = this.package_id;
    console.log("7547547",formData);
    this.storage.get('uid').then(val => {
      formData['user_id']=val;
     this.authService.offlinesubscription(formData).subscribe(res=>{
      
       if(res.ACK==1){
        loading.dismiss();
        console.log(res);
         const alert = this.alertCtrl.create({
           title: res.msg,
           buttons: ['OK']
         });
       alert.present();

       //this.navCtrl.setRoot('UserdeallistPage');
       }else{
        console.log(res);
        const alert = this.alertCtrl.create({
          title: res.msg,
          buttons: ['OK']
        });
      alert.present();
       }
      },err=>{
       console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Auth Failed!',
          buttons: ['OK']
        });
        alert.present();
     });
    }); 
  }
  }

  paypalPayment(formData){
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AS5crcxYYgjiPybED_DVEXA1I18IkTpkuU_N_16BaEJyNcHveb7830REmz2fwPeHc9_uZqQwdOeIzTHX'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        formData.package_id = this.package_id;
       formData.package_price=this.package_price;
       console.log("PACKAGGEIIDDDD",formData);
        console.log("priceeee",formData.package_price);
        let payment = new PayPalPayment(formData.package_price, 'USD', 'Description', 'package');
        console.log("PAYMENTTTTTTTTTTTTTTTT",payment);
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          console.log("IDDDDD",res.response.id);

          this.loguser =  JSON.parse(localStorage.getItem('userData')); 
          this.userid=this.loguser.id;
      
            //alert(type);
            let serval={
              "package_id":formData.package_id,
              "user_id":this.userid,
              "tx_id":res.response.id
             };
             console.log("servalservalservalserval",serval);
            this.authService.postData(serval,'packages/purchase_payment_api').then((result) => {
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


  mcqAnswer(id,price)
  {
   
    this.package_id = id;
    this.package_price=price;

  }





}
