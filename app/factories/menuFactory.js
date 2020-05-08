mcDonaldApp.factory('MenuFactory', function ($resource) {
    var functions = {};
    functions.load_menu = function() {
        var data_url = "data/pre-set-meals.json";
        var resource = $resource(data_url, {}, http_config);
        return resource.get_raw().$promise;
    };

    return functions;
});