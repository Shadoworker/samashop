import { Component} from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

// import { TestPage } from '../test/test';
import { searchListPage } from '../searchlist/searchlist';
import { templateViewPage } from '../templateview/templateview';

import { shopListPage } from '../shoplist/shoplist';

import {RestServiceProvider} from '../../providers/rest-service/rest-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   
  // testroot = TestPage;
  shoplistrout = shopListPage;
  logged : any;

  categories:any[];
  unes : any;

  

  searchQuery: string = '';
  tags: string[];
  items:any;

  constructor(public toast: ToastController, public http: Http, public navCtrl: NavController, public navParams: NavParams, public rest : RestServiceProvider) {
     this.logged = this.navParams.get('Samashopper');
     rest.shareDataf(this.logged);

   this.categories = [

    {id:1, name:'VETEMENTS', icon: 'icon'},
    {id:2, name:'SPORTS', icon: 'icon'},
    {id:3, name:'ELECTRONIQUE', icon: 'icon'},
    {id:4, name:'PERMACULTURE', icon: 'icon'},
    {id:5, name:'UTILITAIRES', icon: 'icon'},
    {id:6, name:'EDUCATION', icon: 'icon'},
    {id:7, name:'LOISIRS', icon: 'icon'},
    {id:8, name:'ENERGIE', icon: 'icon'},
    {id:9, name:'AUTRES', icon: 'icon'}
     //,// {id:10, name:'categ10', icon: 'icon'},
    // {id:11, name:'categ11', icon: 'icon'},
    // {id:12, name:'categ12', icon: 'icon'}
   ]


      let opt: RequestOptions;
      let myHeaders : Headers = new Headers;
      // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
      myHeaders.set('Accept', 'application/json; charset=utf-8');
      myHeaders.append('Content-type', 'application/json; charset=utf-8');
   
      opt = new RequestOptions({
        headers : myHeaders
      })   
  
        /////////GETTING TAGS ////////
    
        let link = 'http://192.168.43.120:8000/api/samashop/v1/gettags';
      
        this.http.get(link, opt )
        .map(res =>res.json())
        .subscribe(data => {
          this.items = data.tags; 
        });

       /////////GETTING UNES ////////

        link = 'http://192.168.43.120:8000/api/samashop/v1/unes';
      
        this.http.get(link, opt )
        .map(res =>res.json())
        .subscribe(data => {
          this.unes = data.unes; 
          for (var i = 0; i < this.unes.length; i++)
           {
            this.unes[i]['cover'] = 'url("'+this.unes[i]['cover']+'")';
           }
        });    


       this.searchQuery = '';





  }

  initializeItems() {
    this.tags = this.items;
  }
  
  getItems($event)
  {

      // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = $event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.tags = this.tags.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
   }

  updateQuery(item)
  {

     this.searchQuery = item;

  }

  getitems()
  {
    if(this.searchQuery.trim() !=="")
    {
      this.navCtrl.push(searchListPage, {tag:this.searchQuery});
    }
    else
    {
        let toast = this.toast.create({
          message: '( ! )',
          duration: 1500
        });
        toast.present();
    }

  }
   
  
  gotoshop(shop)
  {
      let data = [{"neant":0},{'shop' : {'id': shop.id}}];
     
       
      this.navCtrl.push(templateViewPage, {
            isShowMode : 'show',
            data: data

      })
  }


  ionViewDidLoad() {



  }

  getcategshop(categ)
  {
     this.navCtrl.push(shopListPage, {categid:categ});
  }
 



}



