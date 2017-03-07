(function(){
	'use strict';

	angular
		.module('reproductorModule')
		.constant('Modernizr', window.Modernizr)
        .constant('Url', {
            ruta : 'http://cdn-preview-1.deezer.com/stream/110ff60b8767dedaaadbd37ffcd7a752-3.mp3'
        })
        .run(run);

        function run(){

        }

        
})

();