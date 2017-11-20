import { Component } from '@angular/core';
import { NavController, NavParams ,  ModalController, ToastController} from 'ionic-angular'; 
import { Http, Headers, RequestOptions } from '@angular/http';
import { confirmPopPage } from '../confirmpop/confirmpop';

import {RestServiceProvider} from '../../providers/rest-service/rest-service';

import * as r from 'resize-image';

// import { samaHeaderPage } from '../samaheader/samaheader';
import { shopEditionPage } from '../shopedition/shopedition'; 
import { templateViewPage } from '../templateview/templateview';


@Component({
  selector: 'samacompte',
  templateUrl: 'compte.html'
})
export class comptePage {
    
  // shopeditionrout = shopEditionPage;
  
  showCreatebtn = true;
  showEditbtn = false;
  logged :any;
  loggedId:any;
  shop:any[] ;
  loggedlogin:any;
  loggedname:any;
  login:any;
  name:any;
  cover:any;
  shopcover:any = '../assets/samashopcoverbanner.png';
  constructor(public modCtrl: ModalController ,public toast: ToastController ,public http: Http ,public navCtrl: NavController, public navParams: NavParams, public rest: RestServiceProvider) {

    //  this.showCreatebtn = !this.navParams.get('created');
    //  this.showEditbtn = this.navParams.get('created');
    

     this.logged = this.rest.getShared();
     console.log(this.logged);
    
     this.loggedlogin = this.logged.login;
     this.loggedname = this.logged.name;
    

     this.shop = [{owner : this.logged},{shop: null}];

     

  }

shopcreateupdate()
{

  // this.navCtrl.pop();
  this.navCtrl.push(shopEditionPage, {
    data : this.shop

})
}

editshop()
{
    
    this.navCtrl.push(templateViewPage, {
      isShowMode : 'edit'

  })

}

  ionViewWillEnter()
  { 
     let opt: RequestOptions;
     let myHeaders : Headers = new Headers;
     // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
     myHeaders.set('Accept', 'application/json; charset=utf-8');
     myHeaders.append('Content-type', 'application/json; charset=utf-8');
 
     opt = new RequestOptions({
       headers : myHeaders
     })   
   
       let link = 'http://192.168.43.120:8000/api/samashop/v1/ownshop/'+this.logged.id;
       // console.log(link);

       this.http.get(link, opt )
       .map(res =>res.json())
       .subscribe(data => {
        //  console.log(data)
        if(data.shop !== null)
        {
            this.showCreatebtn = false;
            this.showEditbtn = true;
            this.shop[1]['shop'] = data.shop;

            this.shopcover = this.shop[1]['shop']['cover'];
            if(this.shopcover === 'unset')
            {
               this.shopcover = '../assets/samashopcoverbanner.png';
            }
            

        }

         // console.log('entered!');
        
           
       })


    
  }


  loadCover($event)
  {

     function getBase64(file, callback) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file); 
          reader.onload = function(e)
          {
            resolve(reader.result);
            callback(reader.result);
          }  
          
          reader.onerror = error => reject(error);
        });
     }

      var file,imgtype;
      var self = this; 

      if($event.target.files[0] !== undefined || $event.target.files[0] !== 'undefined')
      {
        file = $event.target.files[0]; 
        imgtype = file.type;

        if(imgtype === 'image/png' || imgtype === 'image/jpg' || imgtype === 'image/jpeg')
          {
              getBase64(file, function(res){
                 
                let img = new Image();
                img.src = res;
          
                img.onload = function(){
                 
                  var b = r.resize(img, 150,150, r.PNG);
                    
                  self.shopcover = b;

                 }

            })
            
          }
          else
          {
             let toast = this.toast.create({
                message: 'Format non supporté !',
                duration: 2000
              });
              toast.present();
          }


      }

     
  } ///////////////
 
  saveAccountChanges()
  {
    
     let opt: RequestOptions;
     let myHeaders : Headers = new Headers;
     // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
     myHeaders.set('Accept', 'application/json; charset=utf-8');
     myHeaders.append('Content-type', 'application/json; charset=utf-8');
 
     opt = new RequestOptions({
       headers : myHeaders
     })   

    
     let self = this;



     self.loggedId = this.logged.id;
     self.login = this.loggedlogin;
     self.name = this.loggedname;
     self.cover = this.shopcover; 
     let finalcover;
   


    if(self.cover == '../assets/samashopcoverbanner.png')
     {
       finalcover = 'unset';
     }
     else
     {
      finalcover = self.cover;
     }
           
          // let img = new Image();
          // img.src = finalcover;
    
          // img.onload = function(){
           
          //   var b = r.resize(img, 150,150, r.PNG);
          //     self.cover = b;
          //  }

  
       let link = 'http://192.168.43.120:8000/api/samashop/v1/updateshopper';
       // console.log(link);
       
       let data = {'loggedid' : self.loggedId, 'login' : self.login,'name' : self.name, 'cover' : self.cover};
       let toSend = JSON.stringify(data);

      
     if(self.login.toString().length === 9)
     {
       this.http.post(link, toSend, opt )
       .map(res =>res.json())
       .subscribe(data => {
         
         if(data.result === 'updated')
         {
              let toast = this.toast.create({
                message: 'Mis à jour ',
                duration: 1500
              });
              toast.present();

          let modal = this.modCtrl.create(confirmPopPage,{samaId:self.loggedId});
          modal.present();

         }
         if(data.result === 'old')
         {

             let toast = this.toast.create({
                message: 'Enregistré ',
                duration: 1500
              });
              toast.present();

         }

        }, error => {
         
         console.log(error);

        });

      } //If login
      else
      {
          
         let toast = this.toast.create({
              message: 'Numéro invalide !',
              duration: 1500
            });
         toast.present();

      }


      }
  

    


}



