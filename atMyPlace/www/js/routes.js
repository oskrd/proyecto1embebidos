angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('funciones.luces', {
    url: '/luces',
    views: {
      'side-menu21': {
        templateUrl: 'templates/luces.html',
        controller: 'lucesCtrl'
      }
    }
  })

  .state('funciones.puertas', {
    url: '/puertas',
    views: {
      'side-menu21': {
        templateUrl: 'templates/puertas.html',
        controller: 'puertasCtrl'
      }
    }
  })

  .state('funciones.cMara', {
    url: '/camara',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cMara.html',
        controller: 'cMaraCtrl'
      }
    }
  })

  .state('funciones', {
    url: '/side_menu',
    templateUrl: 'templates/funciones.html',
    abstract:true
  })

  .state('atMyPlace', {
    url: '/login',
    templateUrl: 'templates/atMyPlace.html',
    controller: 'atMyPlaceCtrl'
  })

  .state('atMyPlace2', {
    url: '/signup',
    templateUrl: 'templates/atMyPlace2.html',
    controller: 'atMyPlace2Ctrl'
  })

$urlRouterProvider.otherwise('/login')

  

});