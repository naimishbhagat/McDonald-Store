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

            //check if cart already have my-own meal
            scope.add_meal_if_not_exist = function(){
                var exist_menu = $filter('filter')( $localStorage.cart, {type: 'my-own'},true);
                if(exist_menu.length == 0){
                    $localStorage.cart.push($localStorage.my_meal);
                }
            };

            //check if same item exist either as meal or my-own meal item then add qty
            scope.add_qty_if_item_exist = function(items,selectedMenu){
                $filter('filter')(items, function(value, index, array) {
                    if(value.id == selectedMenu.id){
                        value.qty += selectedMenu.qty;
                        return value.qty;
                    }
                }, true);
            };

            scope.update_my_meal = function(my_meal){
                $filter('filter')( $localStorage.cart,  function(value, index, array) {
                    if(value.type == 'my-own'){
                        value = my_meal;
                        return value;
                    }
                }, true);
            };

            scope.calculate_price = function(items){
                var total = 0;
                angular.forEach(items , function(value) {
                    total += value.qty * value.price;
                });
                return total;
            };

            scope.addtocart = function(selectedMenu){
                if(selectedMenu.qty > 0){
                    var qty = scope.menu.qty;
                    //Add pre-set meal to cart
                    if(selectedMenu.meal_type == 'meal'){
                        var exist = $filter('filter')( $localStorage.cart, {id: selectedMenu.id},true);
                        if(exist.length >0 ){
                            scope.add_qty_if_item_exist($localStorage.cart,selectedMenu);
                        }else{
                            selectedMenu.qty = parseInt(qty);
                            $localStorage.cart.push(selectedMenu);
                        }
                    }else{
                        //create my own meal
                        scope.add_meal_if_not_exist();
                        var exist =  $filter('filter')( $localStorage.my_meal.items, {id: selectedMenu.id},true);
                        if(exist.length >0 ){
                            scope.add_qty_if_item_exist($localStorage.my_meal.items,selectedMenu);
                        }else{
                            $localStorage.my_meal.items.push(selectedMenu);
                         }
                        $localStorage.my_meal.price = scope.calculate_price($localStorage.my_meal.items);
                        scope.update_my_meal($localStorage.my_meal);
                    }

                    swal({ title: "Success!",text: 'Meal has been added to cart',  type: "success", showCancelButton: true,timer: 1000});
                }
            }
        },
        templateUrl: function(elm, attr){
            return "views/menu_list_single.html";
        }
    }
});