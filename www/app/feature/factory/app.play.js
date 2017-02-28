(function(){
	'use strict';
	angular
		.module('starter')
		.factory('repFactory',repFactory);
        repFactory.$inject = [];	
        function repFactory(){
            var rep = this;
            rep.play = play;
            
            function play(url){	
                
            }

	    }

})();


