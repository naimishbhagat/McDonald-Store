mcDonaldApp.directive('menuListSingle', function($localStorage,$rootScope,$state,$filter) {
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
                var exist =  $filter('filter')( $localStorage.cart, {id: selectedMenu.id},true);
                if(exist.length >0 ){
                    $filter('filter')($localStorage.cart, function(value, index, array) {
                        if(value.id == selectedMenu.id){
                            value.qty += selectedMenu.qty;
                            return value.qty;
                        }
                    }, true);
                }else{
                    $localStorage.cart.push(selectedMenu);
                }
            }
        },
        templateUrl: function(elm, attr){
            return "views/menu_list_single.html";
        }
    }
});