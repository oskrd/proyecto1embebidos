app.controller('MailCtrl', ['$scope', 'MyServices', function($scope, MyServices) {
        $scope.folds = [
            {name: 'Sugerencias', filter: 'sugerencias', icon: 'fa-inbox', badge: '', count: ''},
            {name: 'Comentarios', filter: 'comentarios', icon: 'fa-star-o', badge: '', count: ''}
        ];
    }]);

app.controller('MailListCtrl', ['$scope', '$stateParams', 'MyServices', '$filter', function($scope, $stateParams, MyServices, $filter) {
        $scope.fold = $stateParams.fold;
        $scope.id = {_id: 0};
        //comments
        var getMail = function() {
            $scope.comments = [];
            $scope.sugest = [];
            $scope.mails =[];
            MyServices.getComments(function(data) {
                if (data !== false) {
                    $scope.comments = data;
                    for (var i = 0; i < $scope.comments.length; i++) {
                        $scope.comments[i].state = 'comentarios';
                        $scope.comments[i].fold = 'starred';
                    }
                    $scope.mails = $scope.sugest.concat($scope.comments);
                }
            }, function(err) {
                $scope.comments = [];
                console.log(err);
            });
            MyServices.getSugest(function(data) {
                if (data !== false) {
                    $scope.sugest = data;
                    for (var i = 0; i < $scope.sugest.length; i++) {
                        $scope.sugest[i].state = 'sugerencias';
                        $scope.sugest[i].fold = '';
                    }
                    $scope.mails = $scope.comments.concat($scope.sugest);
                }
            }, function(err) {
                $scope.sugest = [];
                console.log(err);
            });
        };
        getMail();
//comentario
        $scope.deleteMail = function(id) {
            $scope.selected = $filter('filter')($scope.mails, {_id: id});
            $scope.id._id = id;
            if ($scope.selected[0].state === 'sugerencias') {
                MyServices.deleteSugest($scope.id, getMail, function(err) {
                    getMail();
                    console.log(err);
                });
            }
            else{
                MyServices.deleteComments($scope.id, getMail, function(err) {
                    getMail();
                    console.log(err);
                });
            }
        };
    }]);