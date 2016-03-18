portalApp.factory('Dependencia', function($resource) {
		
	   var URL = '/api/global/dependencia';
	   
	   return $resource(URL + '/:id', null, {
		   
		   buscaPorValor : {
			   method : 'GET',
			   url : URL + '/busca/valor',
			   isArray : true,
			   cache : true
		   }
		   
	   });
	   
});

