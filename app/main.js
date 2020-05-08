var mcDonaldApp = angular.module('mcDonaldApp', ['mcDonald-store']);
mcDonaldApp.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'McDonald Store', // name of your project
            author: 'Naimish Bhagat', // author's name or company name
            logo: 'images/logo.png', // relative path of the project logo
            description: 'Angular Bootstrap', // brief description
            version: '1.0', // current version
            year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
            isMobile: (function() { // true if the browser is a mobile device
                var check = false;
                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                };
                return check;
            })(),
            layout: {
                isNavbarFixed: true, //true if you want to initialize the template with fixed header
                isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
                isFooterFixed: false, // true if you want to initialize the template with fixed footer
                theme: 'theme-1' // indicate the theme chosen for your project
            },
        };
    }]);

mcDonaldApp.config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});