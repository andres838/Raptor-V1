(function () {
    "use strict";

    angular
        .module('reproductorModule')
        .controller('reproductorController', reproductorController);

    //Inyeccion de dependencias
    reproductorController.$inject = ['$stateParams', '$state'];

    function reproductorController($stateParams, $state) {

        var vm = this;

        
    }
})();