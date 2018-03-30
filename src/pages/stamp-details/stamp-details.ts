import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CodescannerProvider } from "../../providers/codescanner/codescanner";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the StampDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stamp-details',
  templateUrl: 'stamp-details.html',
})
export class StampDetailsPage {
  public userid:any;
public loguser:any;
  public lid:any;
  public responsedata:any;
  public stampresult:any;
  public msg:any;
  public desc:any;
  public loyname:any;
  public st_date:any;
  public end_date:any;
  public loy_image:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider, private barcodeScanner: BarcodeScanner,
    public codeService: CodescannerProvider,public alertCtrl: AlertController,public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StampDetailsPage');
    this.lid = this.navParams.get('id');
    this.stamp(this.lid);
  }

  stamp(id){
    //alert(type);
    let serval={
      "loyalty_id":id,
     };
     
    this.authService.postData(serval,'loyalties/getloyaltydetails_api').then((result) => {
      this.responsedata = result
 // console.log("CHATRESULTTTT",result);
      if(this.responsedata.ACK == 1)
      {
       
        this.stampresult =  this.responsedata.loyaltyInfo.Loyalty;
        this.loyname=this.stampresult.name;
        this.st_date=this.stampresult.start_date;
        this.end_date=this.stampresult.end_date;
        this.desc=this.stampresult.description; 
        this.loy_image=this.responsedata.image;
        console.log('ccc',this.stampresult);
      }
      else
      {
        this.stampresult = '';
        this.msg =this.responsedata.msg; 
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  }

  startScanner()
  {
    
   // this.storage.get('uid').then(val => {
      this.barcodeScanner.scan().then(barcodeData => {
        this.loguser =  JSON.parse(localStorage.getItem('userData')); 
        this.userid=this.loguser.id;
        console.log('Barcode data', barcodeData);
        var scanData: any = { user_id:this.userid, loyalty_code : barcodeData.text}
        if (barcodeData.text)
        {
        this.codeService.findCode(scanData).subscribe(resData => 
          {
          if (resData.ACK == 1) {
            const alert = this.alertCtrl.create({
              title: resData.msg,
              buttons: ['OK']
            });
            alert.present();
          }
          else {

            const alert = this.alertCtrl.create({
              title: resData.msg,
              buttons: ['OK']
            });
            alert.present();
            
          }
          //this.startScanner();
          })
        }
        //alert(barcodeData.text)
      }).catch(err => {
        console.log('Error', err);
      });
    //})
  }

  scanner(){
    this.navCtrl.push('CodescannerPage');
  }

}
