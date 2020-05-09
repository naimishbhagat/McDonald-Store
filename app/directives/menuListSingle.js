mcDonaldApp.directive('menuListSingle', function($localStorage,$rootScope,$state) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            menu: "=menu"
        },
        link: function(scope,element,attr){
            scope.menu.qty = 0;
            if ($localStorage.cart == 'undefined' || $localStorage.cart == null) {
                $rootScope.cart = [];
                $localStorage.cart = [];
            } else {
                $rootScope.cart = $localStorage.cart;
            }
            scope.addtocart = function(selectedMenu){
                $localStorage.cart.push(selectedMenu);
            }
        },
        templateUrl: function(elm, attr){
            return "views/menu_list_single.html";
        }
    }
});