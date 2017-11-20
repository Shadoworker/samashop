import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ToastController, LoadingController  } from 'ionic-angular'; 
import { Http, Headers, RequestOptions } from '@angular/http';

import { showItemPage } from '../showitem/showitem';
import { editItemPage } from '../edititem/edititem';
 
import { genreMenuPage } from '../genremenu/genremenu';

import {RestServiceProvider} from '../../providers/rest-service/rest-service';


@Component({
  selector: 'templateview',
  templateUrl: 'templateview.html'
})
export class templateViewPage {
    
  // shoplistrout = shopListPage;
  displaypopmenu : any;
  popmenu : any;
  isShowMode: any;  
  logged:any;

  finished:boolean = false; //Check if page has been fully loaded
  
  shopname:any;
  shoplogo:any;

  topslides :any[];
  collection :any[];
  articles :any[];
  suggests : any[];
  adv :any;
  


  suggest1 : any[];
  suggest2 : any[];
  suggest3 : any[];
   
  suggestH:any;
  
  isEditMode : boolean;
  theshopid:any[];
  tops: any[];

  shopid:any;

  data: any[];

  constructor(public toast: ToastController, public loadingCtrl: LoadingController, public rest: RestServiceProvider,public pop: PopoverController, public navCtrl: NavController, public navParams: NavParams, public http:Http ) {
    

    // this.logged = this.rest.getLogged();
    // this.displaypopmenu = false;
    // this.isShowMode = this.navParams.get('isShowMode');
    // this.data = this.navParams.get('data');
    
    // this.shopid = this.data['1']['shop']['id'];


    // this.rest.setShopid(this.data['1']['shop']['id']);
 

    // if(this.isShowMode==="show")
    // {
    //   this.isEditMode = false;
    // }
    // else
    // {
    //   this.isEditMode = true;
    // }

  

   // ////////////// LOADING //////////////////

   //    let loader = this.loadingCtrl.create({
   //      content: "Chargement..." //Did write 'Chragement...'
   //    });
   //    loader.present();



   // //////////////////////////////////////////
     

   //  let opt: RequestOptions;
   //  let myHeaders : Headers = new Headers;
   //  // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
   //  myHeaders.set('Accept', 'application/json; charset=utf-8');
   //  myHeaders.append('Content-type', 'application/json; charset=utf-8');
 
   //  opt = new RequestOptions({
   //    headers : myHeaders
   //  })   
  
   //    let link = 'http://192.168.43.120:8000/api/samashop/v1/shopitems/'+this.data['1']['shop']['id'];
   //    console.log(link);

   //    let topslides = [];
   //    let collection = [];
   //    let suggest1 = [];
   //    let suggest2 = [];
   //    let suggest3 = [];
   //    let articles = [];
   //    let adv = [];
   //    let globalshopid = [{"ref":0}];
 
   //    console.log(globalshopid[0]['ref']);

   //    this.http.get(link, opt )
   //    .map(res =>res.json())
   //    .subscribe(data => {
   //      console.log(data);
   //      this.shopname = data['shopname'];
   //      this.shoplogo = data['shoplogo'];

   //      var i;var element, id, shopid, image, title, desc, price, genre;
   //      //Topslides
   //      for (i = 0; i < data['slides'].length; i++)
   //       {
           
   //         element = data['slides'][i];
   //          image = element["image"];
           
   //         if(image === "" || image === "default")
   //          {
   //             image = '../assets/default1.png';
   //          }
   //          else
   //          {
   //            image = decodeURIComponent(image)
   //          }

   //          id = element["id"];
   //          title=element["nom"];
   //          desc=element["desc"];
   //          price=element["price"];
   //          shopid=element["idshop"];

   //         topslides.push({id:id, type:"slide", shopid:shopid, image:image,  title:title, desc:desc, price:price});
   //        //  self.theshopid.push({'id': shopid}) = shopid;
          
   //       }

   //       for (i = 0; i < data['collection'].length; i++)
   //       {
           
   //          element = data['collection'][i];
   //          image = element["image"];
           
   //         if(image === "" || image === "default")
   //          {
   //             image = '../assets/default2.png';
   //          }
   //          else
   //          {
   //            image = decodeURIComponent(image)
   //          }

   //          id = element["id"];
   //          title = element["nom"];
   //          desc = element["desc"];
   //          price = element["price"];
   //          shopid = element["idshop"];

   //          collection.push({id:id, type:"collection", shopid:shopid, image:image,  title:title, desc:desc, price:price});

          
   //       } 
     
   //       for (i = 0; i < data['articles'].length; i++)
   //       {
           
   //         element = data['articles'][i];
   //          image = element["image"];
           
   //         if(image === "" || image === "default")
   //          {
   //             image = '../assets/default3.png';
   //          }
   //          else
   //          {
   //            image = decodeURIComponent(image)
   //          }
   //          id = element["id"];
   //          title=element["nom"];
   //          desc=element["desc"];
   //          genre=element["genre"];
   //          price=element["price"];
   //          shopid=element["idshop"];

   //         articles.push({id:id, type:"article", shopid:shopid, image:image,  title:title, genre:genre, desc:desc, price:price});

          
   //       }    
         
   //       for (i = 0; i < data['suggests'].length; i++)
   //       {
           
   //          element = data['suggests'][i];
   //          image = element["image"];
           
   //         if(image === "" || image === "default")
   //          {
   //             image = '../assets/default3.png';
   //          } 
   //          else
   //          {
   //            image = decodeURIComponent(image)
   //          }

   //          id = element["id"];
   //          title=element["nom"];
   //          desc=element["desc"]; 
   //          price=element["price"];
   //          shopid=element["idshop"];

   //         if(i === 0)
   //         {
   //          suggest1.push({id:id, type:"suggestion", shopid:shopid, image:image,  title:title, desc:desc, price:price});
   //         }
   //         if(i === 1)
   //         {
   //          suggest2.push({id:id, type:"suggestion", shopid:shopid, image:image,  title:title, desc:desc, price:price});
   //         }
   //         if(i === 2)
   //         {
   //          suggest3.push({id:id, type:"suggestion", shopid:shopid, image:image,  title:title, desc:desc, price:price});
   //         }

   //        //  suggests.push({id:id, shopid:shopid, image:image,  title:title, desc:desc, price:price});

          
   //       }    


   //       for (i = 0; i < data['adv'].length; i++)
   //       {
           
   //         element = data['adv'][i];
   //          image = element["image"];
           
   //         if(image === "" || image === "default")
   //          {
   //             image = '../assets/adv.png';
   //          }
   //          else
   //          {
   //            image = decodeURIComponent(image)
   //          }

   //          id = element["id"];
   //          shopid=element["idshop"];

   //         adv.push({id:id, type:"adv", shopid:shopid, image:image});

          
   //       } 


   //        this.finished = true;

   //         // if (this.finished === true)
   //         // {
   //           let delay = setInterval(function(){

   //              loader.dismiss();
   //              clearInterval(delay);

   //           },3000)
   //         // }
         
     
   //      })
 
 
   // this.topslides = topslides;
   // this.collection = collection;
   // this.articles = articles;
   // this.adv = adv;
   // this.suggest1 = suggest1;
   // this.suggest2 = suggest2;
   // this.suggest3 = suggest3;
   
   // // console.log(this.data['1']['shop']['id']);
   
  
   
  }
  
