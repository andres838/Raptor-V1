(function () {
    "use strict";

    angular
        .module('menuModule')
        .controller('menuController', menuController);

    //Inyeccion de dependencias
    menuController.$inject = ['$stateParams', '$state'];

    function menuController($stateParams, $state) {

        var vm = this;

        
    }
})();