(function () {
    "use strict";
    angular
        .module('reproductorModule')
        .config(audio);
    
    function audio(ksAudioProvider, Modernizr,Url) {
        /*console.log(ksAudioProvider);*/
        ksAudioProvider.defaults.src = Url.ruta;
        ksAudioProvider.defaults.enableAudio = Modernizr.audio;
        ksAudioProvider.defaults.enableAudioContext = (! Modernizr.touch) && Modernizr.webaudio;
        ksAudioProvider.defaults.autoplay = false;
    }

})();