 seeoredit(item)
 {
   
   if(this.isShowMode==="show")
   {
     this.navCtrl.push(showItemPage, {item:item, data:this.data});
   }
   if(this.isShowMode==="edit")
   { 
     this.navCtrl.push(editItemPage, {item:item,genres: this.data['genres']});
   }
 
 }

 seeoredit_long(item) //In order to set the croprect size 
 {
   
   if(this.isShowMode==="show")
   {
     this.navCtrl.push(showItemPage, {item:item,data:this.data});
   }
   if(this.isShowMode==="edit")
   { 
     this.navCtrl.push(editItemPage, {item:item,islong:true,genres: this.data['genres']});
   }
 
 }

   
  addtocard($event,item)
  {
    
    $event.stopPropagation();

    let opt: RequestOptions;
    let myHeaders : Headers = new Headers;
    // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');
 
    opt = new RequestOptions({
      headers : myHeaders
    })   
  
      let link = 'http://192.168.43.120:8000/api/samashop/v1/neworder/'+this.logged.id+'/'+item.shopid+'/'+item.id+'/'+item.type;
    
      this.http.get(link, opt)
      .map(res =>res.json())
      .subscribe(data => {
        if(data.ret !== null)
        {
          let toast = this.toast.create({
            message: 'Ajouté au panier !',
            duration: 2500
          });
          toast.present();
        }
        else
        {
          let toast = this.toast.create({
            message: 'Veuillez réessayer svp !',
            duration: 2000
          });
          toast.present();
        }

      });
    
  }



 newart()
 {
  
   let item = {id:null,type:'article', idshop:this.data['1']['shop']['id'],nom:'default',desc:'default',image:'',genre:'null',price:0};
   this.navCtrl.push(editItemPage, {item:item ,genres: this.data['genres']});
 
  }


  newcollect()
  {
   
    let item = {id:null,type:'collection', idshop:this.data['1']['shop']['id'],nom:'default',desc:'default',image:'',genre:null,price:0};
    this.navCtrl.push(editItemPage, {item:item});
  
   }
 

  togglePopMenu2($event)
  { 
     console.log(this.data);

     let pop = this.pop.create(genreMenuPage,{shopid : this.data['1']['shop']['id'], shopdata: this.data});
     pop.present({ev : $event});
  }

  ngOnInit()
  { 

  }

