(function() {
"use strict";

angular
    .module('starter')
    .run(run);

run.$inject = ['$rootScope','$ionicPlatform'];

function run($rootScope, $ionicPlatform) {
    /*var bind = Function.prototype.bind;
    $rootScope.$on('$stateChangeSuccess', handleStateChangeSuccess);

    function handleStateChangeSuccess(event, toState, toParams) {
        Function.prototype.bind = bind;
    }*/
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

    });
}
})();


