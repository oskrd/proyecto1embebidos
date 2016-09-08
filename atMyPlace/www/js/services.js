angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('HttpService', function($http) {
 return {
   getLuces: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.get('http://192.168.100.11:8888/leds')
       .then(function (response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get luces', response);
         return response.data;
       });
   },
   getPuertas: function() {
       return $http.get('http://192.168.100.11:8888/puertas').then(function(response){
           console.log('Get puertas', response);
           return response.data;
       })
   }
 };
});
;