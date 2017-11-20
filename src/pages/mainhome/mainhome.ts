import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController , NavParams, ModalController,} from 'ionic-angular'; 

import { loginPage } from '../login/login';
import { signupPage } from '../signup/signup';
// import { cropPopPage } from '../croppop/croppop';

// import  * as f  from 'jqlite/jqlite';


import {RestServiceProvider} from '../../providers/rest-service/rest-service';


@Component({
  selector: 'mainhome',
  templateUrl: 'mainhome.html',
  providers : [RestServiceProvider]
})
export class mainHomePage {

    splash = true;
    loginrout = loginPage;
    signuprout = signupPage;
    
    windH : any;
    scroller : any;

  constructor(public navParams:NavParams,public http:Http, public modCtrl: ModalController,public navCtrl: NavController, public rest : RestServiceProvider) {
      
      this.splash = this.navParams.get('splash');
      
      if(this.splash === undefined)
      {
          this.splash = true;
      }

      this.windH = window.innerHeight;
      this.scroller = document.querySelector('.bloc_maincontainer');

      // this.rest.load()
      // .then(data => {
      //   console.log(data)
      // })

   
       
     
  }
  ngOnInit()
  {
          
      this.windH = window.innerHeight;
    
      this.scroller = document.querySelector('.bloc_maincontainer');
    //    console.log(this.scroller);
      this.scroller.style.height = (this.windH - 0)+'px';
      this.scroller.setAttribute('work', 'yes');

    
  }

//   background-image: url('../assets/mainback.png'); background-size: cover; 

  ionViewDidLoad() {
    
      this.windH = window.innerHeight;
    
      this.scroller = document.querySelector('.bloc_maincontainer');
       // console.log(this.scroller);
      this.scroller.style.height = (this.windH - 0)+'px';
      this.scroller.setAttribute('work', 'yes');
      
      
     

      let wait = setTimeout(() => {
          this.splash = false;
          clearInterval(wait);
      }, 5000);
 


        // /////////////////Instanciating canvs ///////////////////
        // // console.log(f);
        // let canvas =  new f.fabric.Canvas('c'); 

        // let rect = new f.fabric.Rect({top:5, left:10, width:80, height:45, fill:'red'});

        // canvas.add(rect);
        // canvas.setActiveObject(canvas.item(0));
        // canvas.renderAll();




  }

  vidit($event)
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

     var file = $event.target.files[0];

     getBase64(file, function(res){

         console.log(res);

     });
}

  // tocrop()
  // {
  //    let modal = this.modCtrl.create(cropPopPage);
  //    modal.present();
  // }
 

}
 