import { HttpClient } from '@angular/common/http';
import { Headers, Http, Response, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Config } from './../../config';
import { LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the CodescannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CodescannerProvider {
  apiUrl = Config.baseUrl;
  constructor(public http: Http, public loadingCtrl: LoadingController) {
    console.log('Hello CodescannerProvider Provider');
  }

  findCode(data: object): Observable<any>{
    // console.log(data);
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    return this.http.post(this.apiUrl + 'loyalties/loyalty_add_api', data).map((res: Response) => {
      // loading.dismiss();
      return res.json();
    });
  }
}
