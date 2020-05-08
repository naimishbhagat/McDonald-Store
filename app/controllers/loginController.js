mcDonaldApp.controller('loginController', ['$scope','$state', '$http','$location','$localStorage','$window','$cookies','AuthService',
    function ($scope,$state, $http,$location,$localStorage,$window,$cookies,AuthService) {
        $scope.userInfo = null;
        $localStorage.userInfo = null;
        $scope.user = {};
        if($cookies.get('remember_me')){
            $scope.user.remember = true;
            $scope.user.username = $cookies.get('user_name');
            $scope.user.password = $cookies.get('user_password');
        }

        $scope.login = function(form){
            AuthService.login($scope.user.username, $scope.user.password).then(function () {
               $state.go('app.dashboard');
            });
        };

    }
]);