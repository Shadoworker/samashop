import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams, ToastController , Content} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

// import { samaHeaderPage } from '../samaheader/samaheader';
// import { articleListPage } from '../articlelist/articlelist';
// import { shopHomePage } from '../shophome/shophome';
import { templateViewPage } from '../templateview/templateview';

import {RestServiceProvider} from '../../providers/rest-service/rest-service';


@Component({
  selector: 'favlist',
  templateUrl: 'favlist.html'
})
export class favListPage {

    // shophomerout = shopHomePage;
    // shopartrout = articleListPage;
    

    @ViewChild(Slides) slides : Slides;
    @ViewChild(Content) content : Content;
    categories:any[];
    shops : any[];
    items : any[];
    activeCategName : string;
    rightH : any;
    windH : any;
    scroller : any;
    categid :any;
    views:any;
    logged:any;


   constructor(public toast:ToastController, public navCtrl: NavController, public navParams: NavParams, public http:Http, public rest: RestServiceProvider) {
      
      
      this.windH = window.innerHeight;
      this.logged = this.rest.getShared(); 
 

      // let opt: RequestOptions;
      // let myHeaders : Headers = new Headers;
      // // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
      // myHeaders.set('Accept', 'application/json; charset=utf-8');
      // myHeaders.append('Content-type', 'application/json; charset=utf-8');
   
      // opt = new RequestOptions({
      //   headers : myHeaders
      // })   
    
      //   let link = 'http://192.168.43.120:8000/api/samashop/v1/shopperfavs/'+this.logged.id;
      
      //   this.http.get(link, opt )
      //   .map(res =>res.json())
      //   .subscribe(data => {
      //     console.log(data);
      //     this.shops = data.shops;
      //     // this.items = data.items;
      //   });


     

  }
 

  gotoshop(fav)
  {
      let data = [{"neant":0},{'shop' : {'id': fav['id']}}];
     
      
    // console.log(data['1']['shop']['id']);
      this.navCtrl.push(templateViewPage, {
            isShowMode : 'show',
            data: data

      })
  }


  ionViewWillEnter()
  {
    console.log('inside');

    
      let opt: RequestOptions;
      let myHeaders : Headers = new Headers;
      // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
      myHeaders.set('Accept', 'application/json; charset=utf-8');
      myHeaders.append('Content-type', 'application/json; charset=utf-8');
   
      opt = new RequestOptions({
        headers : myHeaders
      })   
    
        let link = 'http://192.168.43.120:8000/api/samashop/v1/shopperfavs/'+this.logged.id;
      
        this.http.get(link, opt )
        .map(res =>res.json())
        .subscribe(data => {
          console.log(data);
          this.shops = data.shops;
          // this.items = data.items;
        });


     

  }


  defav($event, fav)
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
        
        // let data = {'shopperid':this.logged.id, 'shopid': fav.id};
        // let toSend =JSON.stringify(data);

        let link = 'http://192.168.43.120:8000/api/samashop/v1/defav/'+this.logged.id+'/'+fav.id;
      
        this.http.get(link, opt )
        .map(res =>res.json())
        .subscribe(data => {
           
             let toast = this.toast.create({
                message: 'Supprimé des favoris!',
                duration: 2000
              });
              toast.present();
              this.navCtrl.push(favListPage);

        }, 
        error => {

             let toast = this.toast.create({
                message: 'Veuillez réessayer svp !',
                duration: 2000
              });
              toast.present();

        });


  }

  goprev()
  {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    
 
      this.scroller = document.querySelector('.samascroll');
      // console.log(this.scroller);
      this.scroller.style.height = (this.windH - 150)+'px';
    
     
      // this.rightH = (this.windH - 160)+'px';
  }

  categSlideChanged()
  {

       
  }


  shophome()
  {
      this.navCtrl.push(templateViewPage, {
            isShowMode : 'show'

      })
  }


}

 


