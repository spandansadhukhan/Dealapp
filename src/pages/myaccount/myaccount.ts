import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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
    private builder: FormBuilder
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
        this.authService.getdetails({ user_id: val }).subscribe(res => {
          console.log(res.userInfo.Users.first_name);
          this.aForm.controls['first_name'].setValue(res.userInfo.Users.first_name);
          this.aForm.controls['last_name'].setValue(res.userInfo.Users.last_name);
          this.aForm.controls['email'].setValue(res.userInfo.Users.email);
          this.aForm.controls['address'].setValue(res.userInfo.Users.address);  
          this.aForm.controls['city'].setValue(res.userInfo.Users.city); 
         this.aForm.controls['address'].setValue(res.userInfo.Users.address); 
          this.aForm.controls['country'].setValue(res.userInfo.Users.country);    
        });
      });
    }).catch();
    
  }

  ionViewDidLoad() {
       
  }

}
