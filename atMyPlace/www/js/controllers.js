angular.module('app.controllers', ['ngResource'])
  
.controller('ledsCtrl', function($scope, $ionicLoading, HttpGet, HttpPost) {
	
	$ionicLoading.show({
		template: 'Cargando...'
	});

	HttpGet.getLuces().then(function(response) {
    $scope.luces = response;
	//console.log('luces ->',$scope.luces);
    $scope.ledList=  [{text: "Habitacion", checked: true},  {text: "Sala", checked: true},
    {text: "Cocina", checked: true},{text: "Comedor", checked: true},{text: "Baño", checked: true}];
    if ($scope.luces.led1 === 1){
        $scope.ledList[0].checked= true;
    } else{
        $scope.ledList[0].checked= false;
    }
    if ($scope.luces.led2 === 1){
        $scope.ledList[1].checked= true;
    } else{
        $scope.ledList[1].checked= false;
    }
    if ($scope.luces.led3 === 1){
        $scope.ledList[2].checked= true;
    } else{
        $scope.ledList[2].checked= false;
    }
    if ($scope.luces.led4 === 1){
        $scope.ledList[3].checked= true;
    } else{
        $scope.ledList[3].checked= false;
    }
    if ($scope.luces.led5 === 1){
        $scope.ledList[4].checked= true;
    } else{
        $scope.ledList[4].checked= false;
    }
	$ionicLoading.hide();
	});
	console.log("ando cerca", $scope);
	/*var led = {num:2, val:0};
	HttpPost.postLed(led).then(function(response){
		$scope.luz = response;
		console.log("tengo luz", $scope.luz);
	});*/

	 var postData = {num:2, val:0};
 	 $scope.newPost = function() {
   var post = new Post(postData);
   post.$save(function(postObject) {
   alert(JSON.stringify(postObject));
  });
	};
	$scope.newPost();

})
   
.controller('mapaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
/*.controller('puertasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])*/
.controller('puertasCtrl', function($scope, $ionicLoading, HttpGet) {
	/*$ionicLoading.show({
		template: 'Cargando...'
	});*/
	
	$scope.request=function(){
		HttpGet.getPuertas().then(function(response) {
			$scope.puertas = response;
		console.log('puertas ->',$scope.puertas);
			$scope.doorList = [{text: "Puerta principal", icon: "icon ion-unlocked"}, 
			{text:"Terraza", icon: "icon ion-locked"}, {text:"Puerta trasera", icon: "icon ion-locked"},
			{text:"Garaje", icon: "icon ion-locked"}];
		if ($scope.puertas.p1 === 0){
			$scope.doorList[0].icon= "icon ion-locked";
		} else{
			$scope.doorList[0].icon= "icon ion-unlocked";
		}
		if ($scope.puertas.p2 === 0){
			$scope.doorList[1].icon= "icon ion-locked";
		} else{
			$scope.doorList[1].icon= "icon ion-unlocked";
		}
		if ($scope.puertas.p3 === 0){
			$scope.doorList[2].icon= "icon ion-locked";
		} else{
			$scope.doorList[2].icon= "icon ion-unlocked";
		}
		if ($scope.puertas.p4 === 0){
			$scope.doorList[3].icon= "icon ion-locked";
		} else{
			$scope.doorList[3].icon= "icon ion-unlocked";
		}
		$ionicLoading.hide();
		});
	};
	$scope.request();
})
   
/*.controller('camaraCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])*/
         
.controller('camaraCtrl', function($scope, HttpGet) {

    //$scope.$on('clicked', function () { $ionicSideMenuDelegate.canDragContent(true) });
    $scope.request=function(){
			HttpGet.getFoto().then(function(response) {
    	$scope.pic = response;
			console.log('Foto ->',$scope.pic);

    	document.getElementById("img").src="data:image/png;base64, " + $scope.pic;

    	});
    };
})

.controller('loginCtrl', ['$scope', '$state', '$stateParams', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $ionicSideMenuDelegate) {
$ionicSideMenuDelegate.canDragContent(false);
$scope.user = {};
	$scope.loginForm = function(user) {
		if (user.nickname && user.pass) {
			console.log("Iniciando sesión", user);
            $ionicSideMenuDelegate.canDragContent(true);
			$state.go("tabsController.leds");
		} else {
			alert("Informacion incompleta");
		}
	}
}])
   
.controller('registroCtrl', ['$scope', '$state', '$stateParams', '$ionicSideMenuDelegate',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $ionicSideMenuDelegate) {
    $scope.newUser = {};
	$scope.registerForm = function(newUser) {
		if (newUser.nickname && newUser.password) {
			console.log("Registrando Usuario", newUser);
			$state.go("login");
		} else {
			alert("Llene los espacios asignados");
		}
	};
}])
 