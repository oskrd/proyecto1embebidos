angular.module('app.services', ['ngResource'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('HttpGet', function($http) {
	var server = 'http://192.168.100.5:8888';
 return {
   getLuces: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
		 var part = '/leds';
		 var url = server.concat(part);
		 console.log('Solicito: ', url)
     return $http.get(url)
       .then(function (response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get luces', response);
         return response.data;
       });
   },
   getPuertas: function() {
		 var part = '/puertas';
		 var url = server.concat(part);
		 console.log('Solicito: ', url);
		 return $http.get(url).then(function(response){
			 console.log('Get puertas', response);
			 return response.data;
		 })
   },
	 getFoto: function() {
		 var part = '/camara';
		 var url = server.concat(part);
		 console.log('Solicito: ', url);
		 return $http.get(url).then(function(response){
			 console.log('Get foto', response);
			 return response.data;
		 })
	 }
	 
 };
})

.factory('HttpPost', function($resource){
 return $resource('http://jsonplaceholder.typicode.com/posts');
});