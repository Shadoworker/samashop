import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

// import { samaHeaderPage } from '../samaheader/samaheader';
// import { articleListPage } from '../articlelist/articlelist';
// import { shopHomePage } from '../shophome/shophome';
import { templateViewPage } from '../templateview/templateview';

import {RestServiceProvider} from '../../providers/rest-service/rest-service';


@Component({
  selector: 'orderlist',
  templateUrl: 'orderlist.html'
})
export class orderListPage {

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
    shoptel:any;
    displayedtext:any = '';
    notempty:boolean = true;
    orders:any;

  constructor(public toast:ToastController, public navCtrl: NavController, public navParams: NavParams, public http:Http, public rest: RestServiceProvider) {
      
      
      this.windH = window.innerHeight;
      this.logged = this.rest.getShared();
      this.categid = this.navParams.get('categid');
       
      

      let opt: RequestOptions;
      let myHeaders : Headers = new Headers;
      // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
      myHeaders.set('Accept', 'application/json; charset=utf-8');
      myHeaders.append('Content-type', 'application/json; charset=utf-8');
   
      opt = new RequestOptions({
        headers : myHeaders
      })   
    
        let link = 'http://192.168.43.120:8000/api/samashop/v1/shopperorders/'+this.logged.id;
      
        this.http.get(link, opt )
        .map(res =>res.json())
        .subscribe(data => {
          console.log(data);
         this.views = data;
         this.orders = data;
         if(this.orders.length === 0)
         {
           this.notempty = false;
           this.displayedtext = 'AUCUNE COMMANDE';
         }
         else
         {
          for (var i = 0; i < this.orders.length; i++)
            {   
               for (var j = 0; j < this.orders[i]['items'].length; j++) 
               {
                  
                  if(this.orders[i]['items'][j]['image'] === '' || this.orders[i]['items'][j]['image'] === 'default')
                    {
                      this.orders[i]['items'][j]['image'] = 'assets/default2.png';
                    }
                  else
                  {
                    this.orders[i]['items'][j]['image'] = decodeURIComponent(this.orders[i]['items'][j]['image']);
                  }

               }
            }
         }
        
      });
 
       
  }


  commander(shopindex)
   {
       let commanditems = [];
       let selectedorders = document.querySelectorAll('input[name="order_'+shopindex+'"]:checked');
      
       if(selectedorders.length > 0) //Check if not empty
       {

         for (var i = 0; i < selectedorders.length; i++) {
          
          let itemindex = selectedorders[i].getAttribute('value');
           
          let item = this.orders[shopindex]['items'][itemindex];
         
          commanditems.push(item);
         
       }
       //A shop is displayed if it has at least one item (so we get the first one)
       let shopid = this.orders[shopindex]['items'][0]['idshop'];

       let data = {'commandshopper': this.logged.id, 'commandshop':shopid, 'items': commanditems};

       let toSend = JSON.stringify(data);
        
       let opt: RequestOptions;
       let myHeaders : Headers = new Headers;
       // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
       myHeaders.set('Accept', 'application/json; charset=utf-8');
       myHeaders.append('Content-type', 'application/json; charset=utf-8');
    
       opt = new RequestOptions({
         headers : myHeaders
       })   
     
         let link = 'http://192.168.43.120:8000/api/samashop/v1/newcommand';
       
         this.http.post(link, toSend, opt )
         .map(res =>res.json())
         .subscribe(data => {
          
            let toast = this.toast.create({
              message: 'Commande effectuée',
              duration: 3000
            });
            toast.present();
        
          },
        error => {

          let toast = this.toast.create({
            message: 'Veuillez réessayer svp !',
            duration: 3000
          });
          toast.present();

        });


      }
      else
      {
          let toast = this.toast.create({
            message: 'Aucun article selectioné',
            duration: 2000
          });
          toast.present();
      }

   }


   

  removeorder(order,$event)
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
  
      let link = 'http://192.168.43.120:8000/api/samashop/v1/removeorder/'+this.logged.id+'/'+order.id;
    
      this.http.get(link, opt )
      .map(res =>res.json())
      .subscribe(data => {
        if(data.ret !== null)
        {
          let toast = this.toast.create({
            message: 'Supprimé avec succés !',
            duration: 3000
          });
          toast.present();
          this.navCtrl.push(orderListPage);
          
        }
        else
        {
          let toast = this.toast.create({
            message: 'Une erreur s\'est produite !',
            duration: 3000
          });
          toast.present();
        }

      });

  }


  goprev()
  {
    this.navCtrl.pop();
  }


  ionViewDidLoad() {
 
    // this.scroller = document.querySelectorAll('.samascroll');
    
    // this.scroller = document.querySelector('.samascroll');
    // this.scroller.style.height = (this.windH - 160)+'px';
  }

  categSlideChanged()
  {

      // this.scroller = document.querySelector('.samascroll');
      // this.scroller.style.height = (this.windH - 160)+'px';
      // var currpos = this.slides._activeIndex;
      // if(currpos < this.categories.length)
      // {
      //    this.activeCategName = this.categories[currpos]['name'];
      // }
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

 