  ionViewWillEnter()
  {


    this.logged = this.rest.getLogged();
    this.displaypopmenu = false;
    this.isShowMode = this.navParams.get('isShowMode');
    this.data = this.navParams.get('data');
    
    this.shopid = this.data['1']['shop']['id'];


    this.rest.setShopid(this.data['1']['shop']['id']);
 

    if(this.isShowMode==="show")
    {
      this.isEditMode = false;
    }
    else
    {
      this.isEditMode = true;
    }

  

   ////////////// LOADING //////////////////

      let loader = this.loadingCtrl.create({
        content: "Chargement..." //Did write 'Chragement...'
      });
      loader.present();



   //////////////////////////////////////////
     

    let opt: RequestOptions;
    let myHeaders : Headers = new Headers;
    // myHeaders.set('Origin', 'Access-Control-Allow-Origin');
    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');
 
    opt = new RequestOptions({
      headers : myHeaders
    })   
  
      let link = 'http://192.168.43.120:8000/api/samashop/v1/shopitems/'+this.data['1']['shop']['id'];
      console.log(link);

      let topslides = [];
      let collection = [];
      let suggest1 = [];
      let suggest2 = [];
      let suggest3 = [];
      let articles = [];
      let adv = [];
      let globalshopid = [{"ref":0}];
 
      console.log(globalshopid[0]['ref']);

      this.http.get(link, opt )
      .map(res =>res.json())
      .subscribe(data => {
        console.log(data);
        this.shopname = data['shopname'];
        this.shoplogo = data['shoplogo'];

        var i;var element, id, shopid, image, title, desc, price, genre;
        //Topslides
        for (i = 0; i < data['slides'].length; i++)
         {
           
           element = data['slides'][i];
            image = element["image"];
           
           if(image === "" || image === "default")
            {
               image = '../assets/default1.png';
            }
            else
            {
              image = decodeURIComponent(image)
            }

            id = element["id"];
            title=element["nom"];
            desc=element["desc"];
            price=element["price"];
            shopid=element["idshop"];

           topslides.push({id:id, type:"slide", shopid:shopid, image:image,  title:title, desc:desc, price:price});
          //  self.theshopid.push({'id': shopid}) = shopid;
          
         }

         for (i = 0; i < data['collection'].length; i++)
         {
           
            element = data['collection'][i];
            image = element["image"];
           
           if(image === "" || image === "default")
            {
               image = '../assets/default2.png';
            }
            else
            {
              image = decodeURIComponent(image)
            }

            id = element["id"];
            title = element["nom"];
            desc = element["desc"];
            price = element["price"];
            shopid = element["idshop"];

            collection.push({id:id, type:"collection", shopid:shopid, image:image,  title:title, desc:desc, price:price});

          
         } 
     
         for (i = 0; i < data['articles'].length; i++)
         {
           
           element = data['articles'][i];
            image = element["image"];
           
           if(image === "" || image === "default")
            {
               image = '../assets/default3.png';
            }
            else
            {
              image = decodeURIComponent(image)
            }
            id = element["id"];
            title=element["nom"];
            desc=element["desc"];
            genre=element["genre"];
            price=element["price"];
            shopid=element["idshop"];

           articles.push({id:id, type:"article", shopid:shopid, image:image,  title:title, genre:genre, desc:desc, price:price});

          
         }    
         
         for (i = 0; i < data['suggests'].length; i++)
         {
           
            element = data['suggests'][i];
            image = element["image"];
           
           if(image === "" || image === "default")
            {
               image = '../assets/default3.png';
            } 
            else
            {
              image = decodeURIComponent(image)
            }

            id = element["id"];
            title=element["nom"];
            desc=element["desc"]; 
            price=element["price"];
            shopid=element["idshop"];

           if(i === 0)
           {
            suggest1.push({id:id, type:"suggestion", shopid:shopid, image:image,  title:title, desc:desc, price:price});
           }
           if(i === 1)
           {
            suggest2.push({id:id, type:"suggestion", shopid:shopid, image:image,  title:title, desc:desc, price:price});
           }
           if(i === 2)
           {
            suggest3.push({id:id, type:"suggestion", shopid:shopid, image:image,  title:title, desc:desc, price:price});
           }

          //  suggests.push({id:id, shopid:shopid, image:image,  title:title, desc:desc, price:price});

          
         }    


         for (i = 0; i < data['adv'].length; i++)
         {
           
           element = data['adv'][i];
            image = element["image"];
           
           if(image === "" || image === "default")
            {
               image = '../assets/adv.png';
            }
            else
            {
              image = decodeURIComponent(image)
            }

            id = element["id"];
            shopid=element["idshop"];

           adv.push({id:id, type:"adv", shopid:shopid, image:image});

          
         } 


          this.finished = true;

           // if (this.finished === true)
           // {
             let delay = setInterval(function(){

                loader.dismiss();
                clearInterval(delay);

             },500)
           // }
         
     
        })
 
 
   this.topslides = topslides;
   this.collection = collection;
   this.articles = articles;
   this.adv = adv;
   this.suggest1 = suggest1;
   this.suggest2 = suggest2;
   this.suggest3 = suggest3;
   
   // console.log(this.data['1']['shop']['id']);
   
  
   

  }

  ionViewDidLoad()
   {
   

 

  }

}



