import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the DealdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dealdetails',
  templateUrl: 'dealdetails.html',
})
export class DealdetailsPage {

  public response:any;
 responseData : any;
 public dealdetails:any;
 public id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealdetailsPage');
    this.id = this.navParams.get('id');
    this.details(this.id);
  }

  details(id){
   // alert(id);
    let serval={
      "id":id,
     };
     
    this.authService.postData(serval,'products/details_api').then((result) => {
      this.responseData = result
 
      if( this.responseData.ACK == 1)
      {
       
        this.dealdetails =  this.responseData.Deal_detail; 
       // alert(JSON.stringify(this.dealdetails))
        console.log('ccc',this.dealdetails);
      }
      else
      {
        this.dealdetails = '';
        
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  }

}
