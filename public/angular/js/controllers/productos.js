app.controller('FormXeditableCtrl', ['$scope', '$filter', 'MyServices', 'editableOptions', 'editableThemes',
    function($scope, $filter, MyServices, editableOptions, editableThemes) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';
        $scope.id = {_id: 0};
        //fondos
        $scope.fondos = [
            {value: 1, text: 'Helado'},
            {value: 2, text: 'Fruta'},
            {value: 3, text: 'Lechuza'},
            {value: 4, text: 'Paleta'}
        ];
        //tipos
        $scope.tipos = [
            {value: 1, text: 'Solido'},
            {value: 2, text: 'Liquido'}
        ];

        $scope.statuses = [
            {value: 0, text: 'Agotado', style: 'label-secondary'},
            {value: 1, text: ' <10%  ', style: 'label-danger'},
            {value: 2, text: ' <25%  ', style: 'label-warning'},
            {value: 3, text: '  Ok   ', style: 'label-success'}
        ];

        //estaciones
        $scope.estaciones = [];
        var getEstacion = function() {
            MyServices.getEstaciones(function(data) {
                if (data !== false) {
                    $scope.estaciones = data;
                }
            }, function(err) {
                $scope.estaciones = [];
                console.log(err);
            });
        };

        $scope.postEstacion = function(index) {
            MyServices.postEstaciones($scope.estaciones[index], getEstacion, function(err) {
                getEstacion();
                console.log(err);
            });
        };
        $scope.postManga = function(parentindex, index) {
            MyServices.postMangas($scope.estaciones[parentindex].mangas[index], getEstacion, function(err) {
                getEstacion();
                console.log(err);
            });
        };
        $scope.putEstacion = function() {
            $scope.inserted = {
                nombre: '',
                precio: 0,
                mangas: [],
                tamano: [{"tipo": "peq", "cantidad": 0},
                    {"tipo": "mediano", "cantidad": 0},
                    {"tipo": "grande", "cantidad": 0}],
                fondo: 1,
                color: "#000000"
            };
            MyServices.putEstaciones($scope.inserted, getEstacion, function(err) {
                getEstacion();
                console.log(err);
            });
        };
        $scope.putManga = function(index) {
            $scope.inserted = {
                _idEstacion: $scope.estaciones[index]._id,
                capacidad: 0,
                reservado: 0,
                disponible: 0,
                producto: null
            };
            MyServices.putMangas($scope.inserted, getEstacion, function(err) {
                getEstacion();
                console.log(err);
            });
        };
        $scope.deleteEstacion = function(index) {
            $scope.id._id = $scope.estaciones[index]._id;
            MyServices.deleteEstaciones($scope.id, getEstacion, function(err) {
                getEstacion();
                console.log(err);
            });
        };
        $scope.deleteManga = function(parentindex, index) {
            $scope.id._id = $scope.estaciones[parentindex].mangas[index]._id;
            $scope.id._idEstacion = $scope.estaciones[parentindex]._id;
            MyServices.deleteMangas($scope.id, getEstacion, function(err) {
                getEstacion();
                console.log(err);
            });
        };

        //vasos
        $scope.vasos = [];
        var getVaso = function() {
            MyServices.getVasos(function(data) {
                if (data !== false) {
                    $scope.vasos = data;
                }
            }, function(err) {
                $scope.vasos = [];
                console.log(err);
            });
        };

        $scope.postVaso = function(index) {
            MyServices.postVasos($scope.vasos[index], getVaso, function(err) {
                getVaso();
                console.log(err);
            });
        };
        $scope.putVaso = function() {
            $scope.inserted = {
                nombre: '',
                cantidad: 0,
                capacidad: 0,
                reservados: 0,
                foto: ''
            };
            MyServices.putVasos($scope.inserted, getVaso, function(err) {
                getVaso();
                console.log(err);
            });
        };
        $scope.deleteVaso = function(index) {
            $scope.id._id = $scope.vasos[index]._id;
            MyServices.deleteVasos($scope.id, getVaso, function(err) {
                getVaso();
                console.log(err);
            });
        };

        $scope.showTipo = function(estacion) {
            var selected = [];
            if (estacion && estacion.tipo) {
                selected = $filter('filter')($scope.tipos, {value: estacion.tipo});
            }
            return selected.length ? selected[0].text : 'Not set';
        };

        $scope.showFondo = function(estacion) {
            var selected = [];
            if (estacion && estacion.fondo) {
                selected = $filter('filter')($scope.fondos, {value: estacion.fondo});
            }
            return selected.length ? selected[0].text : 'Not set';
        };

        $scope.getStatus = function(manga) {
            var x = manga.reservado? ((manga.disponible - manga.reservado) / manga.capacidad) * 100 :
                                     (manga.disponible / manga.capacidad) * 100;
            var status = 0;
            switch (true) {
                case (x < 1):
                    break;
                case (x < 10):
                    status = 1;
                    break;
                case (x < 25):
                    status = 2;
                    break;
                default:
                    status = 3;
                    break;
            }
            return status;
        };

        $scope.showStatus = function(status) {
            var selected = $filter('filter')($scope.statuses, {value: status});
            return selected.length ? selected[0].text : 'No info';
        };

        $scope.styleStatus = function(status) {
            var selected = $filter('filter')($scope.statuses, {value: status});
            return selected.length ? selected[0].style : '';
        };
        
        angular.element(document).ready(function(){
            getEstacion();
            getVaso();
        });
    }]);
