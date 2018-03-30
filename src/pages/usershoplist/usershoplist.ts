import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the UsershoplistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usershoplist',
  templateUrl: 'usershoplist.html',
})
export class UsershoplistPage {

  public response:any;
  responseData : any;
  public usershoplist:any;
  //public delete_shop: any;
  public msg:any;
  public id:any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider,
    private storage: Storage,
    public alertCtrl: AlertController,) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsershoplistPage');
    this.usershops();
  }


  usershops(){
    
    this.storage.get('uid').then(val => {
      
      //console.log(val);
      this.id = val;
     
    let serval={
      "user_id":this.id,
     };
     console.log(serval);
    this.authService.postData(serval,'shops/shop_list_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.usershoplist =  this.responseData.Shop; 
        
        //console.log('ccc',this.userdeallist);
      }
      else
      {
        this.usershoplist = '';
        this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });

  });
  }



  shopdelete(id){
    // alert('ok');
      let serval={
        "id": id,
       };
       //console.log(serval);
      this.authService.postData(serval,'shops/shop_delete_api').then((result) => {
        this.response = result
   // console.log("CHATRESULTTTT",result);
        if( this.response.ACK == 1)
        {
         
          const alert = this.alertCtrl.create({
            title: this.response.msg,
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot('UsershoplistPage');
        }
        else
        {
          const alert = this.alertCtrl.create({
            title: this.response.msg,
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot('UsershoplistPage');
        }
       
      }, (err) => {
        console.log(err);
        // Error log
      });
  
   
    }


    shopedit(id){
    
      this.navCtrl.push('shopeditPage',{'id':id});
  
      }

}
