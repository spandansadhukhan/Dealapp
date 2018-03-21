import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CodescannerProvider } from "../../providers/codescanner/codescanner";
import { Storage } from '@ionic/storage';
// import { PayPal } from "@ionic-native/paypal";
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
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
    public alertCtrl: AlertController,
    private payPal: PayPal) {
    //this.startScanner();
  }

  startScanner()
  {
    this.storage.get('uid').then(val => {
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
        var scanData: any = { user_id: val, loyalty_code : barcodeData.text}
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
    })
  }

  paypalPayment(){
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AS5crcxYYgjiPybED_DVEXA1I18IkTpkuU_N_16BaEJyNcHveb7830REmz2fwPeHc9_uZqQwdOeIzTHX'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodescannerPage');
  }

}
