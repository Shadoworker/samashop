import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

// import { samaHeaderPage } from '../samaheader/samaheader';
// import { articleListPage } from '../articlelist/articlelist';
import { orderItemsPage } from '../orderitems/orderitems';
import { templateViewPage } from '../templateview/templateview';

import {RestServiceProvider} from '../../providers/rest-service/rest-service';


@Component({
  selector: 'shoporderlist',
  templateUrl: 'shoporderlist.html'
})
export class shoporderListPage {

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
    shopid:any;
    displayedtext:any = '';
    notempty:boolean = true;
    commands:any;
    showarchivebtn:boolean = false;
    showarchvs:boolean = false;
    showrecents:boolean = true;
    hasntShop:boolean = false;
    hasShop:boolean = true;
    effectuees:any;
    recues:any;
    archvs:any;

    commandtypes:string[] = ['effectuées', 'reçues'];
    commandtype:string;

  constructor(public alert:AlertController, public toast:ToastController, public navCtrl: NavController, public navParams: NavParams, public http:Http, public rest: RestServiceProvider) {
      
      
      this.windH = window.innerHeight;
      this.logged = this.rest.getShared();
      // this.categid = this.navParams.get('categid');
       

      this.commandtype = this.commandtypes[0];


      let opt: RequestOptions;
      let myHeaders : Headers = new Headers;
      // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
      myHeaders.set('Accept', 'application/json; charset=utf-8');
      myHeaders.append('Content-type', 'application/json; charset=utf-8');
   
      opt = new RequestOptions({
        headers : myHeaders
      })   
    

     
    
        let link = 'http://192.168.43.120:8000/api/samashop/v1/getcommandes/'+this.logged.id;
        // console.log(link);
 
        this.http.get(link, opt )
        .map(res =>res.json())
        .subscribe(data => {
         
         if(data !== null)
          {
            this.commands = data.commands;
            this.effectuees = this.commands['effectuees'];
            this.recues = this.commands['recues'];
            this.archvs = this.commands['arch'];
            
            if(this.recues === 'undefined' || this.recues === undefined)
             { 
              this.hasntShop = true;
              this.hasShop = false;
              this.showrecents = false;
              this.showarchivebtn = false;
             }

          }
       });
 

  }

 goprev()
 {

   this.navCtrl.pop();

 }

 togglearchvs()
 {
   this.showarchvs = !this.showarchvs;

   if(this.commandtype === 'archivées')
    {
      this.commandtype = 'reçues';
    }
    else
    {
      this.commandtype = 'archivées';
    }

    this.showrecents = !this.showrecents;
 }


 see_command(commande)
 {
    
    this.navCtrl.push(orderItemsPage, {'command':commande});

 }


remove_eff(eff, $event)
 {
    $event.stopPropagation();

    let confirm = this.alert.create({
      title: 'SUPPRESSION',
      message: 'Voulez-vous vraiment supprimer cette commande ?',
      buttons: [
        {
          text: 'ANNULER',
          handler: () => {

          }
        },
        {
          text: 'CONFIRMER',
          handler: () => {


            let opt: RequestOptions;
            let myHeaders : Headers = new Headers;
            // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
            myHeaders.set('Accept', 'application/json; charset=utf-8');
            myHeaders.append('Content-type', 'application/json; charset=utf-8');
         
            opt = new RequestOptions({
              headers : myHeaders
            })   
             
            let data = {'commandId' : eff['id']};
        
            let toSend = JSON.stringify(data);
              
            let link = 'http://192.168.43.120:8000/api/samashop/v1/remove_eff';
            
            this.http.post(link,toSend, opt )
            .map(res =>res.json())
            .subscribe(data => {
                
                let toast = this.toast.create({
                  message: ' Supprimé !',
                  duration: 3000
                });
                toast.present();
      
                this.navCtrl.push(shoporderListPage);
            },
              error => {
      
                let toast = this.toast.create({
                  message: 'Veuillez réessayer svp !',
                  duration: 3000
                });
                toast.present();
          });
        

             
          }
        }
      ]
    });
    confirm.present();
 }


