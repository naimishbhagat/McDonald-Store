mcDonaldApp.controller('menuController', ['$scope','$state', '$http','$location','$localStorage','$window','$cookies','MenuFactory',
    function ($scope,$state, $http,$location,$localStorage,$window,$cookies,MenuFactory) {
        MenuFactory.load_menu().then(function(response) {
            $scope.menus = response.list;
        });
    }
]);