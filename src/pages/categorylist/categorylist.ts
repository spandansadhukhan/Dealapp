import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the CategorylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorylist',
  templateUrl: 'categorylist.html',
})
export class CategorylistPage {

  public response:any;
  public categoryresult:any;
  public storeresult:any;
  public storeres:any;
  public locationres:any;
  public locationresult:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategorylistPage');
    this.categorylist();
    this.storelist();
    this.locationlist();
  }

  locationlist(){
    this.authService.getData('users/location_list_api').then((result) => {
      this.locationres = result
  console.log("RESULTTTTTTTTTTTTTTTTTT",result);
      if(this.locationres.ACK == 1)
      {
        this.locationresult =  this.locationres.Location;
        console.log('Location',this.locationresult);
      }
      else
      {
        this.locationresult = '';
      }
      
    }, (err) => {
      console.log(err);
      // Error log
    });
  }

  
  categorylist(){
    this.authService.getData('users/category_list_api').then((result) => {
      this.response = result
  console.log("RESULTTTTTTTTTTTTTTTTTT",result);
      if( this.response.ACK == 1)
      {
        this.categoryresult =  this.response.Category;
        console.log('PPPPPPP',this.categoryresult);
      }
      else
      {
        this.categoryresult = '';
      }
      
    }, (err) => {
      console.log(err);
      // Error log
    });
  }



  storelist(){
    this.authService.getData('users/shop_list_api').then((result) => {
      this.storeres = result
  console.log("RESULTTTTTTTTTTTTTTTTTT",result);
      if(this.storeres.ACK == 1)
      {
        this.storeresult =  this.storeres.Shop;
        console.log('STOREE',this.storeresult);
      }
      else
      {
        this.storeresult = '';
      }
      
    }, (err) => {
      console.log(err);
      // Error log
    });
  }

  golocation(type,id){
    this.navCtrl.push('CouponlistPage',{'type':type,'id':id});
  }

  couponlist(type,id){
    //alert(type);
    this.navCtrl.push('CouponlistPage',{'type':type,'id':id});
    //localStorage.setItem('modeldata', JSON.stringify(name));
  }

  shoplist(type,id){
    this.navCtrl.push('CouponlistPage',{'type':type,'id':id});

  }


}