 remove_rec(rec, $event)
 {

    $event.stopPropagation();


    let confirm = this.alert.create({
      title: 'SUPPRESSION',
      message: 'Voulez-vous vraiment ne plus voir cette commande ?',
      buttons: [
        {
          text: 'NON',
          handler: () => {

          }
        },
        {
          text: 'OUI',
          handler: () => {


            let opt: RequestOptions;
            let myHeaders : Headers = new Headers;
            // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
            myHeaders.set('Accept', 'application/json; charset=utf-8');
            myHeaders.append('Content-type', 'application/json; charset=utf-8');
         
            opt = new RequestOptions({
              headers : myHeaders
            })   
             
            let data = {'commandId' : rec['id']};
        
            let toSend = JSON.stringify(data);
              
            let link = 'http://192.168.43.120:8000/api/samashop/v1/remove_rec';
            
            this.http.post(link,toSend, opt )
            .map(res =>res.json())
            .subscribe(data => {
                
                let toast = this.toast.create({
                  message: ' Supprimé !',
                  duration: 3000
                });
                toast.present();
      
                this.navCtrl.push(shoporderListPage);
            },
              error => {
      
                let toast = this.toast.create({
                  message: 'Veuillez réessayer svp !',
                  duration: 3000
                });
                toast.present();
          });
        

             
          }
        }
      ]
    });
    confirm.present();
 }


 archivate(rec, $event)
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
     
    let data = {'commandId' : rec.id};

    let toSend = JSON.stringify(data);
      
      let link = 'http://192.168.43.120:8000/api/samashop/v1/archivate';
    
      this.http.post(link,toSend, opt )
      .map(res =>res.json())
      .subscribe(data => {
         
          let toast = this.toast.create({
            message: 'Archivé !',
            duration: 3000
          });
          toast.present();

          this.navCtrl.push(shoporderListPage);

      },
        error => {

          let toast = this.toast.create({
            message: 'Veuillez réessayer svp !',
            duration: 3000
          });
          toast.present();
    });

  }

  ionViewDidLoad() {
 
    // this.scroller = document.querySelectorAll('.samascroll');
    console.log('loaded');

    this.scroller = document.querySelector('.samascroll');
    this.scroller.style.height = (this.windH - 160)+'px';
  }

  ionViewWillEnter()
  {

      this.logged = this.rest.getShared();
      // this.categid = this.navParams.get('categid');
       

      this.commandtype = this.commandtypes[0];


      let opt: RequestOptions;
      let myHeaders : Headers = new Headers;
      // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
      myHeaders.set('Accept', 'application/json; charset=utf-8');
      myHeaders.append('Content-type', 'application/json; charset=utf-8');
   
      opt = new RequestOptions({
        headers : myHeaders
      })   
    

     
    
        let link = 'http://192.168.43.120:8000/api/samashop/v1/getcommandes/'+this.logged.id;
        // console.log(link);
 
        this.http.get(link, opt )
        .map(res =>res.json())
        .subscribe(data => {
         
         if(data !== null)
          {
            this.commands = data.commands;
            this.effectuees = this.commands['effectuees'];
            this.recues = this.commands['recues'];
            this.archvs = this.commands['arch'];
            
            if(this.recues === 'undefined' || this.recues === undefined)
             { 
              this.hasntShop = true;
              this.hasShop = false;
              this.showrecents = false;
              this.showarchivebtn = false;
             }

          }
       });

  }

  categSlideChanged()
  {

      this.scroller = document.querySelector('.samascroll');
      // this.scroller.style.height = (this.windH - 160)+'px';
      var currpos = this.slides._activeIndex;
      if(currpos < 2)
      { 
        this.commandtype = this.commandtypes[currpos];
       if(this.hasShop)
        {
           if(currpos === 1)
          { 
            this.showarchivebtn = true;
            if(this.showarchvs === true)
             {
               this.commandtype = 'archivées';
             }
          }
          else
          {
            this.showarchivebtn = false;
          }
        }
       
      }
  }

 call($event)
  {
    $event.stopPropagation();
    //Just to avoid 'undefined function error'
    let action = 'perform fictive action';
    console.log(action);
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

 


