mcDonaldApp.controller('dashboardController', ['$scope','$state', '$http','$location','$localStorage','$filter','$cookies','OrderFactory',
    function ($scope,$state, $http,$location,$localStorage,$filter,$cookies,OrderFactory) {
        $scope.user = {};
        $scope.userInfo = $localStorage.userInfo;
        // load pre saved orders
        if($localStorage.orders == null){
            OrderFactory.load_orders().then(function (response) {
                $localStorage.orders = response.list;
                $scope.myOrders = $filter('filter')( response.list, {user_id: $localStorage.userInfo.id},true);
                $localStorage.myOrders = $scope.myOrders;
            });
        }else{
            $scope.myOrders = $localStorage.myOrders;
        }

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