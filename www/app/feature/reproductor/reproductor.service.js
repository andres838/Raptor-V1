(function () {
    "use strict";

    angular
        .module('reproductorModule')
        .service('reproductorService', reproductorService);

        //Inyeccion de dependencias
        reproductorService.$inject = ['ksAudio'];

        function reproductorService(ksAudio, Modernizr) {
            var self = this;
            self.url = "http://cdn-preview-1.deezer.com/stream/110ff60b8767dedaaadbd37ffcd7a752-3.mp3"; 
        }
})();