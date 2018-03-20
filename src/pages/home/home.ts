import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public response:any;
  //public brandresult:any;
 responseData : any;
 public popularcategorylist:any;
 public categorylist:any;



  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.popularcategory();
    this.category();
  }


  popularcategory(){
   
     
    this.authService.getData('users/popular_category_list_api').then((result) => {
      this.responseData = result
  console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.popularcategorylist =  this.responseData.Category;
        //this.popularcategoryname=this.responseData.model.name;
        //this.popularcategoryimage=this.responseData.model.image;
        
        //console.log('rrrrrrrrrrrrrrrrrrrrrreview',this.popularcategorylist);
      }
      else
      {
        this.popularcategorylist = '';
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  }


  category(){
   
     
    this.authService.getData('users/category_list_api').then((result) => {
      this.responseData = result
  console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.categorylist =  this.responseData.Category;
        
        
        console.log('rrrrrrrrrrrrrrrrrrrrrreview',this.categorylist);
      }
      else
      {
        this.categorylist = '';
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  }

  deallist(type,id){
    //alert(type);
    this.navCtrl.push('DeallistPage',{'type':type,'id':id});
    //localStorage.setItem('modeldata', JSON.stringify(name));
  }

  couponlist(type,id){
    //alert(type);
    this.navCtrl.push('CouponlistPage',{'type':type,'id':id});
    //localStorage.setItem('modeldata', JSON.stringify(name));
  }


}
