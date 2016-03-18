portalApp.factory('Arquivo', function($resource) {
		
	   var URL = '/api/arquivo/arquivo'; 
	   
	   return $resource(URL + '/:id', null, { 
		   
		   query : {
			   isArray: true,
			   cache : true,
			   url : URL + '/busca'
		   }
		   
	   });
	   
	   
});

