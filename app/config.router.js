'use strict';

/**
 * Config for the router
 */
mcDonaldApp.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider',
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider) {

        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;

        // LAZY MODULES

        /*$ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });*/

        // APPLICATION ROUTES
        // -----------------------------------
        // For any unmatched url, redirect to /app/dashboard
        $urlRouterProvider.otherwise("/");
        //
        // Set up the states
        $stateProvider.state('app', {
            url: "",
            templateUrl: "views/app.html",
            abstract: true
        }).state('app.home', {
            url: "/",
            templateUrl: "views/home.html",
            title: 'Home',
        }).state('app.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            title: 'Dashboard',
        }).state('app.menu', {
            url: "/menu",
            templateUrl: "views/menu.html",
            title: 'Dashboard',
        }).state('app.cart', {
            url: "/cart",
            templateUrl: "views/cart.html",
            title: 'Cart',
        }).state('app.checkout', {
            url: "/checkout",
            templateUrl: "views/checkout.html",
            title: 'Checkout',
        }).state('app.payment', {
            url: "/payment",
            templateUrl: "views/payment.html",
            title: 'Checkout',
        }).state('app.thank_you', {
            url: "/thank-you",
            templateUrl: "views/thank-you.html",
            title: 'Checkout',
        }).state('error', {
            url: '/error',
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('error.404', {
            url: '/404',
            templateUrl: "assets/views/utility_404.html",
        }).state('error.500', {
            url: '/500',
            templateUrl: "assets/views/utility_500.html",
        }).state('app.login', {
            url: '/signin',
            templateUrl: "views/login.html"
        });
    }]);