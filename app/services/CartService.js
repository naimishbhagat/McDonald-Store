mcDonaldApp.factory("CartService", ['$rootScope','$http','$q',"$window",'$localStorage','$filter','$cookies',
    function($rootScope,$http,$q,$window,$localStorage,$filter,$cookies) {

        return {
            load_data: load_data,
            add_item: add_item,
            update_item: update_item,
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

        function add_item(){

        }


        function update_item(){

        }

        function delete_item(){

        }
    }
]);