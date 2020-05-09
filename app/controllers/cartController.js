mcDonaldApp.controller('cartController', ['$scope','$state', '$http','$location','$localStorage','$window','$cookies','CartService',
    function ($scope,$state, $http,$location,$localStorage,$window,$cookies,CartService) {
        //load cart items
        CartService.load_data().then(function(response){
            $scope.cart = response;
        });

        $scope.total_cart = 0;
        $scope.pay = function () {
            $state.go('app.checkout');
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