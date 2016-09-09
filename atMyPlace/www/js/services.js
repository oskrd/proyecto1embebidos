var server = 'http://192.168.100.5:8888';

angular.module('app.services', [])
        .factory('HttpGet', function ($http) {
            return {
                getLuces: function () {
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
                getPuertas: function () {
                    var part = '/puertas';
                    var url = server.concat(part);
                    console.log('Solicito: ', url);
                    return $http.get(url).then(function (response) {
                        console.log('Get puertas', response);
                        return response.data;
                    })
                },
                getFoto: function () {
                    var part = '/camara';
                    var url = server.concat(part);
                    console.log('Solicito: ', url);
                    return $http.get(url).then(function (response) {
                        console.log('Get foto', response);
                        return response.data;
                    });
                }

            };
        })

        .factory('HttpPost', function ($http) {
            return {
                login: function (info, callback, err) {
                    console.log(info);
                    return $http({
                        method: "POST",
                        url: server + '/usuarios/login',
                        data: {
                            "user": info.user,
                            "pass": info.pass
                        }
                    }).success(callback).error(err);
                },
                
                registro:function (info, callback, err) {
                    console.log(info);
                    return $http({
                        method: "POST",
                        url: server + '/usuarios/nuevo',
                        data: {
                            "user": info.user,
                            "pass": info.pass
                        }
                    }).success(callback).error(err);
                },
                
                leds:function (info, callback, err) {
                    console.log(info);
                    return $http({
                        method: "POST",
                        url: server + '/usuarios/nuevo',
                        data: {
                            "num": info.num,
                            "valor": info.valor
                        }
                    }).success(callback).error(err);
                }
            };
        });