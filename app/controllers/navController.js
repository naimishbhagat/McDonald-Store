mcDonaldApp.controller('navController', ['$scope', '$http','$rootScope','$location','$state','$localStorage',
    function ($scope, $http,$rootScope,$location,$state,$localStorage) {
        $scope.userInfo = $localStorage.userInfo;
        $scope.status = {
            isopen: false
        };
        //console.log($cookies.get('remember_me'));
        $scope.logout = function () {
            $localStorage.userInfo = null;
            $state.go('app.home', {}, {reload: true});
        }
    }
]);