import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
 
import {RestServiceProvider} from '../../providers/rest-service/rest-service';

import { articleListPage } from '../articlelist/articlelist';


@Component({
  selector: 'genremenu',
  templateUrl: 'genremenu.html',
})
export class genreMenuPage {


  currentShopid:any;
  currentShopname:any;
  shopgenres:any;
  notEmpty:boolean=true;
  empty:boolean=false;
  currentShopdata:any;

  constructor(public http: Http, public rest: RestServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  

        this.currentShopid = this.navParams.get('shopid');
        this.currentShopdata = this.navParams.get('shopdata');
        
        console.log(this.currentShopdata);

        let link = 'http://192.168.43.120:8000/api/samashop/v1/getshopgenres/'+this.currentShopid;
         
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
            
            this.shopgenres = data['genres']; 

            if(this.shopgenres.length === 0)
             {
             	this.notEmpty = false;
             	this.empty = true;
             }

        });
      




  }


  getGenreItems(genreId)
	{
       
       this.navCtrl.push(articleListPage,{shopid:this.currentShopid,genreid:genreId, shopdata:this.currentShopdata});

	}


  ionViewDidLoad() {

  }

}
