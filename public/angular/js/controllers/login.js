'use strict';

// signin controller
app.controller('LoginFormController', ['$scope', '$http', '$state', 'MyServices', function($scope, $http, $state, MyServices) {
        $scope.user = {};
        $scope.authError = null;
        $scope.login = function() {
            $scope.authError = null;
            MyServices.signin($scope.user, signinsuccess, function(err) {
                $scope.authError = err;
            });
        };

        var signinsuccess = function(data) {
            if (data !== false) {
                $state.go('app.dashboard');
                $scope.user = {};
            } else {
                $scope.authError = 'Login falló!';
            }
        };
    }])
        ;