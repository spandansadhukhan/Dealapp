import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the DealaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dealadd',
  templateUrl: 'dealadd.html',
})
export class DealaddPage {

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
        'price_lot': [null, Validators.required],
        'discount': [null, Validators.required],
        'description': [null, Validators.required],
        'start_date': [null, Validators.required],
        'start_time': [null, Validators.required],
        'end_date': [null, Validators.required],
        'end_time': [null, Validators.required],
        'status': [null, Validators.required],
        
      });
      //this.rForm.controls['status'].setValue('A');
  
    }


    onSubmit(formData) {
      console.log(this.rForm.valid);
      if (!this.rForm.valid) {
        const alert = this.alertCtrl.create({
          title: 'Deal Add Failed!',
          subTitle: "Please fill all the details.",
          buttons: ['OK']
        });
        alert.present();
      }else{
      //  console.log(formData);
      this.storage.get('uid').then(val => {
        formData['user_id']=val;
       this.authService.dealadd(formData).subscribe(res=>{
         if(res.ACK==1){
          console.log(res);
           const alert = this.alertCtrl.create({
             title: res.msg,
             buttons: ['OK']
           });
         alert.present();
         this.navCtrl.setRoot('UserdeallistPage');
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



  ionViewDidLoad() {
    console.log('ionViewDidLoad DealaddPage');
    //this.id = this.storage.set('userId', this.userId);
   //alert(this.id);
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

  /*save_deal(data) {

    console.log(data);
    
    this.authService.postData(data,'users/productinsert.json').then((result) => {
      console.log("7777777777",result);
      this.response=result;
      this.saveresult= this.response.details;
     this.uploadImage(this.saveresult.id);
      this.form.reset();
      if(this.response.details.ack ==1)
      {
      //  this.navCtrl.push(ProfessionalChemicalPage);
       
        this.tost_message('Product Added Successfully');
      }
      else{
        this.tost_message('Product Not Added ');
      }
    }, (err) => {
      console.log(err);
      // Error log
    });
        
        
       // this.navCtrl.setRoot(LoginPage);
  }*/
  










}


