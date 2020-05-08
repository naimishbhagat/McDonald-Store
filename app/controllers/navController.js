mcDonaldApp.controller('navController', ['$scope', '$http','$rootScope','$location','$state','$localStorage','$cookies',
    function ($scope, $http,$rootScope,$location,$state,$localStorage,$cookies) {
        $scope.userInfo = $localStorage.userInfo;
        $scope.status = {
            isopen: false
        };
        //console.log($cookies.get('remember_me'));
        $scope.logout = function () {
            $localStorage.userInfo = null;
        }
    }
]);