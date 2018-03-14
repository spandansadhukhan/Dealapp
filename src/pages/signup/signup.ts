import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  rForm: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;

  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    private fb: FormBuilder
  ) {
    this.rForm = fb.group({
      'first_name': [null, Validators.required],
      'last_name': [null, Validators.required],
      'address': [null, Validators.required],
      'email':[null, Validators.required],
      'password': [null, Validators.required],
      'con_password': [null, Validators.required],
      'city': [null, Validators.required],
      'state': [null, Validators.required],
      'country': [null, Validators.required],
      'type': [null, Validators.required]
    });
    this.rForm.controls['type'].setValue('V');

  }

  onSubmit(formData) {
    console.log(this.rForm.valid);
    if (!this.rForm.valid) {
      const alert = this.alertCtrl.create({
        title: 'Signup Failed!',
        subTitle: "Please fill all the details.",
        buttons: ['OK']
      });
      alert.present();
    }else{
    //  console.log(formData);
     this.authService.signup(formData).subscribe(res=>{
       if(res){
        console.log(res);
         const alert = this.alertCtrl.create({
           title: 'Registration Successfully Done',
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
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onLogin(data: object) {
    console.log(data);
  }

}
