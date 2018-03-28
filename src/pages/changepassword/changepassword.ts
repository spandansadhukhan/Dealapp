
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  changeForm: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private builder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.changeForm = builder.group({
      'current_password': [null, Validators.required],
      'new_password': [null, Validators.required],
      'con_password': [null, Validators.required]
    });
  }


  changepass(formData) {
    this.storage.get('uid').then(val => {
      console.log(val);
      formData['user_id'] = val;
    });
    console.log(formData);
    // return;
    this.authService.changepass(formData).subscribe(res => {
     if (res.ACK == 1) {
        const alert = this.alertCtrl.create({
          title: res.msg,
          buttons: ['OK']
        });
        alert.present();
      } 
      else {

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

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

}
