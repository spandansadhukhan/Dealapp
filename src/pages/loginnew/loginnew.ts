import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-loginnew',
  templateUrl: 'loginnew.html',
})
export class LoginnewPage {

  
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;


  myform: FormGroup;
  responseData : any;
  error: string;
  busy: boolean;
  isChecked:boolean;
  disabled:any;
   constructor(    
    private builder:FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController) {


 this.form = builder.group({
  'email': ['', Validators.compose([Validators.required, Validators.email])],
  'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    this.isChecked=false;

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginnewPage');
  }


 

  /*loginNow(values:Object){ 
    this.presentLoadingCustom();
    if (this.form.valid) {
      let loginJsonData={
        "email": this.email.value.toString(),
        "password": this.password.value.toString(),
       };
  console.log(loginJsonData);
 
  //alert('avik');
    this.authService.postData(loginJsonData,'users/login_api').then((result) => { 
      
    console.log(result);
     
      this.responseData = result;
console.log('aaaaaaaa',this.responseData);
    ///  alert(this.responseData.Ack);
      if(this.responseData.Ack == 1)
      {
        localStorage.setItem('logindata', JSON.stringify(loginJsonData));
     // this.responseData = result;

   //  if(this.responseData.UserDetails.user_type=='1'){
     localStorage.setItem('userData', JSON.stringify(this.responseData.userdetail.User));
    console.log("USERDATATATATATTATATTATA",JSON.stringify(this.responseData.userdetail.User));
         //this.navCtrl.push(InvitedJobPage);
        // this.navCtrl.push('ProfilePage');
        //this.navCtrl.setRoot('NotificationSettingsPage');
    // }
    //  else{

    //     let alert = this.alertCtrl.create({
    //       title: 'Error2',
    //       subTitle: 'Invalid Credentials. Try again.' ,
    //       buttons: ['Ok']
    //     });
    //     alert.present();

    //  }

      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Invalid Credentials. Try again.' ,
          buttons: ['Ok']
        });
        alert.present();
      }
    }, (err) => {
      console.log(err);
      // Error log
    });
  }
    
  }*/
presentLoadingCustom() {
  let loading = this.loadingCtrl.create({
    spinner: 'show',
    content: 'Loading Please Wait...',
    duration: 1000
  });

  // loading.onDidDismiss(() => {
  //   console.log('Dismissed loading');
  // });

  loading.present();
}


loginNow() {
  this.navCtrl.push('HomePage');
}

  onSignup() {
    this.navCtrl.push('SignupPage');
  }

}
