mcDonaldApp.controller('dashboardController', ['$scope','$state', '$http','$location','$localStorage','$window','$cookies','OrderFactory',
    function ($scope,$state, $http,$location,$localStorage,$window,$cookies,OrderFactory) {
        $scope.userInfo = $localStorage.userInfo;
        $scope.user = {};

        OrderFactory.load_orders().then(function (response) {
            console.log(response);
            $scope.myOrders= response.list;
        });

        $scope.continue = function () {
            $state.go('app.menu');
        };

        $scope.reorder_meal = function (id) {

        }
    }
]);