mcDonaldApp.controller('dashboardController', ['$scope','$state', '$http','$location','$localStorage','$filter','$cookies','OrderFactory',
    function ($scope,$state, $http,$location,$localStorage,$filter,$cookies,OrderFactory) {
        $scope.userInfo = $localStorage.userInfo;
        $scope.user = {};

        OrderFactory.load_orders().then(function (response) {
            $scope.myOrders= response.list;
        });

        $scope.continue = function () {
            $state.go('app.menu');
        };

        $scope.reorder_meal = function (id) {
            if ($localStorage.cart == 'undefined' || $localStorage.cart == null) {
                $localStorage.cart = [];
            }
            var order =  $filter('filter')( $scope.myOrders, {id: id},true);
            var selectedMenu = order[0].meal;
            console.log(selectedMenu);
            $localStorage.cart.push(selectedMenu);

        }
    }
]);