import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the CouponeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-couponedit',
  templateUrl: 'couponedit.html',
})
export class CouponeditPage {

  eForm : FormGroup;
  public response:any;
   responseData : any;
   public val:any;
 public shoplist:any;
 public categorylist: any;
 public citylist: any;
 public id:any;
 public coupon_id:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public authService:AuthServiceProvider,
    private builder: FormBuilder,
   public alertCtrl: AlertController) {


    this.eForm = builder.group({
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

    this.id = this.navParams.get('id');
    //val = this.id;
    this.authService.getcoupondetails({ coupon_id: this.id }).subscribe(res => {
      //console.log(deal_id);
      //console.log(res.userInfo.User.first_name);
      
      //this.eForm.controls['id'].setValue(res.dealInfo.Product.id);
      this.eForm.controls['name'].setValue(res.couponInfo.Coupon.name);
      this.eForm.controls['shop_id'].setValue(res.couponInfo.Coupon.shop_id);
      this.eForm.controls['category_id'].setValue(res.couponInfo.Coupon.category_id);
      this.eForm.controls['city_id'].setValue(res.couponInfo.Coupon.city_id);
      this.eForm.controls['amount'].setValue(res.couponInfo.Coupon.amount);
      this.eForm.controls['offer'].setValue(res.couponInfo.Coupon.offer);
      this.eForm.controls['description'].setValue(res.couponInfo.Coupon.description);
      this.eForm.controls['from_date'].setValue(res.couponInfo.Coupon.from_date);
      this.eForm.controls['to_date'].setValue(res.couponInfo.Coupon.to_date);
      this.eForm.controls['coupon_no'].setValue(res.couponInfo.Coupon.coupon_no);
      this.eForm.controls['type'].setValue(res.couponInfo.Coupon.type);
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponeditPage');
    this.coupon_id = this.navParams.get('id');
    this.usershop();
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


  onSubmit(formData) {
    console.log(this.eForm.valid);
     //alert(this.deal_id);
        formData['coupon_id'] = this.coupon_id;
       // console.log(formData);
      this.authService.updatecoupon(formData).subscribe(res => {
        console.log(formData);
        if (res.ACK==1) {
          console.log(res);
          const alert = this.alertCtrl.create({
            title: res.msg,
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot('UsercouponlistPage');
        }else{
          const alert = this.alertCtrl.create({
            title: res.msg,
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






}
