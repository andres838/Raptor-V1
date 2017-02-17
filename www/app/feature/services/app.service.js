(function(){
	'use strict';
	angular
		.module('starter')
		.service('appService',appService);

	appService.$inject = ['$resource'];	
	function appService($resource){
		var vm = this;
		vm.search = search;


		function search(){


			var CreditCard = $resource('http://23.105.70.100/Raptor/post/track/search/:cardId',
				{userId:123, cardId:'@id'}, {
				charge: {method:'POST', params:{query: 'daft punk'}}
			});
			return CreditCard;
			/*return $resource("http://23.105.70.100/Raptor/post/track/search/:id",
            {
                id:"@_id"
            },
            {
                'update': 
                { 
                    method:'PUT' 
                }
            });*/
		}

	}

})();