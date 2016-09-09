angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.leds', {
    url: '/luces',
    views: {
      'tab1': {
        templateUrl: 'templates/leds.html',
        controller: 'ledsCtrl'
      }
    }
  })

  .state('tabsController.mapa', {
    url: '/mapa',
    views: {
      'tab5': {
        templateUrl: 'templates/mapa.html',
        controller: 'mapaCtrl'
      }
    }
  })

  .state('tabsController.puertas', {
    url: '/puertas',
    views: {
      'tab3': {
        templateUrl: 'templates/puertas.html',
        controller: 'puertasCtrl'
      }
    }
  })

  .state('tabsController.camara', {
    url: '/camara',
    views: {
      'tab4': {
        templateUrl: 'templates/camara.html',
        controller: 'camaraCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/menu',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('registro', {
    url: '/signup',
    templateUrl: 'templates/registro.html',
    controller: 'registroCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});