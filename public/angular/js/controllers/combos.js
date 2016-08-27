app.controller('FormXeditableCtrl', ['$scope', '$filter', 'MyServices', 'editableOptions', 'editableThemes',
    function($scope, $filter, MyServices, editableOptions, editableThemes) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';
        $scope.id = {_id: 0};
        $scope.porciones = [
            {value: 1, name: "poco"},
            {value: 2, name: "regular"},
            {value: 3, name: "mucho"}
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

        //combos
        $scope.combos = [];
        var getCombo = function() {
            getEstacion();
            getVaso();
            MyServices.getCombos(function(data) {
                if (data !== false) {
                    $scope.combos = data;
                }
            }, function(err) {
                $scope.combos = [];
                console.log(err);
            });
        };
        getCombo();
        
        $scope.postCombo = function(index) {
            for(var i = 0;i<$scope.combos[index].ingredientes.length;i++){
                var ingrediente = $scope.combos[index].ingredientes[i];
                ingrediente._idEstacion = $filter('filter')($scope.estaciones,{nombre: ingrediente.nombreEstacion})[0]._id;
                var mangas = $scope.getMangas(ingrediente.nombreEstacion);
                var manga  = $filter('filter')(mangas,{producto:{nombre : ingrediente.nombreManga}});
                ingrediente._idManga = (manga.length>0)? manga[0]._id : '0';
                $scope.combos[index].ingredientes[i] = ingrediente;
            }
            MyServices.postCombos($scope.combos[index], getCombo, function(err) {
                getCombo();
                console.log(err);
            });
        };
        $scope.putCombo = function() {
            $scope.inserted = {
                "nombre": "",
                "precio": 0,
                "peso": 0,
                "vaso": "Pequeño",
                "foto": "",
                "descripcion": "",
                "ingredientes": []
            };
            MyServices.putCombos($scope.inserted, getCombo, function(err) {
                getCombo();
                console.log(err);
            });
        };
        $scope.putIngrediente = function(index) {
            $scope.inserted = {
                "_idManga": 0,
                "_idEstacion": 0,
                "nombreManga": "",
                "nombreEstacion": "",
                "tipoPorcion": 1,
                "pesoActual": 0,
                "precioActual": 0,
                "foto": ""
            };
            $scope.combos[index].ingredientes.push($scope.inserted);
            MyServices.postCombos($scope.combos[index], getCombo, function(err) {
                getCombo();
                console.log(err);
            });
        };
        $scope.deleteCombo = function(index) {
            $scope.id._id = $scope.combos[index]._id;
            MyServices.deleteCombos($scope.id, getCombo, function(err) {
                getCombo();
                console.log(err);
            });
        };
        $scope.deleteIngrediente = function(parentindex, index) {
            $scope.combos[parentindex].ingredientes.splice(index, 1);
            MyServices.postCombos($scope.combos[parentindex], getCombo, function(err) {
                getCombo();
                console.log(err);
            });
        };

        $scope.showPorcion = function(ingrediente) {
            var selected = [];
            if (ingrediente && ingrediente.tipoPorcion) {
                selected = $filter('filter')($scope.porciones, {value: ingrediente.tipoPorcion});
            }
            return selected.length ? selected[0].name : 'Not set';
        };

        $scope.getMangas = function(nombreEstacion) {
            var selected = [];
            if (nombreEstacion) {
                selected = $filter('filter')($scope.estaciones, {nombre: nombreEstacion});
            }
            return selected.length ? selected[0].mangas : 'Not set';
        };
    }]);
