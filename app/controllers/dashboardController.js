mcDonaldApp.controller('dashboardController', ['$scope','$state', '$http','$location','$localStorage','$window','$cookies',
    function ($scope,$state, $http,$location,$localStorage,$window,$cookies) {
        $scope.userInfo = $localStorage.userInfo;
        console.log($scope.userInfo);
        $scope.user = {};
        if($cookies.get('remember_me')){
            $scope.user.remember = true;
            $scope.user.username = $cookies.get('user_name');
            $scope.user.password = $cookies.get('user_password');
        }

        $scope.login= function(form){


        };

    }
]);