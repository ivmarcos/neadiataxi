portalApp.factory('UORGrupo', function($resource) {
		
	   var URL = '/api/global/uor'; 
	   
	   return $resource(URL + '/:id', null, { 
		   
		   query : {
			   isArray: true,
			   cache : true,
			   url : URL + '/busca'
		   }
	   });
	   
	   
});

