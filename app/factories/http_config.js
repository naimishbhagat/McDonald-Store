var http_config = {
    get:{
        method: "GET",
        headers : {"Content-Type": "application/json"},
        transformRequest: function(data, headers){
            return angular.toJson(data);
        }
    },
    query:{
        method: 'GET',
        isArray: false
    },
    get_raw:{
        method: 'GET',
        transformResponse: function (data) {
            return {list: angular.fromJson(data)}
        }
    },
    update: {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        transformRequest: function(data,headers){
            return angular.toJson(data);
        }
    },
    upload: {
        method: "POST",
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
    },
    download:{
        method: "GET",
        headers : {"Content-Type": "application/json"},
        transformRequest: function(data, headers){
            return angular.toJson(data);
        },
        transformResponse: function(data, headers) {
            return {
                data: data,
                mime_type: function(headers) {
                    return headers('content-type');
                }
            }
        }
    },
    save: {
        method: "POST",
        headers : {"Content-Type": "application/json"},
        transformRequest : function(data) {
            return angular.toJson(data);
        }
    }
};

mcDonaldApp.directive('uiDatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'dd-mm-yy',
                minDate: new Date(),
                onSelect: function (date) {
                    ngModelCtrl.$setViewValue(date);
                    ngModelCtrl.$render();
                    //scope.date = date;
                    scope.$apply();
                }
            });
        }
    };
});
