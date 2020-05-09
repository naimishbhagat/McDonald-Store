mcDonaldApp.controller('cartController', ['$scope','$state', '$http','$location','$localStorage','$window','$cookies','CartService',
    function ($scope,$state, $http,$location,$localStorage,$window,$cookies,CartService) {
        //load cart items
        CartService.load_data().then(function(response){
            $scope.cart = response;
        });

        $scope.total_cart = 0;
    }
]);