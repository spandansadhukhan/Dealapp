import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the ForgetpassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpass',
  templateUrl: 'forgetpass.html',
})
export class ForgetpassPage{
  forgetpassForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, private builder: FormBuilder,
    public alertCtrl: AlertController) {
    this.forgetpassForm = builder.group({
      'email': [null, Validators.required],
     
    });
  }

  forgetpassword(formData){
    this.authService.forgetpass(formData).subscribe(res => {
      if (res.ACK == 1) {
        const alert = this.alertCtrl.create({
          title: res.message,
          buttons: ['OK']
        });
        alert.present();
      }
      else {

        const alert = this.alertCtrl.create({
          title: res.message,
          buttons: ['OK']
        });
        alert.present();
      }
    }, err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassPage');
  }

}
