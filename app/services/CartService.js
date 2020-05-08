mcDonaldApp.factory("CartService", ['$rootScope','$http','$q',"$window",'$localStorage','$filter','$cookies',
    function($rootScope,$http,$q,$window,$localStorage,$filter,$cookies) {
        if ($localStorage.userInfo == 'undefined' || $localStorage.userInfo == null) {
            var userInfo = null;
        } else {
            var userInfo = $localStorage.userInfo;
        }
        return {}
    }
]);