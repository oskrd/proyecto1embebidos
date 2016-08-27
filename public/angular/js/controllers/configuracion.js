app.controller('FormXeditableCtrl', ['$scope', 'MyServices', 'editableOptions', 'editableThemes',
    function($scope, MyServices, editableOptions, editableThemes) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';

        $scope.info = {nombre: 'Foseto'};
        var getInfo = function() {
            MyServices.getAbout(function(data) {
                if (data !== false) {
                    $scope.info.quesomos = data.quesomos;
                    $scope.info.mision = data.mision;
                    $scope.info.vision = data.vision;
                }
            }, function(err) {
                $scope.info.quesomos = null;
                $scope.info.mision = null;
                $scope.info.vision = null;
                console.log(err);
            });
            MyServices.getContact(function(data) {
                if (data !== false) {
                    $scope.info.email = data.email;
                    $scope.info.telefono = data.telefono;
                    $scope.info.ubicacion = data.ubicacion;
                    $scope.info.mapa = data.mapa;
                }
            }, function(err) {
                $scope.info.email = null;
                $scope.info.telefono = null;
                $scope.info.ubicacion = null;
                $scope.info.mapa = null;
                console.log(err);
            });
        };
        getInfo();

        $scope.postInfo = function() {
            MyServices.postConfiguracion($scope.info, getInfo, function(err) {
                getInfo();
                console.log(err);
            });
        };

    }]);

app.filter('rawHtml', ['$sce',
    function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }
]);