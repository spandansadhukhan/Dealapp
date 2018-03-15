import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
 public shoplist:any;
 public id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
    public authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealaddPage');
    //this.id = this.storage.get('uid');
   //alert(this.id);
    //this.usershop(this.id);
  }


  usershop(id){
    this.storage.get('uid').then(val => {
    console.log(val);
    });
    //alert(type);
    let serval={
      "id": id
     };
     
    this.authService.postData(serval,'products/usershop_list_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.shoplist =  this.responseData.Shop; 
        
        console.log('ccc',this.shoplist);
      }
      else
      {
        this.shoplist = '';
        
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  }


}
