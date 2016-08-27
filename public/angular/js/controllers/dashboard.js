'use strict';

app.controller('DashboardCtrl', ['$scope', 'MyServices', function($scope, MyServices) {
        //likes
        $scope.likes = 0;
        var url = 'https://graph.facebook.com/?id=1727931277453984&access_token=1032273080141714|cfbcca1559f69f4c613463716fcad0c8&fields=fan_count&';
        $.getJSON(url, function(json) {
            $scope.likes = json.fan_count;
        });
        //estadisticas generales
        $scope.estadisticas = {"comentarios": 0, "ganancias": 0, "usuarios": 0, "ordenAct": 0, "ordenFin": 0, "valoracion": 0};
        MyServices.estadisticas(function(data) {
            if (data !== false) {
                $scope.estadisticas = data;
            }
        }, function(err) {
            $scope.estadisticas = {"comentarios": 0, "ganancias": 0, "usuarios": 0, "ordenAct": 0, "ordenFin": 0, "valoracion": 0};
            console.log(err);
        });
        //estaciones
        $scope.estaciones = [];
        MyServices.getEstaciones(function(data) {
            if (data !== false) {
                $scope.estaciones = data;
            }
        }, function(err) {
            $scope.estaciones = [];
            console.log(err);
        });
        
        $scope.getOk = function(manga) {
            if(manga.capacidad === 0) return 0;
            return manga.reservado? ((manga.disponible - manga.reservado) / manga.capacidad) * 100 :
                                    (manga.disponible / manga.capacidad) * 100;
        };
        
        $scope.getReservado = function(manga) {
            if(manga.capacidad === 0) return 0;
            return manga.reservado? manga.reservado / manga.capacidad * 100 : 0;
        };
        
        $scope.getAgotado = function(manga) {
            if(manga.capacidad === 0) return 0;
            return (manga.capacidad - manga.disponible) / manga.capacidad * 100;
        };

    }]);