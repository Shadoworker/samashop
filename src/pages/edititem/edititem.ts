import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams, ToastController , ModalController} from 'ionic-angular'; 
import { Http, Headers, RequestOptions,  } from '@angular/http';
// import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';
import * as r from 'resize-image';
import { cropPopPage } from '../croppop/croppop';

// import { samaHeaderPage } from '../samaheader/samaheader';
import {RestServiceProvider} from '../../providers/rest-service/rest-service';
 

@Component({
  selector: 'edititem',
  templateUrl: 'edititem.html'
})
export class editItemPage {
  

  nC : NavController;
  item:any;
  emptyer:File;
  genres:any;
  type:any;
  title:any;
  price:any;
  genre:any;
  desc:any;
  hasgenre:boolean=false;
  genreid:any = 1;
  image:any;
  id:any;
  shopid:any;
  imagetype:any;
  genrename:any = null;
  origin:any;
  compressedBase64:any;
  uploaded:any;

  testfile:any;

  @ViewChild(Slides) slides : Slides;
  okicon :any;
  constructor( public rest: RestServiceProvider, public modCtrl: ModalController,public toast: ToastController, public navCtrl: NavController,public http: Http, public navParams: NavParams) {

      this.item = this.navParams.get('item');
      console.log(this.item);
      // this.genres = this.navParams.get('genres');
      // this.emptyer = File({});
      // console.log(this.genres);

      this.id = this.item['id'];
      this.shopid = this.item['shopid'];
      this.type = this.item['type'];
      this.title = this.item['title'];
      this.price = this.item['price'];
      this.desc = this.item['desc'];

      if(this.item['genre'])
      {
        this.genre = this.item['genre'];
        this.hasgenre = true;
      }
      if(this.item['image'] === '')
      {
        this.item['image'] = '../assets/preview_default.png';
      }
      else
      {
        this.item['image'] = decodeURIComponent(this.item['image']);
      }
      
      this.uploaded = this.item['image'];

     
        let link = 'http://192.168.43.120:8000/api/samashop/v1/getshopgenres/'+this.shopid;
         
        let opt: RequestOptions;
        let myHeaders : Headers = new Headers;
        // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
        myHeaders.set('Accept', 'application/json; charset=utf-8');
        myHeaders.append('Content-type', 'application/json; charset=utf-8');
      
        opt = new RequestOptions({
          headers : myHeaders
        })               

            this.http.get(link,opt)
            .map(res =>res.json())
            .subscribe(data => {
          
                this.genres = data['genres'];

            });
      



  }

  ionViewWillEnter()
  { 

 this.item = this.navParams.get('item');
      console.log(this.item);
      // this.genres = this.navParams.get('genres');
      
      // console.log(this.genres);


      this.id = this.item['id'];
      this.shopid = this.item['shopid'];
      console.log(this.shopid);
      this.type = this.item['type'];
      this.title = this.item['title'];
      this.price = this.item['price'];
      this.desc = this.item['desc'];

      if(this.item['genre'])
      {
        this.genre = this.item['genre'];
        this.hasgenre = true;
      }
      if(this.item['image'] === '')
      {
        this.item['image'] = '../assets/preview_default.png';
      }


     
        let link = 'http://192.168.43.120:8000/api/samashop/v1/getshopgenres/'+this.shopid;
         
        let opt: RequestOptions;
        let myHeaders : Headers = new Headers;
        // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
        myHeaders.set('Accept', 'application/json; charset=utf-8');
        myHeaders.append('Content-type', 'application/json; charset=utf-8');
      
        opt = new RequestOptions({
          headers : myHeaders
        })               

            this.http.get(link,opt)
            .map(res =>res.json())
            .subscribe(data => {
          
                this.genres = data['genres'];

            });
      


  }
  
  goprev()
  {
    this.navCtrl.pop();
  }

  
  selectchange($event)
  {
    this.genreid = $event.target.value;
  }

 loadImage2($event)
  {

    console.log($event.target.files[0]);

  }
 
  blur()
  {
    console.log('blurred');
  }

  loadImage($event)
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

    var imgtype,image ;
    var self = this; 



