import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular'; 

// import { samaHeaderPage } from '../samaheader/samaheader';
import {comptePage } from '../compte/compte';


@Component({
  selector: 'addedititem',
  templateUrl: 'addedititem.html'
})
export class addEditItemPage {
  
  nC : NavController;

  @ViewChild(Slides) slides : Slides;
  okicon :any;
  constructor(public navCtrl: NavController) {


   

  }
  
  terminer()
  {

    this.navCtrl.push(comptePage, {
      created : true });
  }

  templateSlideChanged()
  {

      this.okicon = document.querySelector('.okicon');
      // this.okicon.style.transform = 'scale(0.5)';
      // var waittrans = setInterval(function(){

      //   // this.okicon.style.transform = 'scale(2)';
      //   clearInterval(waittrans);
      // },1000);
      // var currpos = this.slides._activeIndex;
      
  }




}



