import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { MenuController } from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import { GooglePlus } from '@ionic-native/google-plus';
import { Events } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-loginnew',
  templateUrl: 'loginnew.html',
})
export class LoginnewPage {

public loguser:any;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public device_type: AbstractControl;
  public device_token_id: AbstractControl;

  public getresult:any;
  myform: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;
  isChecked: boolean;
  disabled: any;
  isLoggedIn: boolean = false;
  users: any;
  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private fb: Facebook,
    public loadingCtrl: LoadingController,
    public toastCtrl:ToastController,
    private myApp:MyApp,
    private googlePlus: GooglePlus,
    public events: Events) {

      events.publish('hideFooter', { isHidden: true});


    this.form = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));


  }


  ionViewDidLoad() {
    
    this.menu.enable(false, 'loggedOutMenu');
    console.log('ionViewDidLoad LoginnewPage');

  //  console.log("ABCDEFGHIJ", localStorage.getItem('userData'));
  }

//   ionViewWillLeave() {
//     this.events.publish('hideFooter', { isHidden: false});
// }



  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'show',
      content: 'Loading Please Wait...',
      duration: 1000
    });

    loading.present();
  }
  forgetpass(){
   
    this.navCtrl.push("ForgetpassPage");
  }

  
  facebookSignIn() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log("FBDATA",res);
        this.users = res;
        let stringToSplit = this.users.name;
         let x = stringToSplit.split(" ");
console.log(x[0]);
       
     let param={
      "facebook_id": this.users.id,
      "email":this.users.email,
      //"gender": this.users.gender,
      "first_name":x[0],
       "last_name":x[1]
     };
     console.log("DATATATTATATAT",param);
       
        this.authService.facebookadd(param).subscribe((res) => { //console.log(result);
         this.getresult = res;
         console.log("FBRESULT",res);
         if(res.ACK== 1)
         {
       
         // this.events.publish('hideFooter', {isHidden: false});
          localStorage.setItem('userData',JSON.stringify(res.userdetail.User));
          this.storage.set('uid', res.userdetail.User['id']).then(() => {
                 
            this.navCtrl.setRoot('HomePage');  
        });
        
   
         }
         else{
          
           this.tost_message('No Profile Found')
         }
          
       })

      })
      .catch(e => {
        this.tost_message('No Profile Found')
        console.log(e);
      });
  }

  googleplus() {
    this.googlePlus.login({

    })
      .then(res => {
        console.log("GOOGLEPLUSDATA",res);
        this.email = res.email;
        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }


  loginNow(formData) { 
    formData['device_token_id'] ='asdfa45645645646knllkjlkj4356546456';
    formData['device_type']='android';
    console.log(formData);

    this.authService.login(formData).subscribe(res => {
      console.log(res);
      if(res.ack==1){
      /*const alert = this.alertCtrl.create({
        title: res.msg,
        buttons: ['OK']
      });
      alert.present();*/
        this.storage.ready().then(() => {
          localStorage.setItem('userData', JSON.stringify(res.userdetail.User));
           console.log("USERDATATATATATTATATTATA", JSON.stringify(res.userdetail.User));
      //  this.storage.set('userType', res.userdetail.User['type']).then(() => {
            this.storage.set('first_Name', res.userdetail.User['first_name']).then(() => {
              this.storage.set('last_Name', res.userdetail.User['last_name']).then(() => {
                this.storage.set('uid', res.userdetail.User['id']).then(() => {
                 
                  this.navCtrl.setRoot('HomePage');
                 

                 
                // this.storage.get('uid').then((res)=>{
                  
                //   console.log(res);
                // }).catch();
                
              });
            });
            });
        // });
        });
      
    }else{

      const alert = this.alertCtrl.create({
        title: res.msg,
        buttons: ['OK']
      });
      alert.present(); 
    }
    }, err => {
      console.log(err);
    });
  }

  onSignup() {
   
    this.navCtrl.push('SignupPage');
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present(); 
    }

}
