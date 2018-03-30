import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the LoyalitylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loyalitylist',
  templateUrl: 'loyalitylist.html',
})
export class LoyalitylistPage {
  public response:any;
  public loyalityresult:any;
public msg:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoyalitylistPage');
    this.loyalitylist();
  }



  loyalitylist(){
    this.authService.getData('loyalties/loyalty_list_api').then((result) => {
      this.response = result
 // console.log("CHATRESULTTTT",result);
      if(this.response.ACK == 1)
      {
       
        this.loyalityresult =  this.response.Loyalty; 
        
        //console.log('ccc',this.userdeallist);
      }
      else
      {
        this.loyalityresult = '';
        this.msg =this.response.msg; 
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  }

  loyalitydetails(id){
  this.navCtrl.push('StampDetailsPage',{'id':id});
//this.navCtrl.push('StampDetailsPage');

  }



}
