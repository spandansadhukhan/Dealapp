import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PackagesubscribedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-packagesubscribed',
  templateUrl: 'packagesubscribed.html',
})
export class PackagesubscribedPage {

  responseData : any;
  public subscribelist:any;
  public msg:any;
  public id:any;
  public pid:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public authService:AuthServiceProvider,
     private storage: Storage, 
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackagesubscribedPage');
    this.sbscriptions();
  }


  sbscriptions(){
    
    this.storage.get('uid').then(val => {
      
      //console.log(val);
      this.id = val;
     
    let serval={
      "user_id":this.id,
     };
     console.log(serval);
    this.authService.postData(serval,'packages/package_subcribed_list_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.subscribelist =  this.responseData.sbscriptionlist; 
        
        //console.log('ccc',this.userdeallist);
      }
      else
      {
        this.subscribelist = '';
        this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });

  });
  }

  renew(pid){
    
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...',
      duration: 3000
    });
    loading.present();
    this.storage.get('uid').then(val => {
      
      //console.log(val);
      this.id = val;
      this.pid= pid;
    let serval={
      "package_id" :this.pid,
      "user_id":this.id,
     };
     console.log(serval);
    this.authService.postData(serval,'packages/package_request_api').then((result) => {
      this.responseData = result
 
      if( this.responseData.ACK == 1)
      {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: this.responseData.msg,
          buttons: ['OK']
        });
      alert.present();
      this.navCtrl.setRoot('HomePage');
      }
      else
      {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: this.responseData.msg,
          buttons: ['OK']
        });
      alert.present();
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });

  });
  }
  







}
