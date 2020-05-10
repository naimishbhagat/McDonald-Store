'use strict';
/**
 * Main Controller
 */
mcDonaldApp.controller('mainCtrl', ['$rootScope', '$scope', '$state', '$localStorage', '$window', '$document', '$timeout','$templateCache','$cookies','$cookieStore','$filter','userFactory',
    function($rootScope, $scope, $state, $localStorage, $window, $document, $timeout,$templateCache,$cookies,$cookieStore,$filter,userFactory) {

        // Loading bar transition
        // -----------------------------------
        var $win = $($window);

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            //start loading bar on stateChangeStart
            $rootScope.loggedin = false;
            $rootScope.cart = [];
            $rootScope.role = '';
            if (toState.external) {
                event.preventDefault();
                $window.open(toState.url, '_self');
            }
        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //stop loading bar on stateChangeSuccess
            event.targetScope.$watch("$viewContentLoaded", function() {
                console.log('sdds');
               // cfpLoadingBar.complete();
            });

            // scroll top the page on change state
            $('#app .main-content').css({
                position : 'relative',
                top : 'auto'
            });

            console.log($localStorage.userInfo);
            if($localStorage.userInfo != null){
                $rootScope.userInfo = $localStorage.userInfo;
            }else{
                $rootScope.userInfo = null;
            }

            if ($localStorage.cart == 'undefined' || $localStorage.cart == null) {
                $rootScope.cart = [];
                $localStorage.cart = [];
            } else {
                $rootScope.cart = $localStorage.cart;
            }


            console.log($localStorage.users);

            //As we are using localstorage for existing users

            $('footer').show();

            window.scrollTo(0, 0);

            if (angular.element('.email-reader').length) {
                angular.element('.email-reader').animate({
                    scrollTop : 100
                }, 0);
            }

            // Save the route title
            $rootScope.currTitle = $state.current.title;

        });

        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error)  {
            if (error.authenticated == false) {
                $localStorage.userInfo = null;
                $state.go("app.login");
            }
            if (error.permissiondenied == true) {
                console.log('You are not allowed to view this page.');
                $state.go("app.dashboard");
            }
        });

        // State not found
        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams,error) {
            console.log(error);
            //$rootScope.loading = false;
            console.log(unfoundState.to);
            // "lazy.state"
            console.log(unfoundState.toParams);
            // {a:1, b:2}
            console.log(unfoundState.options);
            // {inherit:false} + default options
        });

        $scope.load_users = function(){
            if ($localStorage.users == 'undefined' || $localStorage.users == null || $localStorage.users.length == 0) {
                userFactory.load_users().then(function (response) {
                    $localStorage.users = response.list;
                });
            }
        };
        $scope.load_users();

        $rootScope.pageTitle = function() {
            return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        };

        // save settings to local storage
        if (angular.isDefined($localStorage.layout)) {
            $scope.app.layout = $localStorage.layout;

        } else {
            $localStorage.layout = $scope.app.layout;
        }
        $scope.$watch('app.layout', function() {
            // save to local storage
            $localStorage.layout = $scope.app.layout;
        }, true);

        //global function to scroll page up
        $scope.toTheTop = function() {
            $document.scrollTopAnimated(0, 600);
        };

        // angular translate
        // ----------------------

        // Function that find the exact height and width of the viewport in a cross-browser way
        var viewport = function() {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {
                width : e[a + 'Width'],
                height : e[a + 'Height']
            };
        };
        // function that adds information in a scope of the height and width of the page
        $scope.getWindowDimensions = function() {
            return {
                'h' : viewport().height,
                'w' : viewport().width
            };
        };
        // Detect when window is resized and set some variables
        $scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
            $scope.windowHeight = newValue.h;
            $scope.windowWidth = newValue.w;

            if (newValue.w >= 992) {
                $scope.isLargeDevice = true;
            } else {
                $scope.isLargeDevice = false;
            }
            if (newValue.w < 992) {
                $scope.isSmallDevice = true;
            } else {
                $scope.isSmallDevice = false;
            }
            if (newValue.w <= 768) {
                $scope.isMobileDevice = true;
            } else {
                $scope.isMobileDevice = false;
            }
        }, true);

        document.addEventListener('mousedown', function (event) {
            if (event.detail > 1) {
                event.preventDefault();
            }
        }, false);

        // Apply on resize
        $win.on('resize', function() {
            $scope.$apply();
            if ($scope.isLargeDevice) {
                $('#app .main-content').css({
                    position : 'relative',
                    top : 'auto',
                    width: 'auto'
                });
                $('footer').show();
            }
        });
    }]);
