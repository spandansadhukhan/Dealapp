import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { MenuController } from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import { Storage } from '@ionic/storage';
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
public loguser:any;
public type:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,
    public loadingCtrl: LoadingController,  public menu: MenuController, public myApp:MyApp,private storage: Storage) {
  }

  ionViewDidLoad() {
  
     this.loguser = JSON.parse(localStorage.getItem('userData'));
     this.myApp.abc();
  //   if(this.loguser){
  //   console.log("USERINFOOOOOO22222",this.loguser.type);
  //  this.myApp.loguser.type=this.loguser.type;
  //  console.log("APPPPCOMPNNTTYPE",this.myApp.loguser.type);
  //   console.log("USERDATATATATATTATATTATA",this.loguser);
  //   }
    this.menu.enable(true, 'loggedOutMenu');
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
