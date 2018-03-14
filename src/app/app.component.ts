import { Component ,ViewChild} from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'LoginnewPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  
  
  public myaccount(){
    //alert('ok');
    //console.log(location);
    //if(location==0){
      this.nav.setRoot('MyaccountPage');
      
   // }
    
      }

      public changepassword(){
        
          this.nav.setRoot('ChangepasswordPage');
         
          }
  
}

