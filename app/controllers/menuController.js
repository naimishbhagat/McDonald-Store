mcDonaldApp.controller('menuController', ['$scope','$state', '$http','$location','$localStorage','$window','$cookies','MenuFactory',
    function ($scope,$state, $http,$location,$localStorage,$window,$cookies,MenuFactory) {
        //load all the menu from menu data
        MenuFactory.load_menu().then(function(response) {
            $scope.menus = response.list;
        });
    }
]);