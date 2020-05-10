mcDonaldApp.controller('navController', ['$scope', '$http','$rootScope','$location','$state','$localStorage',
    function ($scope, $http,$rootScope,$location,$state,$localStorage) {
        $scope.userInfo = $localStorage.userInfo;
        $scope.status = {
            isopen: false
        };

        $scope.logout = function () {
            $localStorage.userInfo = null;
            $localStorage.orders = null;
            $localStorage.myOrders = null;
            $state.go('app.home', {}, {reload: true});
        }
    }
]);