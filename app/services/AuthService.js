mcDonaldApp.factory("AuthService", ['$rootScope','$http','$q',"$window",'$localStorage','$filter','$cookies','userFactory',
    function($rootScope,$http,$q,$window,$localStorage,$filter,$cookies,userFactory) {

        if($localStorage.userInfo == 'undefined' || $localStorage.userInfo == null){
            var userInfo = null;
        }else{
            var userInfo = $localStorage.userInfo;
        }

        init();

        return {
            login: login,
            logout: logout,
            getUserOrders: getUserOrders
        };

        function login(username, password) {
            var deferred = $q.defer();

            userFactory.load_users().then(function(response) {
                if( $localStorage.users == 'undefined' || $localStorage.users == null){
                    var users = response.list;
                }else{
                    var users = $localStorage.users;
                }
                var users = $filter('filter')(users, {email: username, password: password},true);
                if(users.length > 0 && users.length >! 2){
                    var userInfo = users[0];
                    $cookies.put("user_name",username);
                    $cookies.put("user_password",password);
                    $localStorage.userInfo = userInfo;
                    deferred.resolve(userInfo);
                }else{
                    var error = 'User not found';
                    deferred.reject(error);
                }
            });

            return deferred.promise;
        }

        function getUserOrders(){
            var deferred = $q.defer();
            var profile_id = $localStorage.userInfo.registereduser.profile_id;
            OrderFactory.read(profile_id).then(function(response) {
                if (response.success) {
                    deferred.resolve($rootScope.user_profile);
                }
            });
            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            userInfo = null;
            $localStorage.userInfo = userInfo;
            reset();
            deferred.resolve(userInfo);
            return deferred.promise;
        }

        function getUserInfo() {
            return $localStorage.userInfo;
        }

        function reset(){
            $rootScope.cart = 0;
        }

        function init() {
            if ($localStorage.userInfo) {
                userInfo = $localStorage.userInfo;
            }
        }
    }
]);