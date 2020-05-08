mcDonaldApp.directive('menuListSingle', function($localStorage,$state) {
    return {
        restrict: 'E',
        scope: {
            menu: "=menu"
        },
        link: function(scope,element){
            scope.addtocart = function(selectedMenu){
                console.log(selectedMenu);
            }
        },
        templateUrl: function(elm, attr){
            return "views/menu_list_single.html";
        }
    }
});