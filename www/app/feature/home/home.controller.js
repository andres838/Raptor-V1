(function () {
    "use strict";

    angular
        .module('homeModule')
        .controller('homeController', homeController);

    //Inyeccion de dependencias
    homeController.$inject = ['$stateParams', '$state', '$http'];

    function homeController($stateParams, $state, $http) {

        var vm = this;


        $http({
            data:  {id:"67238735"},
            method: 'POST',
            url: 'http://23.105.70.100/Raptor/post/track/getInfo'
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        /*appService.search().query(		
            {
                query: 'daft punk'
            },		
            function(response, headers){						
               console.log(response); 
            },
            function(error){
                vm.errorServer = true;
            }
        );*/
    }
    
})();