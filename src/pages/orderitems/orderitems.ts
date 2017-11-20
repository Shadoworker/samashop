import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http} from '@angular/http';

// import { samaHeaderPage } from '../samaheader/samaheader';
// import { articleListPage } from '../articlelist/articlelist';
// import { shopHomePage } from '../shophome/shophome'; 

import {RestServiceProvider} from '../../providers/rest-service/rest-service';

@Component({
  selector: 'orderitems',
  templateUrl: 'orderitems.html'
})
export class orderItemsPage {

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
    command:any;
    commandref:any;
    commanditems:any;
    totalprice:any = 0;

  constructor(public alert:AlertController, public toast:ToastController, public navCtrl: NavController, public navParams: NavParams, public http:Http, public rest: RestServiceProvider) {
      
      
      this.windH = window.innerHeight;
      this.logged = this.rest.getShared();
      this.command = this.navParams.get('command');
      this.commandref = this.command['commandref'];
      this.commanditems = this.command['items'];

      for (var i = 0; i < this.commanditems.length; i++) {
       
        this.totalprice += this.commanditems[i]['command_item_price'];
        
      }

      

 
  }

 goprev()
 {
  this.navCtrl.pop();
 }
 
  ionViewWillEnter() {
 
    this.windH = window.innerHeight;
     
    this.rightH = (this.windH - 145)+'px';
  }

  

}

 


