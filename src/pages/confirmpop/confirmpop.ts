import { Component } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular'; 
import { Http, Headers, RequestOptions } from '@angular/http';

import { mainHomePage } from '../mainhome/mainhome';
import { HomePage } from '../home/home';

 

@Component({
  selector: 'confirmpop',
  templateUrl: 'confirmpop.html'
})
export class confirmPopPage {

    backtomain = mainHomePage;
    loginrout = HomePage;
     
     samaId : any;
     code:any;

  constructor(public http:Http ,public navCtrl: NavController,public navParams: NavParams ) {
      
           this.samaId = this.navParams.get('samaId');
          //  console.log(this.samaId);
           

  }
 

  confirmCode()
  {

    let opt: RequestOptions;
    let myHeaders : Headers = new Headers;
    // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');

    opt = new RequestOptions({
      headers : myHeaders
    })   
    
     
      let link = 'http://192.168.43.120:8000/api/samashop/v1/confirmcode/'+this.code+'/'+this.samaId;
      this.http.get(link, opt )
      .map(res =>res.json())
      .subscribe(data => {
        if(data.status === "done")
        {
          
            this.navCtrl.push(HomePage, {
              'Samashopper' : data.samashopper
            }) 
         
        }
        else
        {

        }
        
      })
 
  }
 

report()
{

    this.navCtrl.push(mainHomePage,{'splash':false});

}



}
 