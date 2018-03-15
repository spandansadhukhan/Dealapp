import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the DeallistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deallist',
  templateUrl: 'deallist.html',
})
export class DeallistPage {

  public response:any;
  //public brandresult:any;
 responseData : any;
 public deallist:any;
 public msg:any;
 public type:any;
 public id:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public authService:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad DeallistPage');
    this.type = this.navParams.get('type');
    this.id = this.navParams.get('id');
    //alert(this.id);
    this.deals(this.type,this.id);
  }


  deals(type,id){
    //alert(type);
    let serval={
      "type":type,
      "id":id,
     };
     
    this.authService.postData(serval,'products/deal_list_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.deallist =  this.responseData.Deal; 
        
        console.log('ccc',this.deallist);
      }
      else
      {
        this.deallist = '';
        this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  }

 


}
