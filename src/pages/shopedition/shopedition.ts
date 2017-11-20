import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController, NavParams } from 'ionic-angular'; 
import { Http, Headers, RequestOptions } from '@angular/http';
// import { Form,FormControl  } from '@angular/forms';
import { templateViewPage } from '../templateview/templateview';
import {comptePage } from '../compte/compte';
import * as r from 'resize-image';


import {RestServiceProvider} from '../../providers/rest-service/rest-service';



@Component({
  selector: 'shopedition',
  templateUrl: 'shopedition.html'
})
export class shopEditionPage {
  
  currpos:any = 0;
  logged:any;
  shop:any[];
 
  editors:boolean = false;

  logo2 : NodeListOf<HTMLInputElement>;
  samaShopId:string;
  logoimg:string;
  uploaded:any;
  categ:any = 0;
  nom:any='';
  logo:any;
  desc:any='';
  ville:any='';
  tags:any = '';
  compressedBase64:any;
  bstring :string;
  logotype:string;
  mode:string = 'create';
  @ViewChild(Slides) slides : Slides;
  okicon :any;
  constructor(public navParams: NavParams ,public toastCtrl: ToastController,public http:Http ,public navCtrl: NavController, public rest: RestServiceProvider) {

    this.logged = this.rest.getShared();
    this.shop = this.navParams.get('data');
    
    // console.log(this.shop);
    //Will allow us to define the action to set in methode (create)
  
   
    console.log(this.shop);

   
    if(this.shop[1].shop !== null)
    {

      this.editors = true;
      // console.log('is_void');
       
      this.mode = 'update';
      
      this.categ = this.shop[1].shop['category'];
      this.currpos = this.shop[1].shop['template']
      this.nom = this.shop[1].shop['name'];
      if(this.shop[1].shop['logo'] === 'unset')
      {
        this.logoimg = '../assets/default1.png';
      }
      else
      {
        this.logoimg = 
        // decodeURIComponent(
          this.shop[1].shop['logo']
          // );
      }

      this.logotype = this.shop[1].shop['type'];  
      this.desc = this.shop[1].shop['desc'];
      this.ville = this.shop[1].shop['city'];
      this.tags = this.shop[1].shop['tags'];  
 
       
    }
    else
    {
      console.log('empty');
    }
   
    
  }

  
  ionViewWillEnter()
  {
      this.logged = this.rest.getShared();
      this.shop = this.navParams.get('data');
  }

  gotoview()
  {
    
    this.rest.setMode(false);

    this.navCtrl.push(templateViewPage,{
      data: this.shop,
      isShowMode: 'show'
    });
    
  }

  gotoedit()
  {
    
    this.rest.setMode(true);

    this.navCtrl.push(templateViewPage,{
      data: this.shop,
      isShowMode: 'edit'
    });
    
  }


  templateSlideChanged()
  {

      // this.okicon = document.querySelector('.okicon');
       this.currpos = this.slides._activeIndex;
      //  console.log(this.nom);
      
  }
 
   
  upload($event)
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

         var self = this; 
         var image , imgtype ;
            
        if($event.target.files[0] !== undefined)
        {

               this.logo = $event.target.files[0];
       
               this.logotype = $event.target.files[0].type;
                
                image = this.logo;
                imgtype = this.logotype;
                  


                if(imgtype === 'image/png' || imgtype === 'image/jpg' || imgtype === 'image/jpeg')
                {
                    getBase64(image, function(res){
                       
                      let img = new Image();
                      img.src = res;
                
                      img.onload = function(){
                       
                        var b = r.resize(img, 150,150, r.PNG);
                          self.compressedBase64 = b;
                          self.logoimg = b;

                      // console.log(self.uploaded);

                       }
       

                  })
                  
                }
                else
                {
                    let toast = this.toastCtrl.create({
                      message: 'Format non supporté !',
                      duration: 3000
                    });
                    toast.present();
                }
      


        }

         

  }

  ionViewDidLoad()
  {
    this.slides._activeIndex = this.currpos;
  }
  

 
  terminer()
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

    // this.navCtrl.push(comptePage, {
    //   created : true });

    ///////////////////////////////////////////////////
      
    let logofile= this.logo;

    console.log(logofile);
 
    let logotype = this.logotype;

    logotype = logotype.replace('image/', '');
 
    var mode = this.mode;
    var loggedId = this.logged.id;
    var categ = this.categ;
    var nom = this.nom;
    var ville = this.ville;
    var tempId = this.currpos; 
    tempId = tempId + 1;
    var desc = this.desc; 
    var tags = this.tags; 
    var GlobHttp = this.http;
    // var bstring = this.bstring;
    // var base = '';
    var toastC = this.toastCtrl;
    var navC  = this.navCtrl;
    // var logodata;

   if(logofile !== 'undefined' || logofile !== undefined )
   {
      
      let self = this;

      getBase64(logofile, function(res)
       {
        let img = new Image();
        img.src = res;
  
        img.onload = function(){
         
          var b = r.resize(img, 150,150, r.PNG);
            self.compressedBase64 = b;
         }

        self.logoimg = self.compressedBase64;
 

        let opt: RequestOptions;
        let myHeaders : Headers = new Headers;
        // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
        myHeaders.set('Accept', 'application/json; charset=utf-8');
        myHeaders.append('Content-type', 'application/json; charset=utf-8');
    
        opt = new RequestOptions({
          headers : myHeaders
        })   

        let data = {'mode':mode, 'loggedId':loggedId, 'categ':categ,
                    'nom':nom, 'ville':ville, 'logotype':logotype,
                    'logo':  self.logoimg, 'cover':'unset', 'tempId': tempId,
                    'desc':desc,'tags':tags};
        
        let toSend = JSON.stringify(data);
          
        let link = 'http://192.168.43.120:8000/api/samashop/v1/addshop';
          
          GlobHttp.post(link,toSend, opt )
          .map(res =>res.json())
          .subscribe(data => {
 
            // if(data.result)
            // {
              console.log(data);
              let toast = toastC.create({
                message: 'Changements enregistrés !',
                duration: 3000
              });
              toast.present();
              navC.pop({animate:false});
              navC.push(comptePage,{},{animate:false});

            // } 
          }, error => {
          
            // console.log("error")
            let toast = toastC.create({
              message: 'Veuillez réessayer !',
              duration: 2000
            });
            toast.present();
            
          })

      });

   }
  }
}



