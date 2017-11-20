import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular'; 
// import { samaHeaderPage } from '../samaheader/samaheader';
// import { templateViewPage } from '../templateview/templateview';
 
@Component({
  selector: 'shophome',
  templateUrl: 'shophome.html'
})
export class shopHomePage {
    
  // shoplistrout = shopListPage;
 
  isShowMode: boolean;    
  isEditMode: boolean;    
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.isShowMode = this.navParams.get('isShowMode');
    this.isEditMode = this.navParams.get('isEditMode');
    // templateViewPage.apply({isShowMode:this.isShowMode,isEditMode:this.isEditMode,});

  }
  

  ionViewDidLoad() {



  }

}



