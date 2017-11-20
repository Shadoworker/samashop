import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular'; 
import { Http, Headers, RequestOptions } from '@angular/http';

import { mainHomePage } from '../mainhome/mainhome';
import { HomePage } from '../home/home';
import { confirmPopPage } from '../confirmpop/confirmpop';

 

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class signupPage {

    // backtomain = mainHomePage;
    loginrout = HomePage;
    
    windH : any;
    scroller : any;
    login:any;
    pword:any;
    name:any = '';
    mail:any;

  constructor(public toastCtrl: ToastController,public http:Http ,public navCtrl: NavController,public modalCtrl: ModalController) {
      
      
      this.windH = window.innerHeight;
      this.scroller = document.querySelector('.bloc_containerlogin');
     
  }

  backtomain()
  {
    this.navCtrl.push(mainHomePage,{'splash':false});
  }

  ionViewDidLoad() {
    
      this.scroller = document.querySelector('.bloc_containerlogin');
    //   // console.log(this.scroller);
      this.windH = window.innerHeight;
     
      this.scroller.style.height = (this.windH - 0)+'px';
    
  }

  createSamashopper()
  {

    let opt: RequestOptions;
    let myHeaders : Headers = new Headers;
    // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');

    opt = new RequestOptions({
      headers : myHeaders
    })   
    
     
      
     console.log(this.mail);


      if(this.login.toString().length === 8)
      {
            
            let data = {'login' : '7'+this.login, 'pword':this.pword, 'name':this.name, 'mail': this.mail};
            let toSend = JSON.stringify(data);
    
            let link = 'http://192.168.43.120:8000/api/samashop/v1/addsamashopper';
            this.http.post(link, toSend, opt )
            .map(res =>res.json())
            .subscribe(data => {
              console.log(data)
              if(data.result === 'new')
              {
                 let toast = this.toastCtrl.create({
                  message: 'Compte créé avec succés !',
                  duration: 3000
                });
                toast.present();
                  let modal = this.modalCtrl.create(confirmPopPage,{samaId:data.id});
                  modal.present();
              }
              else
              {
                let toast = this.toastCtrl.create({
                  message: 'Ce compte existe déjà !',
                  duration: 2000
                });
                toast.present();
              }
               
            },
            error => {

               let toast = this.toastCtrl.create({
                message: 'Veuillez réessayer svp !',
                duration: 2000
              });
              toast.present();

            })


        }
        else
        {
             let toast = this.toastCtrl.create({
                message: 'Veuillez vérifier votre numéro !',
                duration: 2000
              });
              toast.present();
        }
 

 
   }



}//END export
 