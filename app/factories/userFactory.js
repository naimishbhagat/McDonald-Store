mcDonaldApp.factory('userFactory', function ($resource) {
    var functions = {};
    functions.load_users = function() {
        var data_url = "data/users.json";
        var resource = $resource(data_url, {}, http_config);
        return resource.get_raw().$promise;
    };

    return functions;
});