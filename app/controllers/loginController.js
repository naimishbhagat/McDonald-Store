mcDonaldApp.controller('loginController', ['$scope','$state', '$http','$location','$localStorage','$window','$cookies','AuthService',
    function ($scope,$state, $http,$location,$localStorage,$window,$cookies,AuthService) {
        $scope.userInfo = null;
        $localStorage.userInfo = null;
        $scope.user = {};
        if($cookies.get('remember_me')){
            $scope.user.remember = true;
            $scope.user.username = $cookies.get('user_name');
            $scope.user.password = $cookies.get('user_password');
        }

        jQuery.validator.addMethod("pwcheck", function(value) {
            return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
                && /[a-z]/.test(value) // has a lowercase letter
                && /\d/.test(value) // has a digit
        });
        jQuery.validator.addMethod("emailcheck", function(value) {
            var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value);
        }, 'Please enter a valid email address.');
        $scope.validationOptions = {
            rules: {
                username: {
                    required: true,
                    emailcheck:true
                },
                password: {
                    required: true,
                    minlength: 6,
                    //pwcheck: true
                },
            },
            messages: {
                email: {
                    required: "We need your email address to contact you",
                    email: "Your email address must be in the format of name@domain.com"
                },
                password: {
                    required: "You must enter a password",
                    minlength: "Your password must have a minimum length of 6 characters",
                    pwcheck: "Your password must have a minimum one letter capital and special character"
                }
            }
        };
        $scope.login = function(form){
            if(form.validate()) {
                AuthService.login($scope.user.username, $scope.user.password).then(function () {
                    $state.go('app.dashboard', {}, {reload: true});
                }, function (error) {
                    swal({ title: "Error!",text: error,  type: "error", showCancelButton: true,timer: 2000});
                });
            }
        };

    }
]);