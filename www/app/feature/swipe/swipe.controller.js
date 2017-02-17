"use strict";

angular
    .module('swipeModule')
    .controller('swipeController', swipeController);

//Inyeccion de dependencias
swipeController.$inject = ['$stateParams'];

function swipeController($stateParams) {
    var vm = this;

}