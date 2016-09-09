angular.module('app.controllers', ['ngResource'])

        .controller('ledsCtrl', function ($scope, $ionicLoading, HttpGet, HttpPost) {

            $ionicLoading.show({
                template: 'Cargando...'
            });

            $scope.request = function (id) {
                console.log(id);
            };

            HttpGet.getLuces().then(function (response) {
                $scope.luces = response;
                $scope.ledList = [{text: "Habitacion", checked: true}, {text: "Sala", checked: true},
                    {text: "Cocina", checked: true}, {text: "Comedor", checked: true}, {text: "Baño", checked: true}];
                if ($scope.luces.led1 === 1) {
                    $scope.ledList[0].checked = true;
                } else {
                    $scope.ledList[0].checked = false;
                }
                if ($scope.luces.led2 === 1) {
                    $scope.ledList[1].checked = true;
                } else {
                    $scope.ledList[1].checked = false;
                }
                if ($scope.luces.led3 === 1) {
                    $scope.ledList[2].checked = true;
                } else {
                    $scope.ledList[2].checked = false;
                }
                if ($scope.luces.led4 === 1) {
                    $scope.ledList[3].checked = true;
                } else {
                    $scope.ledList[3].checked = false;
                }
                if ($scope.luces.led5 === 1) {
                    $scope.ledList[4].checked = true;
                } else {
                    $scope.ledList[4].checked = false;
                }
                $ionicLoading.hide();
            });

        })

        .controller('mapaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            function ($scope, $stateParams) {
            }])

        .controller('puertasCtrl', function ($scope, $ionicLoading, HttpGet) {
            $scope.request = function () {
                HttpGet.getPuertas().then(function (response) {
                    $scope.puertas = response;
                    console.log('puertas ->', $scope.puertas);
                    $scope.doorList = [{text: "Puerta principal", icon: "icon ion-unlocked"},
                        {text: "Terraza", icon: "icon ion-locked"}, {text: "Puerta trasera", icon: "icon ion-locked"},
                        {text: "Garaje", icon: "icon ion-locked"}];
                    if ($scope.puertas.p1 === 0) {
                        $scope.doorList[0].icon = "icon ion-locked";
                    } else {
                        $scope.doorList[0].icon = "icon ion-unlocked";
                    }
                    if ($scope.puertas.p2 === 0) {
                        $scope.doorList[1].icon = "icon ion-locked";
                    } else {
                        $scope.doorList[1].icon = "icon ion-unlocked";
                    }
                    if ($scope.puertas.p3 === 0) {
                        $scope.doorList[2].icon = "icon ion-locked";
                    } else {
                        $scope.doorList[2].icon = "icon ion-unlocked";
                    }
                    if ($scope.puertas.p4 === 0) {
                        $scope.doorList[3].icon = "icon ion-locked";
                    } else {
                        $scope.doorList[3].icon = "icon ion-unlocked";
                    }
                    $ionicLoading.hide();
                });
            };
            $scope.request();
        })

        .controller('camaraCtrl', function ($scope, HttpGet) {

            //$scope.$on('clicked', function () { $ionicSideMenuDelegate.canDragContent(true) });
            $scope.request = function () {
                HttpGet.getFoto().then(function (response) {
                    $scope.pic = response;
                    console.log('Foto ->', $scope.pic);

                    document.getElementById("img").src = "data:image/png;base64, " + $scope.pic;

                });
            };
        })

        .controller('loginCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', '$timeout', '$ionicSideMenuDelegate', 'HttpPost', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            function ($scope, $state, $stateParams, $ionicPopup, $timeout, $ionicSideMenuDelegate, HttpPost) {
                $ionicSideMenuDelegate.canDragContent(false);
                $scope.user = {};
                $scope.loginForm = function (user) {
                    if (user.user && user.pass) {
                        console.log("Iniciando sesión");
                        //$state.go("tabsController.leds");//BORRAR

                        HttpPost.login(user, function (data) {
							console.log(data.value);
                            if (data == true) {
                                
                                $scope.showPopup();
                                $ionicSideMenuDelegate.canDragContent(true);
                                $state.go("tabsController.leds");

                            } else {
                                $scope.showErrorPopup = function () {
                                    var myPopup = $ionicPopup.show({
                                        template: '<p class="text-center">Usuario o contraseña incorrecto</p>',
                                        title: 'Error',
                                        scope: $scope

                                    });
                                    $timeout(function () {
                                        myPopup.close(); //close the popup after 3 seconds for some reason
                                    }, 2000);
                                };
                                $scope.showErrorPopup();
                                //LIMPIAR FORMULARIO
                            }

                        }, function (err) {
                            $scope.showError2Popup = function () {
                                var myPopup = $ionicPopup.show({
                                    template: '<p class="text-center">No hay comunicación con el servidor</p>',
                                    title: 'Error',
                                    scope: $scope

                                });
                                $timeout(function () {
                                    myPopup.close(); //close the popup after 3 seconds for some reason
                                }, 2000);
                            };
                            $scope.showError2Popup();

                        });

                    } else {
                        $scope.showError3Popup = function () {
                            var myPopup = $ionicPopup.show({
                                template: '<p class="text-center">Por favor rellene todos los campos</p>',
                                title: 'Error',
                                scope: $scope

                            });
                            $timeout(function () {
                                myPopup.close(); //close the popup after 3 seconds for some reason
                            }, 2000);
                        };
                        $scope.showError3Popup();
                    }
                };
            }])

        .controller('registroCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', '$timeout', '$ionicSideMenuDelegate', 'HttpPost', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            function ($scope, $state, $stateParams, $ionicPopup, $timeout, $ionicSideMenuDelegate, HttpPost) {
                $scope.newUser = {};
                $scope.registerForm = function (newUser) {
                    if (newUser.user && newUser.pass) {
                        console.log("Registrando Usuario");
                        HttpPost.registro(newUser, function (data) {
                            console.log(data);
                            if (data === true) {
                                $scope.showSucessPopup = function () {
                                    var myPopup = $ionicPopup.show({
                                        template: '<p class="text-center">Usuario registrado correctamente</p>',
                                        title: 'Éxito',
                                        scope: $scope

                                    });
                                    $timeout(function () {
                                        myPopup.close(); //close the popup after 3 seconds for some reason
                                    }, 2000);
                                };
                                $scope.showSucessPopup();
                                //$state.go("tabsController.leds");
                            } else {
                                $scope.showErrorPopup = function () {
                                    var myPopup = $ionicPopup.show({
                                        template: '<p class="text-center">El usuario ya existe</p>',
                                        title: 'Error',
                                        scope: $scope

                                    });
                                    $timeout(function () {
                                        myPopup.close(); //close the popup after 3 seconds for some reason
                                    }, 2000);
                                };
                                $scope.showErrorPopup();
                                //Limpiar form
                            }

                        }, function (err) {
                            $scope.showError2Popup = function () {
                                var myPopup = $ionicPopup.show({
                                    template: '<p class="text-center">No hay comunicación con el servidor</p>',
                                    title: 'Error',
                                    scope: $scope

                                });
                                $timeout(function () {
                                    myPopup.close(); //close the popup after 3 seconds for some reason
                                }, 2000);
                            };
                            $scope.showError2Popup();
                        });

                    } else {
                        $scope.showError3Popup = function () {
                            var myPopup = $ionicPopup.show({
                                template: '<p class="text-center">Por favor rellene todos los campos</p>',
                                title: 'Error',
                                scope: $scope

                            });
                            $timeout(function () {
                                myPopup.close(); //close the popup after 3 seconds for some reason
                            }, 2000);
                        };
                        $scope.showError3Popup();
                    }
                };
            }]);
