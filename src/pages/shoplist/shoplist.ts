import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

// import { samaHeaderPage } from '../samaheader/samaheader';
// import { articleListPage } from '../articlelist/articlelist';
// import { shopHomePage } from '../shophome/shophome';
import { templateViewPage } from '../templateview/templateview';

import {RestServiceProvider} from '../../providers/rest-service/rest-service';


@Component({
  selector: 'shoplist',
  templateUrl: 'shoplist.html'
})
export class shopListPage {

    // shophomerout = shopHomePage;
    // shopartrout = articleListPage;
    

    @ViewChild(Slides) slides : Slides;
    categories:any[];
    shops : any[];
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
      this.categid = this.navParams.get('categid');
      console.log(this.categid.id);
 

      let opt: RequestOptions;
      let myHeaders : Headers = new Headers;
      // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
      myHeaders.set('Accept', 'application/json; charset=utf-8');
      myHeaders.append('Content-type', 'application/json; charset=utf-8');
   
      opt = new RequestOptions({
        headers : myHeaders
      })   
    
        let link = 'http://192.168.43.120:8000/api/samashop/v1/getcategshop/'+this.categid.id;
      
        this.http.get(link, opt )
        .map(res =>res.json())
        .subscribe(data => {
          console.log(data);
         this.views = data;
        });


     

        this.categories = [
          
              {id:1, name:'VETEMENTS', shops: []},
              {id:2, name:'SPORTS', shops: []},
              {id:3, name:'ELECTRONIQUE', shops: []},
              {id:4, name:'PERMACULTURE', shops: []},
              {id:5, name:'UTILITAIRES', shops: []},
              {id:6, name:'EDUCATION', shops: []},
              {id:7, name:'LOISIRS', shops: []},
              {id:8, name:'ENERGIE', shops: []},
              {id:9, name:'AUTRES', shops: []}
               //,// {id:10, name:'categ10', shops: []},
              // {id:11, name:'categ11', shops: []},
              // {id:12, name:'categ12', shops: []}
             ]
            

     


  }

  goprev()
  {
    this.navCtrl.pop();
  }

  newfav(shop,$event)
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
  
      let link = 'http://192.168.43.120:8000/api/samashop/v1/newfav/'+this.logged.id+'/'+shop.id+'/null/null';
    
      this.http.get(link, opt )
      .map(res =>res.json())
      .subscribe(data => {

          if(data.result === -1)
          {
            let toast = this.toast.create({
              message: 'Déjà dans vos favoris !',
              duration: 2100
            });
            toast.present();
          }
          else
          {
              let toast = this.toast.create({
                message: 'Ajouté aux favoris !',
                duration: 2100
              });
              toast.present();
          }
         
         
        
      },
         error => {


        let toast = this.toast.create({
            message: 'Veuillez réessayer svp !',
            duration: 2000
          });
          toast.present();


         }
    );

  }

  ionViewDidLoad() {
    

    this.activeCategName = this.categories[0]['name'];

    this.scroller = document.querySelectorAll('.samascroll');
    console.log(this.scroller);
     for (var i = 0; i < this.categories.length; i++) 
      {
        // console.log(this.scroller);
        // this.scroller[i].style.height = (this.windH - 160)+'px';
      }
      
      // this.rightH = (this.windH - 160)+'px';
  }

  categSlideChanged()
  {

      this.scroller = document.querySelector('.samascroll');
      // this.scroller.style.height = (this.windH - 160)+'px';
      var currpos = this.slides._activeIndex;
      if(currpos < this.categories.length)
      {
         this.activeCategName = this.categories[currpos]['name'];
      }
  }


  gotoshop(shop)
  {
      let data = [{"neant":0},{'shop' : {'id': shop.id}}];
     
      
    // console.log(data['1']['shop']['id']);
      this.navCtrl.push(templateViewPage, {
            isShowMode : 'show',
            data: data

      })
  }


}

 


