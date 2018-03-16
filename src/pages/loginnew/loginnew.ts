import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-loginnew',
  templateUrl: 'loginnew.html',
})
export class LoginnewPage {


  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public device_type: AbstractControl;
  public device_token_id: AbstractControl;


  myform: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;
  isChecked: boolean;
  disabled: any;
  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController) {


    this.form = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginnewPage');
  }



  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'show',
      content: 'Loading Please Wait...',
      duration: 1000
    });

    loading.present();
  }


  loginNow(formData) { 
    formData['device_token_id'] ='asdfa45645645646knllkjlkj4356546456';
    formData['device_type']='android';
    console.log(formData);

    this.authService.login(formData).subscribe(res => {
      console.log(res);
      if(res.ack==1){
      const alert = this.alertCtrl.create({
        title: res.msg,
        buttons: ['OK']
      });
      alert.present();
        this.storage.ready().then(() => {
          this.storage.set('userType', res['type']).then(() => {
            this.storage.set('fullName', res.userdetail.User['first_name']).then(() => {
              this.storage.set('fullName', res.userdetail.User['last_name']).then(() => {
                this.storage.set('uid', res.userdetail.User['id']).then(() => {
                this.navCtrl.setRoot('HomePage');
                this.storage.get('uid').then(res=>{
                  console.log(res);
                }).catch();
              });
            });
            });
          });
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

}
