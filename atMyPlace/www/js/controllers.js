angular.module('app.controllers', [])
  
/*.controller('lucesCtrl', ['$scope', '$stateParams', HttpService,// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, HttpService) {
	 HttpService.getPost().then(function(response) {
     $scope.post = response;
   });

}])*/
.controller('lucesCtrl', function($scope, $ionicLoading, HttpService) {
	
	/*$ionicLoading.show({
		template: 'Cargando...'
	});*/

	HttpService.getLuces().then(function(response) {
    $scope.luces = response;
	console.log('luces ->',$scope.luces);
	//console.log('el primero -> ', $scope.luces.led1);
	//$ionicLoading.hide();
	});

})
   
/*.controller('puertasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])*/
.controller('puertasCtrl', function($scope, $ionicLoading, HttpService) {
	/*$ionicLoading.show({
		template: 'Cargando...'
	});*/

	HttpService.getPuertas().then(function(response) {
    $scope.puertas = response;
	console.log('puertas ->',$scope.puertas);
	//$ionicLoading.hide();
	});
})

   
.controller('cMaraCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('atMyPlaceCtrl', ['$scope', '$stateParams', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
	$scope.user = {};
	$scope.loginForm = function(user) {
		if (user.nickname && user.pass) {
			console.log("Iniciando sesión", user)
			$state.go("funciones.luces");
		} else {
			alert("Informacion incompleta");
		}
	}


}])
   
.controller('atMyPlace2Ctrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
	$scope.newUser = {};
	$scope.registerForm = function(newUser) {
		if (newUser.name && newUser.nickname && newUser.password) {
			console.log("Registrando Usuario", newUser);
			$state.go("atMyPlace");
		} else {
			alert("Llene los espacios asignados");
		}
	};

}])
 
