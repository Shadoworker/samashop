import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);


// AppModule.config(function($stateProvider, $urlRouterProvider){
  
//   $stateProvider.state('userhome',{
//       url:'/user',
//       templateUrl: '../pages/userhome/userhome',
//       controller:'userCtrl'
//   })

// })