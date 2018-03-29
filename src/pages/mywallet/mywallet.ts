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
    
    console.log(this.rForm.valid);
    if (!this.rForm.valid) {
      const alert = this.alertCtrl.create({
        title: 'Subscription Failed!',
        subTitle: "Please select one package.",
        buttons: ['OK']
      });
      alert.present();
    }else{
      let loading = this.loadingCtrl.create({
        content: 'Loading Please Wait...',
        duration: 3000
      });
      loading.present();
    //  console.log(formData);
    this.storage.get('uid').then(val => {
      formData['user_id']=val;
     this.authService.offlinesubscription(formData).subscribe(res=>{
      
       if(res.ACK==1){
        loading.dismiss();
        //console.log(res);
         const alert = this.alertCtrl.create({
           title: res.msg,
           buttons: ['OK']
         });
       alert.present();

       //this.navCtrl.setRoot('UserdeallistPage');
       }else{
        loading.dismiss();
       // console.log(res);
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








}
