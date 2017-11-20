import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams, ToastController } from 'ionic-angular'; 
import { Http, Headers, RequestOptions } from '@angular/http';

// import { templateViewPage } from '../templateview/templateview';
import {RestServiceProvider} from '../../providers/rest-service/rest-service';


@Component({
  selector: 'showitem',
  templateUrl: 'showitem.html'
})
export class showItemPage {
  
  nC : NavController;
  item:any;
  logged:any;
  data:any; 

  @ViewChild(Slides) slides : Slides;
  okicon :any;
  constructor(public http: Http, public rest:RestServiceProvider, public toast:ToastController, public navCtrl: NavController, public navParams: NavParams) {

      this.logged = this.rest.getShared();


      this.item = this.navParams.get('item');
      this.data = this.navParams.get('data');
     

      if(this.item['image'] === '')
      {
        this.item['image'] = '../assets/preview_default.png';
      }

  }
  
 goback()
 {
   // this.navCtrl.push(templateViewPage,{isShowMode:'show', data:this.data});
   this.navCtrl.pop();
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


  addtocard(item)
  {
    
    let opt: RequestOptions;
    let myHeaders : Headers = new Headers;
    // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');
 
    opt = new RequestOptions({
      headers : myHeaders
    })   
  
      let link = 'http://192.168.43.120:8000/api/samashop/v1/neworder/'+this.logged.id+'/'+this.item.shopid+'/'+this.item.id+'/'+this.item.type;
    
      this.http.get(link, opt)
      .map(res =>res.json())
      .subscribe(data => {
        if(data.ret !== null)
        {
          let toast = this.toast.create({
            message: 'Ajouté au panier !',
            duration: 3000
          });
          toast.present();
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

}



