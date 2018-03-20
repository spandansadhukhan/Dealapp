import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { Config } from './../../config';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  apiUrl = Config.baseUrl;
  constructor(
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello AuthServiceProvider Provider');
  }
  public details ;
  postData(credentials, type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    console.log(credentials);
    console.log(type);
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(this.apiUrl + type, JSON.stringify(credentials))
        .subscribe(res => {
          console.log(res);
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          console.log(err);
          reject(err);
          loading.dismiss();
        });
    });

  }

  signup(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'users/registration_api',data).map((res:Response)=>{
      return res.json();
    });
  }

  login(data: object): Observable<any> {
    console.log(data);
    return this.http.post(this.apiUrl +'users/applogin', data).map((res: Response) => {
      return res.json();
    });
  }

  dealadd(data:object):Observable<any>{
    console.log(data);
    return this.http.post(this.apiUrl +'products/add_api',data).map((res:Response)=>{
      return res.json();
    });
  }

  getdealdetails(data: object): Observable<any> {
    let requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'products/getdealdetails_api',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
    
  }
  updatedeal(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'products/editdeal_api', data).map((res: Response) => {
      return res.json();
    });
  }

  getdetails(data: object): Observable<any> {
    let requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'users/getprofiledetails_api',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
    // return this.http.post(this.apiUrl + 'users/getprofiledetails_api', data).map((res: Response) => {
    //   return res.json();
    // });
  }

  updateprofile(data: object): Observable<any> {
    return this.http.post(this.apiUrl + 'users/edituserprofile_api', data).map((res: Response) => {
      return res.json();
    });
  }
  changepass(data: object): Observable<any> {
    
    let requestchangeoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.apiUrl + 'users/change_password_api',
      body: JSON.stringify(data)
    });
    return this.http.request(new Request(requestchangeoptions))
      .map((res: Response) => {
        if (res) {
          return res.json();
        }
      });
  }

   forgetpass(data: object): Observable < any > {
     console.log(data);
     let requestforgetoptions = new RequestOptions({
       method: RequestMethod.Post,
       url: this.apiUrl + 'users/apiforgot_password',
       body: JSON.stringify(data)
     });
     console.log(requestforgetoptions);
     return this.http.request(new Request(requestforgetoptions))
       .map((res: Response) => {
         if (res) {
           return res.json();
         }
       });
    }


  getData(type) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    //console.log(type);
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.get(this.apiUrl + type)
        .subscribe(res => {
          //let details = res;
          //console.log(details);
          //console.log(res);
          resolve(res.json());
          loading.dismiss();
        }, (err) => {
          console.log(err);
          reject(err);
          loading.dismiss(); 
        });
    });

  }


  

  
}
