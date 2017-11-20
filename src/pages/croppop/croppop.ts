import { Component } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular'; 
import { Http, Headers, RequestOptions } from '@angular/http';

// import { mainHomePage } from '../mainhome/mainhome';
// import { HomePage } from '../home/home';
import {RestServiceProvider} from '../../providers/rest-service/rest-service';

// import  * as f  from 'jqlite/jqlite';
// import  * as $  from 'jquery/jquery';


@Component({
  selector: 'croppop',
  templateUrl: 'croppop.html'
})
export class cropPopPage {

    
     canvCont: HTMLElement;
     samaId : any;
     code:any;
     rightH:any;
     top:any;
     topi:any;
     left:any;
     lefti:any;
     cropper:any;
     canvas:any;
     isLong:boolean = false;
     initialsrc:string;

  constructor(public rest: RestServiceProvider ,public http:Http ,public navCtrl: NavController,public navParams: NavParams ) {
       
          //  console.log(this.samaId);
           this.topi = 0;
           this.lefti = 0;
           this.top = 0;
           this.left = 0;
           this.isLong = this.navParams.get('islong');

  }
   
//   ionViewWillEnter()
//    {
//        this.initialsrc = this.navParams.get('initialsrc');

//        let windH = window.innerHeight;
//        let windW = window.innerWidth; 

//        windH = windH - 0;

       

//         /////////////////Instanciating canvs ///////////////////
        
//         this.canvas =  new f.fabric.Canvas('c'); 
//         this.canvas.setBackgroundColor('#f2f2f2');
//         this.canvas.setWidth(340);
//         this.canvas.setHeight(windH);
//         let self = this;

        

//          let croppy = new f.fabric.Image.fromURL(this.initialsrc,
//           function(img) {
             
//                img.set({
//                 left: 0,
//                 top: 0,
//                 selectable:true,
//                 hasControls :false
//               });
              
//               let scaleX = windW / img.getBoundingRectWidth();
//               // console.log(scaleX);
//               img.scaleX = scaleX;
//               img.scaleY = scaleX;
//               img.top = (windH - (img.getBoundingRectHeight() * scaleX))/2 ;
//               img.left = (windW - (img.getBoundingRectWidth() * scaleX))/2;


 
//               var croprectW = 260;
//               var croprectH = 170;
//               if(self.isLong)
//               {
//                 croprectW = 160;
//                 croprectH = 310;
//               }

//               self.canvas.add(img);
//               var rect = new f.fabric.Rect({width:croprectW, height:croprectH, top:(windH- croprectH )/2, left:(windW- croprectW)/2, fill:'#fff', opacity:0.4,stroke:'#00ccff', selectable:false, evented:false});
              
//                self.canvas.add(rect);
//                // self.canvas.renderAll();

//                // self.canvas.bringToFront(self.canvas.item(1));
//                self.canvas.renderAll.bind(self.canvas);
//               // self.canvas.renderAll();

//               // let data = img.toDataURL({

//               //      format: 'png',
//               //      quality: 1,
//               //      left: 20,
//               //      top: 40,
//               //      width:150,
//               //      height:108

//               // });

//               // console.log(data);

//           }

//         );
 

    
   

// }

 //  reset()
 //  { 
 //    var self = this;
 //    self.ionViewWillEnter();
 //  }

 // zoomOut()
 //  {
 //    let currentScale = this.canvas.item(0).scaleX;
 //    // console.log(currentScale);
   
 //    if(currentScale >= 0.0)
 //     {  
 //        this.canvas.item(0).scaleX = (currentScale - 0.0500);
 //        this.canvas.item(0).scaleY = (currentScale - 0.0500);
 //        this.canvas.renderAll();

 //     }

 //  }

 // zoomIn()
 //  {
 //    let currentScale = this.canvas.item(0).scaleX;
 //    // console.log(currentScale);
   
 //    if(currentScale <= 4.0)
 //     {  
 //        this.canvas.item(0).scaleX = (currentScale + 0.0500);
 //        this.canvas.item(0).scaleY = (currentScale + 0.0500);
 //        this.canvas.renderAll();
        

 //     }

 //  }



 // crop($event)
 //  {
 //       // this.canvas.item(1) means the cropRect element
 //       var croppertop = this.canvas.item(1).top;
 //       var cropperleft = this.canvas.item(1).left;
 //       var cropperwidth = this.canvas.item(1).width;
 //       var cropperheight = this.canvas.item(1).height;

 //       // this.canvas.item(0) means the img element
 //       var imgleft = this.canvas.item(0).left;
 //       var imgtop = this.canvas.item(0).top;
       
 //       // this.canvas.remove(this.canvas.item(1));
 //       // this.canvas.renderAll();


 //       let cropped = this.canvas.item(0).toDataURL({

 //          format : 'png',
 //          left   :cropperleft - imgleft,
 //          top    :croppertop - imgtop,
 //          width  :cropperwidth,
 //          height :cropperheight

 //       });

 //       // console.log(cropped);

 //       this.rest.setCropped(cropped);

 //       this.navCtrl.pop();
        

 //  }
 




}

 