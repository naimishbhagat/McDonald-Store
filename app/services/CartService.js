mcDonaldApp.factory("CartService", ['$rootScope','$http','$q',"$window",'$localStorage','$filter','$cookies',
    function($rootScope,$http,$q,$window,$localStorage,$filter,$cookies) {

        return {
            load_data: load_data,
            clear_cart: clear_cart,
            update_cart: update_cart,
            delete_item: delete_item
        };

        //load cart items
        function load_data() {
            var deferred = $q.defer();
            if ($localStorage.cart == 'undefined' || $localStorage.cart == null) {
                $rootScope.cart = [];
                $localStorage.cart = [];
            } else {
                $rootScope.cart = $localStorage.cart;
                deferred.resolve($localStorage.cart);
            }
            return deferred.promise;
        }

        function clear_cart(){
            var deferred = $q.defer();
            $rootScope.cart = [];
            $localStorage.cart = [];
            deferred.resolve($localStorage.cart);
            return deferred.promise;
        }

        function update_cart(data){
            var deferred = $q.defer();
            $rootScope.cart = $localStorage.cart;
            $localStorage.cart = data;
            deferred.resolve($localStorage.cart);
            return deferred.promise;
        }

        function delete_item(id){
            var deferred = $q.defer();
            var users = $filter('filter')($rootScope.cart, function(value, index, array) {
                return (value.id !== id);
            }, true);
            $rootScope.cart = users;
            $localStorage.cart = users;
            deferred.resolve($localStorage.cart);
            return deferred.promise;
        }
    }
]);