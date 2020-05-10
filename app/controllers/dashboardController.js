mcDonaldApp.controller('dashboardController', ['$scope','$state', '$http','$location','$localStorage','$filter','$cookies','OrderFactory',
    function ($scope,$state, $http,$location,$localStorage,$filter,$cookies,OrderFactory) {
        $scope.user = {};
        // load pre saved orders
        OrderFactory.load_orders().then(function (response) {
            $scope.myOrders=   $filter('filter')( response.list, {user_id: $scope.userInfo.id},true);
        });

        $scope.continue = function () {
            $state.go('app.menu');
        };

        //Reorder from saved meals
        $scope.reorder_meal = function (id) {
            if ($localStorage.cart == 'undefined' || $localStorage.cart == null) {
                $localStorage.cart = [];
            }
            var order =  $filter('filter')( $scope.myOrders, {id: id},true);
            var selectedMenu = order[0].meal;
            var exist =  $filter('filter')( $localStorage.cart, {id: id},true);
            $localStorage.cart.push(selectedMenu);

        }
    }
]);