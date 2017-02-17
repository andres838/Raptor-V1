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


			return  $resource('http://23.105.70.100/Raptor/post/track/search/:id',
				{
					 id:'@id'
				}, 
				{
					save: {
						method:'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						
						isArray: false
				}
			});
		}

	}

})();