    if($event.target.files[0] !== undefined)
    {
      this.image = $event.target.files[0];
      imgtype = this.image.type;
      image = this.image;


       if(imgtype === 'image/png' || imgtype === 'image/jpg' || imgtype === 'image/jpeg')
          {

              getBase64(image, function(res){
                 
                let img = new Image();
                img.src = res;
                
                
                img.onload  = function(){
                 
                  var b = r.resize(img, 150,150, r.PNG);
                    self.compressedBase64 = b;
                    self.uploaded = b;
                    let modal = self.modCtrl.create(cropPopPage,{initialsrc:b});
                    modal.present();
                    // console.log(document.querySelector('input.itemuploader').files);
                    // $event.target.; 
                    // document.querySelector('input.itemuploader').files = self.emptyer;
                    // console.log('entered');
                    modal.onWillDismiss(function(){
                     
                      self.uploaded = self.rest.getCropped();
                      self.compressedBase64 = self.uploaded;

                    });
                    // modal.willLeave(function()
                    // {
                    //   console.log('defr');
                    // });
                   // if(modal.present())
                   // {

                   // }
                    
                      // console.log(modal);
                   
                 }

                  self.item['image'] = self.compressedBase64;

                    

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

    

    
     
      //  console.log(self.item['image']);

  } 



terminer()
{


  let opt: RequestOptions;
  let myHeaders : Headers = new Headers;
  // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
  myHeaders.set('Accept', 'application/json; charset=utf-8');
  myHeaders.append('Content-type', 'application/json; charset=utf-8');

  opt = new RequestOptions({
    headers : myHeaders
  })   

      // let link = 'http://192.168.43.120:8000/api/samashop/v1/addshop2/refus';
      // console.log(link);

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


      // console.log(image);
      let self = this;
      self.id = this.id;
      self.shopid = this.shopid;
      // console.log(this.shopid);
      // console.log(self.shopid);

      self.genre = this.genre;
      self.genreid = this.genreid;
      self.genrename = this.genrename;
      self.price = this.price;
      self.type = this.type;
      self.title = this.title;
      self.desc = this.desc;

      self.compressedBase64 = this.compressedBase64;


      var GlobHttp = this.http;
      var GlobToast = this.toast;
     

     
      let image = this.image;
      let imgtype; 

      if(image)
      {
        imgtype = image.type;

        if(imgtype === 'image/png' || imgtype === 'image/jpg' || imgtype === 'image/jpeg')
          {
      
          getBase64(image, function(res){
            
            let img = new Image();
            img.src = res;
      
            img.onload = function(){
             
              var b = r.resize(img, 150,150, r.PNG);
               
                self.compressedBase64 = b;
             }

          image = res;
          self.item['image'] = self.compressedBase64;
          self.compressedBase64 = encodeURIComponent(self.compressedBase64); 
          
          
          // let link = 'http://192.168.43.120:8000/api/samashop/v1/addedititem/'+self.id+'/'+self.shopid+'/'+self.genre+'/'+self.genrename+'/'+self.type+'/'+res+'/'+self.title+'/'+self.desc+'/'+self.price;
          let link = 'http://192.168.43.120:8000/api/samashop/v1/addedititem';
          //self.id+'/'+self.shopid+'/'+self.genre+'/'+self.genrename+'/'+self.type+'/'+res+'/'+self.title+'/'+self.desc+'/'+self.price;
          // $id, $shopid, $genre, $genrename, $type, $image, $title, $desc, $price)
          console.log(self.genreid);
          let data = {'id':self.id ,'shopid':self.shopid,'genrename':self.genrename,'genre':self.genreid,'type':self.type,'image':self.compressedBase64, 'title':self.title, 'desc': self.desc, 'price': self.price };
          
          let toSend = JSON.stringify(data);
           
 
          let opt: RequestOptions;
          let myHeaders : Headers = new Headers;
          // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
          myHeaders.set('Accept', 'application/json; charset=utf-8');
          myHeaders.append('Content-type', 'application/json; charset=utf-8');
        
          opt = new RequestOptions({
            headers : myHeaders
          })               

            GlobHttp.post(link, toSend ,opt)
            .map(res =>res.json())
            .subscribe(data => {
          
                console.log(data);
                let toast = GlobToast.create({
                  message: 'Changements enregistrés !',
                  duration: 3000
                });
                toast.present();
              
            }, error => {
              console.log(error);
              
              let toast = GlobToast.create({
                message: 'Veuillez réessayer svp !',
                duration: 3000
              });
              toast.present();
              
            })
    

          })
        }
        else //image not selected
        {
       
            let toast = GlobToast.create({
              message: 'Format non supporté !',
              duration: 2000
            });
            toast.present();
        }
          
        
      }
      else
      {
        
          let link = 'http://192.168.43.120:8000/api/samashop/v1/addedititem';
          
          let data = {'id':self.id ,'shopid':self.shopid,'genrename':self.genrename,'genre':self.genreid,'type':self.type,'image':this.item['image'], 'title':self.title, 'desc': self.desc, 'price': self.price };
            
          let toSend = JSON.stringify(data);
             
  
          GlobHttp.post(link, toSend, opt )
          .map(res =>res.json())
          .subscribe(data => {
        
              console.log(data);
              let toast = GlobToast.create({
                message: 'Changements enregistrés !',
                duration: 3000
              });
              toast.present();
            
          }, error => {
          
            let toast = GlobToast.create({
              message: 'Veuillez réessayer svp !',
              duration: 3000
            });
            toast.present();
            
          })
  

      }

   
}


  // templateSlideChanged()
  // {

  //     this.okicon = document.querySelector('.okicon');
  
      
  // }




}



