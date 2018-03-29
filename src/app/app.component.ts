import { Component ,ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  public id:any;
 public loguser:any;
 //public type:any;
  public istype:any;

  public path:any;
  constructor(platform: Platform,
    private storage: Storage, statusBar: StatusBar, 
    splashScreen: SplashScreen) {

      platform.ready().then(()=>{
       
       

    //platform.ready().then(() => {
      //location.reload();
      //this.path= window.location.href;
      //alert(this.path);
      
      this.storage.get('uid').then(val => {
        this.id =val;
    //alert(val);
   // this.loguser=localStorage.getItem("userData");
   //  console.log("USERINFOOOOOO22222",this.loguser.type);
    // this.storage.get('userType').then(res => {
    //  this.type =res;
    //  console.log("USERINFOOOOOO",this.type);
    //   if(this.type=="V"){
    //     this.istype=0;
    //   }else if(this.type=="C"){
    //     this.istype=1;
    //   }
    
            if(this.id){

          //alert(this.id);
          //this.rootPage = 'HomePage';
          //location.reload();
          this.nav.setRoot('HomePage');
        }else{
          //location.reload();
          this.rootPage = 'LoginnewPage';
        }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
  // });
  });



})
  }

  public logout(){
    this.storage.ready().then(() => {
      const data=localStorage.getItem("userData");
localStorage.removeItem('userData');
localStorage.setItem('userData',"");
    this.storage.set("uid","");

   this.nav.setRoot('LoginnewPage');
  });
}

abc(){
 // alert("jdh")
  this.loguser =  JSON.parse(localStorage.getItem('userData'));   
  if(this.loguser){
    
    console.log("USERINFOOOOO",this.loguser.type);
  if(this.loguser.type=="V"){
    this.istype=0;
  }else if(this.loguser.type=="C"){
    this.istype=1;
  }
  }

}

  
  public myaccount(){
   
      this.nav.push('MyaccountPage');
     
      }

 public couponlist(){
    
      this.nav.push('CouponlistPage');
      
      }
public changepassword(){ 
  
    this.nav.push('ChangepasswordPage');
    
    }

  public goToPage(page){
    this.nav.setRoot(page);
  }


public usershoplist(){
 
    this.nav.push('UsershoplistPage');
   
    }

public shopadd(){
  
    this.nav.push('ShopaddPage');
    
  }


  public userdeallist(){
 
    this.nav.push('UserdeallistPage');
   
    }

public dealadd(){
  
    this.nav.push('DealaddPage');
    
  }





public couponadd(){
  
    this.nav.push('CouponaddPage');
    
  }

  public usercouponlist(){
 
    this.nav.push('UsercouponlistPage');
   
    }

  public orderlist(){
  
    this.nav.push('OrderlistPage');
    
  }
  
  public wallet(){
  
    this.nav.push('MywalletPage');
    
  }
  public packagesubscribed(){
  
    this.nav.push('PackagesubscribedPage');
    
  }


  userdetails(){

    this.storage.get('uid').then(val => {
      this.id =val;
      alert(this.id);
    });
  }



}

