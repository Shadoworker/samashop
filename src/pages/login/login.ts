import { Component } from '@angular/core';
import { NavController, ModalController,ToastController} from 'ionic-angular'; 
import { Http, Headers, RequestOptions } from "@angular/http";
import { mainHomePage } from '../mainhome/mainhome';
import { HomePage } from '../home/home';
import { confirmPopPage } from '../confirmpop/confirmpop';
import { mailPopPage } from '../mailpop/mailpop';

import {RestServiceProvider} from '../../providers/rest-service/rest-service';


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class loginPage {

    // backtomain = mainHomePage;
    // loginrout = HomePage;
    
    windH : any;
    scroller : any;
    log_in:any;
    pword:any;
    checked:boolean=false;

  constructor( public rest: RestServiceProvider,public toastCtrl: ToastController,public navCtrl: NavController, public http:Http, public modCtrl: ModalController) {
      
      
      this.windH = window.innerHeight;
      this.scroller = document.querySelector('.bloc_containerlogin');
     
  }

  backtomain()
  {
    this.navCtrl.push(mainHomePage,{'splash':false});
  }
  
  login()
  {

    let opt: RequestOptions;
    let myHeaders : Headers = new Headers;
    // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');

    opt = new RequestOptions({
      headers : myHeaders
    })   
    
    

      let login = this.log_in;
      let pword = this.pword;
    

      login= '7'+login;
       
     if(this.checked) //If the password is forgotten
      {

           let modal = this.modCtrl.create(mailPopPage);
           modal.present();

      }
     else
      { 
        let link = 'http://192.168.43.120:8000/api/samashop/v1/login/'+login+'/'+pword;
        this.http.get(link, opt )
        .map(res =>res.json())
        .subscribe(data => {
          console.log(data)
          if(parseInt(data.confirmed,10) === 0)
          {
            let modal = this.modCtrl.create(confirmPopPage,{samaId:data.id});
            modal.present();
          }
          if(parseInt(data.confirmed,10) === 1)
          {

            this.navCtrl.push(HomePage, {
              'Samashopper' : data
            })

          //In order to get logged in all pages
          this.rest.setLogged(data);

          }
          // console.log(JSON.stringify(data));
          if(JSON.stringify(data) === '{}')
          {
            // console.log('entered');
            let toast = this.toastCtrl.create({
              message: 'compte inexistant !',
              duration: 3000
            });
            toast.present();
          }

           
        })
      }
 
  }
 

  isChecked($event)
  {
     this.checked = $event.target.checked;
  }

  ionViewDidLoad() {
    
      this.scroller = document.querySelector('.bloc_containerlogin');
    //   // console.log(this.scroller);
      this.windH = window.innerHeight;
    
      this.scroller.style.height = (this.windH - 0)+'px';
    
  }
 

}
 