(function () {
    "use strict";

    angular
        .module('homeModule')
        .controller('homeController', homeController);

    //Inyeccion de dependencias
    homeController.$inject = ['$stateParams','$http', '$state', 'appService'];

    function homeController($stateParams, $http, $state, appService) {

        var vm = this;    
        vm.search = search;
        vm.dataSearch;
        vm.data;
        vm.playAudio = playAudio;

        function search(){
            appService.search().save(	
            
                'query='+vm.dataSearch,    	
                function(response, headers){						
                    vm.data = response.data.data;
                    console.log(response.data.data);
                },
                function(error){
                    vm.errorServer = true;
                }
            );
        } 


        function playAudio(url) {
            // Play the audio file at url
            var my_media = new Media(url,
                // success callback
                function () {
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: " + err);
                }
            );
            // Play audio
            my_media.play();
        }
  

        
    }
    
})();