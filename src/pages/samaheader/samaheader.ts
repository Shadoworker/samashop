import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
// import { TestPage } from '../test/test';
import { orderListPage } from '../orderlist/orderlist';
import { shoporderListPage } from '../shoporderlist/shoporderlist';
import { favListPage } from '../favlist/favlist';
import { comptePage } from '../compte/compte';
import { HomePage } from '../home/home';
import { mainHomePage } from '../mainhome/mainhome';

import {RestServiceProvider} from '../../providers/rest-service/rest-service';


@Component({
  selector: 'samaheader',
  templateUrl: 'samaheader.html'
})
export class samaHeaderPage {
   
   accountrout = comptePage; 
   mode:boolean = false;
   logged:any;

  displaypopmenu : any;
  popmenu : any;
  constructor(public navCtrl: NavController, public rest: RestServiceProvider) {
    this.displaypopmenu = false;
    this.mode = this.rest.getMode(); 
    this.logged = this.rest.getShared();
  }

  togglePopMenu()
  {
    // var element;
    var i;
    if(this.displaypopmenu)
    {
      this.displaypopmenu = false;
      this.popmenu = document.querySelectorAll('.popmenu');
      for (i = 0; i < this.popmenu.length; i++) {

          this.popmenu[i].style.display = 'none';
        
      }
      // this.popmenu;
    }
    else{
      this.displaypopmenu = true;
      this.popmenu = document.querySelectorAll('.popmenu');
      for (i = 0; i < this.popmenu.length; i++) {
        
            this.popmenu[i].style.display = 'block';
                
         }
    }
  }

  gotomain()
  {
    this.navCtrl.push(HomePage, {'Samashopper':this.logged})
  }

  ionViewDidLoad() {

    this.popmenu = document.querySelectorAll('.popmenu');
    for (var i = 0; i < this.popmenu.length; i++) {
      
           this.popmenu[i].style.display = 'none';
              
       } 

  }

  logout()
  {
    this.navCtrl.push(mainHomePage,{'splash':false});
  }


gotomyorders()
{

   this.navCtrl.push(orderListPage);

}

gotofavs()
{

   this.navCtrl.push(favListPage);

}


shoporders()
{

   this.navCtrl.push(shoporderListPage);

}

}



