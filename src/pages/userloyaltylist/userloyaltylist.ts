import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the UserloyaltylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userloyaltylist',
  templateUrl: 'userloyaltylist.html',
})
export class UserloyaltylistPage {
  public response:any;
  responseData : any;
  public userloyaltylist:any;
  public msg:any;
  public id:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    private storage: Storage,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserloyaltylistPage');
    this.userloyalties();
  }


  userloyalties(){
    
    this.storage.get('uid').then(val => {
      
      //console.log(val);
      this.id = val;
     
    let serval={
      "user_id":this.id,
     };
     console.log(serval);
    this.authService.postData(serval,'loyalties/userwise_loyalty_list_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.userloyaltylist =  this.responseData.Loyalty; 
        
        //console.log('ccc',this.userdeallist);
      }
      else
      {
        this.userloyaltylist = '';
        this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });

  });
  }



  loyaltydelete(id){
    // alert('ok');
      let serval={
        "id": id,
       };
       //console.log(serval);
      this.authService.postData(serval,'loyalties/loyalty_delete_api').then((result) => {
        this.response = result
   // console.log("CHATRESULTTTT",result);
        if( this.response.ACK == 1)
        {
         
          const alert = this.alertCtrl.create({
            title: this.response.msg,
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot('UserloyaltylistPage');
        }
        else
        {
          const alert = this.alertCtrl.create({
            title: this.response.msg,
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot('UserloyaltylistPage');
        }
       
      }, (err) => {
        console.log(err);
        // Error log
      });
  
   
    }
  
  
    loyaltyedit(id){
      
      this.navCtrl.push('LoyaltyeditPage',{'id':id});
  
      }



}
