import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the UserdeallistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdeallist',
  templateUrl: 'userdeallist.html',
})
export class UserdeallistPage {

  public response:any;
  responseData : any;
  public userdeallist:any;
  public delete_deal: any;
  public msg:any;
  public id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService:AuthServiceProvider,private storage: Storage,public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdeallistPage');
    this.userdeals();
    //this.id = this.navParams.get('id');
    //this.dealdelete(this.id);
  }


  userdeals(){
    
    this.storage.get('uid').then(val => {
      
      //console.log(val);
      this.id = val;
     
    let serval={
      "user_id":this.id,
     };
     console.log(serval);
    this.authService.postData(serval,'products/userwise_deal_list_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.userdeallist =  this.responseData.Deal; 
        
        //console.log('ccc',this.userdeallist);
      }
      else
      {
        this.userdeallist = '';
        this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });

  });
  }


  dealdelete(id){
  // alert('ok');
    let serval={
      "id": id,
     };
     //console.log(serval);
    this.authService.postData(serval,'products/deal_delete_api').then((result) => {
      this.response = result
 // console.log("CHATRESULTTTT",result);
      if( this.response.ACK == 1)
      {
       
        const alert = this.alertCtrl.create({
          title: this.response.msg,
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot('UserdeallistPage');
      }
      else
      {
        const alert = this.alertCtrl.create({
          title: this.response.msg,
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot('UserdeallistPage');
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });

 
  }


}
