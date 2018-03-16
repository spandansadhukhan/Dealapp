import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  aForm : FormGroup;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private builder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.aForm = builder.group({
      'first_name': [null, Validators.required],
      'last_name': [null, Validators.required],
      'address': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
      'con_password': [null, Validators.required],
      'city': [null, Validators.required],
      'state': [null, Validators.required],
      'country': [null, Validators.required],
      'type': [null, Validators.required]
    });

    this.storage.ready().then(()=>{
      this.storage.get('uid').then(val => {
        console.log(val);
        if(val){
          this.authService.getdetails({ user_id: val }).subscribe(res => {
            console.log(res.userInfo.User.first_name);
            this.aForm.controls['first_name'].setValue(res.userInfo.User.first_name);
            this.aForm.controls['last_name'].setValue(res.userInfo.User.last_name);
            this.aForm.controls['email'].setValue(res.userInfo.User.email);
            this.aForm.controls['address'].setValue(res.userInfo.User.address);
            this.aForm.controls['city'].setValue(res.userInfo.User.city);
            this.aForm.controls['address'].setValue(res.userInfo.User.address);
            this.aForm.controls['country'].setValue(res.userInfo.User.country);
          });
        }
        
      });
    }).catch();
}

  onSubmit(formData) {
    console.log(this.aForm.valid);
     this.storage.get('uid').then(val => {
        formData['id'] = val;
      });
      this.authService.updateprofile(formData).subscribe(res => {
        console.log(formData);
        if (res) {
          console.log(res);
          const alert = this.alertCtrl.create({
            title: 'Profile Updated Successfully',
            buttons: ['OK']
          });
          alert.present();
        }
      }, err => {
        console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Auth Failed!',
          buttons: ['OK']
        });
        alert.present();
      });

   
  }



  ionViewDidLoad() {
       
  }

}
