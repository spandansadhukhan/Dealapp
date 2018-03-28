import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController,LoadingController,Platform,ActionSheetController,Loading } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
/**
 * Generated class for the DealeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-dealedit',
  templateUrl: 'dealedit.html',
})
export class DealeditPage {
  eForm : FormGroup;
  public response:any;
   responseData : any;
   public val:any;
   lastImage: string = null;
   loading: Loading;
  imageURI:any;
  imageFileName:any; 
 public shoplist:any;
 public categorylist: any;
 public citylist: any;
 public id:any;
 public deal_id:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private storage: Storage,
     public authService:AuthServiceProvider,
     private builder: FormBuilder,
    public alertCtrl: AlertController,
    public toastCtrl:ToastController,
    private actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    private transfer: FileTransfer,
    private file: File, 
    private filePath: FilePath,
    private camera: Camera,) {


      this.eForm = builder.group({
        'name': [null, Validators.required],
        'shop_id': [null, Validators.required],
        'category_id': [null, Validators.required],
        'city_id':[null, Validators.required],
        'price_lot': [null, Validators.required],
        'discount': [null, Validators.required],
        'description': [null, Validators.required],
        'start_date': [null, Validators.required],
        'start_time': [null, Validators.required],
        'end_date': [null, Validators.required],
        'end_time': [null, Validators.required],
        'status': [null, Validators.required],
        
      });
      this.id = this.navParams.get('id');
      //val = this.id;
      this.authService.getdealdetails({ deal_id: this.id }).subscribe(res => {
        //console.log(deal_id);
        //console.log(res.userInfo.User.first_name);
        var sdt=res.dealInfo.Product.start_date;
        var edt=res.dealInfo.Product.end_date;
        var ressdt = sdt.split(" ");
        var resedt = edt.split(" ");
        //this.eForm.controls['id'].setValue(res.dealInfo.Product.id);
        this.eForm.controls['name'].setValue(res.dealInfo.Product.name);
        this.eForm.controls['shop_id'].setValue(res.dealInfo.Product.shop_id);
        this.eForm.controls['category_id'].setValue(res.dealInfo.Product.category_id);
        this.eForm.controls['city_id'].setValue(res.dealInfo.Product.city_id);
        this.eForm.controls['price_lot'].setValue(res.dealInfo.Product.price_lot);
        this.eForm.controls['discount'].setValue(res.dealInfo.Product.discount);
        this.eForm.controls['description'].setValue(res.dealInfo.Product.item_description);
        this.eForm.controls['start_date'].setValue(ressdt[0]);
        this.eForm.controls['start_time'].setValue(ressdt[1]);
        this.eForm.controls['end_date'].setValue(resedt[0]);
        this.eForm.controls['end_time'].setValue(resedt[1]);
        this.eForm.controls['status'].setValue(res.dealInfo.Product.status);
      });
    
          
        
      


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealeditPage');
    this.deal_id = this.navParams.get('id');
    this.usershop();
    //alert(this.id);
  }


  usershop(){
    this.storage.get('uid').then(val => {
      
      //console.log(val);
      this.id = val;
    let serval={
      "id": this.id
     };
     
    this.authService.postData(serval,'products/add_deal_list_api').then((result) => {
      this.responseData = result
 // console.log("CHATRESULTTTT",result);
      if( this.responseData.ACK == 1)
      {
       
        this.shoplist =  this.responseData.Shop; 
        this.categorylist =  this.responseData.Category;
        this.citylist =  this.responseData.City;  
        
        console.log('ccc',this.shoplist);
      }
      else
      {
        this.shoplist = '';
        this.categorylist = '';
        this.citylist = '';
        
      }
     
    }, (err) => {
      console.log(err);
      // Error log
    });
  });
  }


  onSubmit(formData) {
    console.log(this.eForm.valid);
     //alert(this.deal_id);
        formData['deal_id'] = this.deal_id;
       // console.log(formData);
      this.authService.updatedeal(formData).subscribe(res => {
        //console.log(formData);
        this.uploadImage(this.deal_id);
        if (res.ACK==1) {
          console.log(res);
          const alert = this.alertCtrl.create({
            title: res.msg,
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot('UserdeallistPage');
        }else{
          const alert = this.alertCtrl.create({
            title: res.msg,
            buttons: ['OK']
          });
          alert.present();
        }
      }, err => {
        console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Auth Failed!',
          buttons: ['OK']
        });
        alert.present();
      });

   
  }





  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            this.uploadFromCamera(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
            this.uploadFromCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      ]
    });
    actionSheet.present();
  }



  uploadFromCamera(sourceType){

    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });

  }

  private createFileName(currentName) {
    var d = new Date(),
    n = d.getTime(),
   // newFileName=n+".jpg";
    newFileName=currentName;
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
   console.log("CURRENTFILENAME",currentName);
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log("NEWFILENAMEEEEEE",this.lastImage);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public pathForImage(img) {
    console.log("IMAGGGEGGEGGEGE",img);
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(id) {
    // Destination URL
    var url = "http://111.93.169.90/team6/deal/products/insertimage_api";
   
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
   
    // File name only
    var filename = this.lastImage;
   
    var options = {
      fileKey: "photo",
      photo: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
      'photo':filename,
      'deal_id':id
       }
     // params : {'fileName': filename}
    };
    console.log("OPTIONS",options);
    const fileTransfer:FileTransferObject = this.transfer.create();
   
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      console.log('UPLOADDDD',data);
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
      //this.navCtrl.push('HomePage');
    }, err => {
      console.log("Error",err);
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }




}
