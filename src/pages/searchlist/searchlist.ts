import { Component } from '@angular/core';
import { NavController, NavParams, ToastController ,LoadingController } from 'ionic-angular'; 

import { showItemPage } from '../showitem/showitem';

import {RestServiceProvider} from '../../providers/rest-service/rest-service';

import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'searchpage',
  templateUrl: 'searchlist.html'
})
export class searchListPage {
   


  logged:any;
  results:any;
  slides :any[];
  collection :any[];
  articles :any[];
  suggests : any[];

  windH : any;
  scroller : any;
  currentShopid:any;
  currentGenreid:any;
  currentShopname:any;
  currentGenrename:any;
  currentShopdata:any;
  rightH:any;
  needle:any;

constructor(public loadingCtrl: LoadingController, public toast: ToastController, public rest: RestServiceProvider, public http: Http, public navParams: NavParams, public navCtrl: NavController) {
    
    
    this.windH = window.innerHeight;
    // this.scroller = document.querySelector('.samascroll');

     this.logged = this.rest.getLogged();
    
     // this.rightH = (this.windH - 145)+'px';

     console.log('eee');

     this.needle = this.navParams.get('tag'); 
      

      let loader = this.loadingCtrl.create({
        content: "Chargement..." 
      });
      loader.present();


      let link = 'http://192.168.43.120:8000/api/samashop/v1/searchitems/'+this.needle;
       
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
            
            console.log(data);
            this.results = data.results;
             if(this.results === 0)
              {this.results = 'aucun résultat'}
             if(this.results > 1000000) //1.000.000
              {this.results = '+1 000 000'}

            this.articles = data.articles;
            this.slides = data.slides;
            this.collection = data.collection;
            this.suggests = data.suggests;


             let delay = setInterval(function(){

                loader.dismiss();
                clearInterval(delay);

             },2000);

      },
       error => {
            

      });
    


    
}

goprev()
{
  this.navCtrl.pop();
}

seeart(art)
{
 
  console.log(this.currentShopdata);

  this.navCtrl.push(showItemPage, {item:art, data:this.currentShopdata});
   
}

ionViewWillEnter()
{
     this.windH = window.innerHeight;

     this.rightH = (this.windH - 145)+'px';
}

addtocard($event, item)
 {
    $event.stopPropagation();

     let opt: RequestOptions;
    let myHeaders : Headers = new Headers;
    // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');
 
    opt = new RequestOptions({
      headers : myHeaders
    })   
  
      let link = 'http://192.168.43.120:8000/api/samashop/v1/neworder/'+this.logged.id+'/'+item.shopid+'/'+item.id+'/'+item.type;
    
      this.http.get(link, opt)
      .map(res =>res.json())
      .subscribe(data => {
        if(data.ret !== null)
        {
          let toast = this.toast.create({
            message: 'Ajouté au panier !',
            duration: 2500
          });
          toast.present();
        }
        else
        {
          let toast = this.toast.create({
            message: 'Veuillez réessayer svp !',
            duration: 1500
          });
          toast.present();
        }

      });

 }

ionViewDidLoad() {
  
   
    // this.scroller = document.querySelector('.samascrollart');
    // // console.log(this.scroller);
    // this.scroller.style.height = (this.windH - 160)+'px';
   
    
}

categSlideChanged()
{
 
}


}
 

 



