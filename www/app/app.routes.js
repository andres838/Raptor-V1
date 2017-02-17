(function () {
    "use strict";
    angular
        .module('starter')
        .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function routes($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "app/feature/menu/menu.view.html",
                controller: "menuController as menu",
            })
            
            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent' :{
                        templateUrl: "app/feature/home/home.view.html",
                        controller: "homeController as home"
                    }
                }  
            })
            .state('swipe', {
                url: "/swipe",
                templateUrl: "app/feature/swipe/swipe.view.html",
                controller: "swipeController as swipe"
            });

        $urlRouterProvider.otherwise('/app/home');
    }

})();