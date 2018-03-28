import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the CouponaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-couponadd',
  templateUrl: 'couponadd.html',
})
export class CouponaddPage {
  public response:any;
  responseData : any;
  rForm: FormGroup;
public shoplist:any;
public categorylist: any;
public citylist: any;
public id:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public authService:AuthServiceProvider,
    public alertCtrl: AlertController,
    private builder: FormBuilder,
    private fb: FormBuilder) {

      this.rForm = fb.group({
        'name': [null, Validators.required],
        'shop_id': [null, Validators.required],
        'category_id': [null, Validators.required],
        'city_id':[null, Validators.required],
        'amount': [null, Validators.required],
        'offer': [null, Validators.required],
        'description': [null, Validators.required],
        'from_date': [null, Validators.required],
        'to_date': [null, Validators.required],
        'coupon_no': [null, Validators.required],
        'type': [null, Validators.required],
        
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponaddPage');
    this.usershop();
  }


  onSubmit(formData) {
    console.log(this.rForm.valid);
    if (!this.rForm.valid) {
      const alert = this.alertCtrl.create({
        title: 'Coupon Add Failed!',
        subTitle: "Please fill all the details.",
        buttons: ['OK']
      });
      alert.present();
    }else{
    //  console.log(formData);
    this.storage.get('uid').then(val => {
      formData['user_id']=val;
     this.authService.couponadd(formData).subscribe(res=>{
       if(res.ACK==1){
        console.log(res);
         const alert = this.alertCtrl.create({
           title: res.msg,
           buttons: ['OK']
         });
       alert.present();
       this.navCtrl.push('UsercouponlistPage');
       }else{
        console.log(res);
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



  usershop(){
    this.storage.get('uid').then(val => {
      
      //console.log(val);
      this.id = val;
    let serval={
      "id": this.id
     };
     
    this.authService.postData(serval,'products/add_deal_list_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.shoplist =  this.responseData.Shop; 
        this.categorylist =  this.responseData.Category;
        this.citylist =  this.responseData.City;  
        
        console.log('ccc',this.shoplist);
      }
      else
      {
        this.shoplist = '';
        this.categorylist = '';
        this.citylist = '';
        
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  });
  }

}
