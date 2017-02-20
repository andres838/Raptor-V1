(function () {
    "use strict";

    angular
        .module('homeModule')
        .controller('homeController', homeController);

            //Inyeccion de dependencias
            homeController.$inject = ['$stateParams','$http', '$state', 'appService', '$timeout'];

            function homeController($stateParams, $http, $state, appService,timeout ) {

            var vm = this;    
            vm.search = search;
            vm.dataSearch;
            vm.data;
            /*vm.playAudio = playAudio;*/

            document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
                vm.id = device.uuid;
                var data = 'id=' + vm.id;
                appService.insertUser(data).then(function(response){
                    console.log(response);
                });
                
            }


            appService.suggested().then(function(response){
                vm.data = response.data.data.data; 
            });

            function search(){
                var data = 'query='+vm.dataSearch;
                appService.search(data).then(function(response){
                    vm.data = response.data.data.data; 
                });
            }                                  
    }
    
})();