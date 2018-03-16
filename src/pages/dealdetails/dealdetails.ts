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
 public dealname:any;
 public dealdescription:any;
 public deallocation:any;
 public deallat:any;
 public deallong:any;
 public dealprice:any;
 public dealdiscountprice:any;
 public dealperiod:any;
 public dealimage:any;
 public dealcatname:any;
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
        this.dealname=this.responseData.Deal_detail.deal_name;
        this.dealdescription=this.responseData.Deal_detail.deal_description;
        this.deallocation=this.responseData.Deal_detail.deal_location;
        this.deallat=this.responseData.Deal_detail.deal_lat;
        this.deallong=this.responseData.Deal_detail.deal_long;
        this.dealprice=this.responseData.Deal_detail.deal_price; 
        this.dealdiscountprice=this.responseData.Deal_detail.deal_discount_price;
        this.dealperiod=this.responseData.Deal_detail.deal_period;
        this.dealimage=this.responseData.Deal_detail.deal_image;
        this.dealcatname=this.responseData.Deal_detail.deal_category_nmae;
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
