import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestServiceProvider {

   data:any;
   sharedData:any;
   showMode:any;
   sharedfile:any;
   shopid:any;
   logged:any;
   cropped:any;
   
  constructor(public http: Http) {
    console.log('Hello RestServiceProvider Provider');
  }


  setLogged(logged)
  {
    this.logged = logged;
  }
  getLogged()
  {
    return this.logged;
  }

  setCropped(_cropped)
  {
    this.cropped = _cropped;
  }
  getCropped()
  {
    return this.cropped;
  }


  setMode(mode)
  {
    this.showMode = mode;
  }
  getMode()
  {
    return this.showMode;
  }

  setShopid(id)
  {
    this.shopid = id;
  }
  getShopid()
  {
    return this.shopid;
  }


  sharefile(data)
  {
    this.sharedfile = data;
  }
  getfile()
  {
    return this.sharedfile;
  }


  shareDataf(dataf)
  {
    this.sharedData = dataf;
  }
  getShared()
  {
    return this.sharedData;
  }

  addsamashopper()
  {
    if(this.data)
    {
      return Promise.resolve(this.data);
    }
    let opt: RequestOptions;
    let myHeaders : Headers = new Headers;
    // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');

    opt = new RequestOptions({
      headers : myHeaders
    })   
    
     return new Promise(resolve => {
       
       this.http.get('http://localhost:8000/api/samashop/v1/samashopper/', opt)
         .map(res =>res.json())
         .subscribe(data => {
           this.data = data;
           resolve(this.data);
         })
       
     })


  }

  load()
  {
    if(this.data)
    {
      return Promise.resolve(this.data);
    }

    let opt: RequestOptions;
    let myHeaders : Headers = new Headers;

    // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');

    opt = new RequestOptions({
      headers : myHeaders
    })   
    
     return new Promise(resolve => {
       
       this.http.get('http://localhost:8000/api/gastromap/v1/Trucs', opt)
         .map(res =>res.json())
         .subscribe(data => {
           this.data = data;
           resolve(this.data);
         })
       
     })




 
  }

}
