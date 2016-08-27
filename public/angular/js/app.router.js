angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                        .otherwise('/access/login');
                $stateProvider
                        .state('app', {
                            abstract: true,
                            url: '/app',
                            templateUrl: 'partials/app.html'
                        })
                        .state('app.dashboard', {
                            url: '/dashboard',
                            templateUrl: 'partials/app_dashboard.html',
                            resolve: {
                                deps: ['$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load(['countTo', 'chart.js']).then(function() {
                                                    return $ocLazyLoad.load('js/controllers/dashboard.js');
                                                }).then(function() {
                                                    return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');});
                                    }]
                            }
                        })
                        .state('access', {
                            url: '/access',
                            template: '<div ui-view class=""></div>'
                        })
                        .state('access.login', {
                            url: '/login',
                            templateUrl: 'partials/ui-login.html',
                            resolve: {
                                deps: ['uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load(['js/controllers/login.js',
                                            '../bower_components/font-awesome/css/font-awesome.css']);
                                    }
                                ]
                            }
                        })
                        .state('access.404', {
                            url: '/404',
                            templateUrl: 'partials/ui-404.html'
                        })

                        .state('app.estaciones', {
                            url: '/estaciones',
                            templateUrl: 'partials/productos-estaciones.html',
                            resolve: {
                                deps: ['$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('xeditable').then(function() {
                                                    return $ocLazyLoad.load('js/controllers/productos.js');
                                                });
                                            }]
                            }
                        })
                        .state('app.mangas', {
                            url: '/mangas',
                            templateUrl: 'partials/productos-mangas.html',
                            resolve: {
                                deps: ['$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('xeditable').then(
                                                function() {
                                                    return $ocLazyLoad.load('js/controllers/productos.js');
                                                }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('app.vasos', {
                            url: '/vasos',
                            templateUrl: 'partials/productos-vasos.html',
                            resolve: {
                                deps: ['$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('xeditable').then(
                                                function() {
                                                    return $ocLazyLoad.load('js/controllers/productos.js');
                                                }
                                        );
                                    }
                                ]
                            }
                        })
                        
                        .state('app.combos', {
                            url: '/combos',
                            templateUrl: 'partials/combos.html',
                            resolve: {
                                deps: ['$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('xeditable').then(
                                                function() {
                                                    return $ocLazyLoad.load('js/controllers/combos.js');
                                                }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('app.mail', {
                            abstract: true,
                            url: '/mail',
                            templateUrl: 'partials/mail.html',
                            resolve: {
                                deps: ['uiLoad',
                                    function(uiLoad) {
                                        return uiLoad.load(['../bower_components/font-awesome/css/font-awesome.css', 'js/controllers/mail.js']);
                                    }
                                ]
                            }
                        })
                        .state('app.mail.list', {
                            url: '/{fold}',
                            templateUrl: 'partials/mail-list.html'
                        })
                        .state('app.configuracion', {
                            url: '/configuracion',
                            templateUrl: 'partials/configuracion.html',
                            resolve: {
                                deps: ['$ocLazyLoad',
                                    function($ocLazyLoad) {
                                        return $ocLazyLoad.load('xeditable').then(
                                                function() {
                                                    return $ocLazyLoad.load('js/controllers/configuracion.js');
                                                }
                                        );
                                    }
                                ]
                            }
                        })
                        .state('app.estadisticas', {
                            url: '/estadisticas',
                            templateUrl: 'partials/estadisticas.html'
                        })
                        ;
        }]);