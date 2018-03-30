import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
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

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public authService:AuthServiceProvider,
     public loadingCtrl: LoadingController,
     private storage: Storage,
     public alertCtrl: AlertController,
     private builder: FormBuilder,
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
    //console.log(this.rForm.valid);
    if (!this.package_id) {
      const alert = this.alertCtrl.create({
        title: 'Subscription Failed!',
        subTitle: "Please select one package.",
        buttons: ['OK']
      });
      alert.present();
    }else{
      formData.package_id = this.package_id;
    //  console.log(formData);
    this.storage.get('uid').then(val => {
      formData['user_id']=val;
     this.authService.offlinesubscription(formData).subscribe(res=>{
      
       if(res.ACK==1){
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


  mcqAnswer(id)
  {
    this.package_id = id;
  }





}
