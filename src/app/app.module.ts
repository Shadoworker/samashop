import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { samaHeaderPage } from '../pages/samaheader/samaheader'; 
import { HomePage } from '../pages/home/home'; 
import { TestPage } from '../pages/test/test'; 
import { shopListPage } from '../pages/shoplist/shoplist'; 
import { articleListPage } from '../pages/articlelist/articlelist'; 
import { searchListPage } from '../pages/searchlist/searchlist'; 
import { mainHomePage } from '../pages/mainhome/mainhome'; 
import { loginPage } from '../pages/login/login'; 
import { signupPage } from '../pages/signup/signup'; 
import { comptePage } from '../pages/compte/compte'; 
import { shopEditionPage } from '../pages/shopedition/shopedition'; 
import { shopHomePage } from '../pages/shophome/shophome'; 
import { shopHomeEditionPage } from '../pages/shophomeedition/shophomeedition'; 
import { templateViewPage } from '../pages/templateview/templateview'; 
import { addEditItemPage } from '../pages/addedititem/addedititem'; 
import { showItemPage } from '../pages/showitem/showitem'; 
import { editItemPage } from '../pages/edititem/edititem';
import { confirmPopPage } from '../pages/confirmpop/confirmpop';
import { mailPopPage } from '../pages/mailpop/mailpop';
import { cropPopPage } from '../pages/croppop/croppop';
import { orderListPage } from '../pages/orderlist/orderlist';
import { orderItemsPage } from '../pages/orderitems/orderitems';
import { shoporderListPage } from '../pages/shoporderlist/shoporderlist';
import { favListPage } from '../pages/favlist/favlist';
import { genreMenuPage } from '../pages/genremenu/genremenu';
import { RestServiceProvider } from '../providers/rest-service/rest-service'; 

@NgModule({
  declarations: [
    MyApp,
    samaHeaderPage,
    HomePage,
    loginPage,
    signupPage,
    comptePage,
    mainHomePage,
    shopListPage,
    confirmPopPage,
    mailPopPage,
    cropPopPage,
    articleListPage,
    searchListPage,
    shopEditionPage,
    shopHomePage,
    templateViewPage,
    shopHomeEditionPage,
    addEditItemPage,
    showItemPage,
    orderListPage,
    orderItemsPage,
    shoporderListPage,
    favListPage,
    editItemPage,
    genreMenuPage,
    TestPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    samaHeaderPage,
    HomePage,
    loginPage,
    signupPage,
    comptePage,
    mainHomePage,
    shopListPage,
    confirmPopPage,
    mailPopPage,
    cropPopPage,
    articleListPage,
    searchListPage,
    shopEditionPage,
    shopHomePage,
    templateViewPage,
    shopHomeEditionPage,
    addEditItemPage,
    orderListPage,
    orderItemsPage,
    showItemPage,
    shoporderListPage,
    favListPage,
    genreMenuPage,
    editItemPage,
    TestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestServiceProvider,
  ]
})
export class AppModule {}





