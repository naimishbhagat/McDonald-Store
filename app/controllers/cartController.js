mcDonaldApp.controller('cartController', ['$scope','$state', '$http','$location','$localStorage','$window','$cookies','CartService',
    function ($scope,$state, $http,$location,$localStorage,$window,$cookies,CartService) {
        //load cart items
        CartService.load_data().then(function(response){
            $scope.cart = response;
        });

        $scope.total_cart = 0;

        $scope.pay = function () {
            if($localStorage.userInfo !=null){
                $state.go('app.payment');
            }else{
                $state.go('app.checkout');
            }
        };

        $scope.continue = function(){
            $state.go('app.menu');
        };

        $scope.item_total = function(item){
            var item_total = 0;
            item_total = item.qty * item.price;
            return '$'+parseFloat(item_total).toFixed(2);
        };

        $scope.sub_item_unit_total = function(item){
            var sub_item_total =0;
            angular.forEach(item.items, function (value) {
                sub_item_total += value.qty * value.price;
            });
            item.price = sub_item_total;
            return '$'+sub_item_total.toFixed(2);
        };

        $scope.sub_item_overall_total = function(item){
            var overall = 0, sub_item_total=0;
            angular.forEach(item.items, function (value) {
                sub_item_total += value.qty * value.price;
            });
            overall += item.qty * sub_item_total;
            return '$'+overall.toFixed(2);
        };

        $scope.total_cart = function(){
            var total = 0;
            angular.forEach($scope.cart, function (item) {
                total += (item.qty * item.price);
            });
            return '$'+total.toFixed(2);
        };

        $scope.clearCart = function () {
            CartService.clear_cart().then(function(response){
                $scope.cart = response;
            });
        };

        $scope.updateCart = function () {
            CartService.update_cart($scope.cart).then(function(response){
                $scope.cart = response;
            });
        };

        $scope.remove_item = function (id) {
            CartService.delete_item(id).then(function(response){
                $scope.cart = response;
            });
        };
    }
]);