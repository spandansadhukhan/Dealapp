import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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
    }, err => {
      console.log(err);
    });
  }

  onSignup() {
    this.navCtrl.push('SignupPage');
  }

}
