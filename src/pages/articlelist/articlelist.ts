import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular'; 

import { showItemPage } from '../showitem/showitem';

import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'articlepage',
  templateUrl: 'articlelist.html'
})
export class articleListPage {
   
  articles:article[];
  windH : any;
  scroller : any;
  currentShopid:any;
  currentGenreid:any;
  currentShopname:any;
  currentGenrename:any;
  currentShopdata:any;
  rightH:any;

constructor(public http: Http, public navParams: NavParams, public navCtrl: NavController) {
    
    
    this.windH = window.innerHeight;
    // this.scroller = document.querySelector('.samascroll');
    
     this.rightH = (this.windH - 145)+'px';

     this.currentShopid = this.navParams.get('shopid'); 
     this.currentGenreid = this.navParams.get('genreid');
     this.currentShopdata = this.navParams.get('shopdata');


        let link = 'http://192.168.43.120:8000/api/samashop/v1/getgenrearticles/'+this.currentShopid+'/'+this.currentGenreid;
         
        let opt: RequestOptions;
        let myHeaders : Headers = new Headers;
        // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
        myHeaders.set('Accept', 'application/json; charset=utf-8');
        myHeaders.append('Content-type', 'application/json; charset=utf-8');
      
        opt = new RequestOptions({
          headers : myHeaders
        })               

        this.http.get(link,opt)
        .map(res =>res.json())
        .subscribe(data => {
              
            this.currentShopname = data['shopname']; 
            this.currentGenrename = data['genrename']; 

            this.articles = data['articles']; 

            if(this.articles.length === 0)
             {
                
             }

        });
      
 




  

    
}

goprev()
{
  this.navCtrl.pop();
}

seeart(art)
{
 
  console.log(this.currentShopdata);

  this.navCtrl.push(showItemPage, {item:art, data:this.currentShopdata});
   
}


ionViewDidLoad() {
  
   
    this.scroller = document.querySelector('.samascrollart');
    // console.log(this.scroller);
    this.scroller.style.height = (this.windH - 160)+'px';
   
    
}

categSlideChanged()
{
 
}


}
 

interface article {
 
 id: number,
 name: string,
 price:any

}



