import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CodescannerProvider } from "../../providers/codescanner/codescanner";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CodescannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-codescanner',
  templateUrl: 'codescanner.html',
})
export class CodescannerPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private barcodeScanner: BarcodeScanner,
    public codeService: CodescannerProvider,
    public storage: Storage,
    public alertCtrl: AlertController) {
    this.startScanner();
  }

  startScanner()
  {
    this.storage.get('uid').then(val => {
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
        var scanData: any = { user_id: val, loyalty_code : barcodeData.text}
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
          this.startScanner();
          })
        //alert(barcodeData.text)
      }).catch(err => {
        console.log('Error', err);
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodescannerPage');
  }

}
