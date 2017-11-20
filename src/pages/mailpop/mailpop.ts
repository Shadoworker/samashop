import { Component } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular'; 
import { Http, Headers, RequestOptions } from '@angular/http';

import { mainHomePage } from '../mainhome/mainhome';
 

@Component({
  selector: 'mailpop',
  templateUrl: 'mailpop.html'
})
export class mailPopPage {

  
     samaId : any;
     mail:any;

  constructor(public http:Http ,public navCtrl: NavController,public navParams: NavParams ) {
      
          //  console.log(this.samaId);
           

  }
 

  sendMail()
  {

    let opt: RequestOptions;
    let myHeaders : Headers = new Headers;
    // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');

    opt = new RequestOptions({
      headers : myHeaders
    })   
    
      let data = {mail:this.mail};
      let toSend = JSON.stringify(data);

      let link = 'http://192.168.43.120:8000/api/samashop/v1/sendmail';
      this.http.post(link,toSend, opt )
      .map(res =>res.json())
      .subscribe(data => {
        if(data.status === "done")
        {
          
            this.navCtrl.push(mainHomePage); 
         
        }
        else
        {

        }
        
      })
 
  }
 

backtomain()
{

    this.navCtrl.pop();

}



}
 