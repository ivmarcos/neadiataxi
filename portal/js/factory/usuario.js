portalApp.factory('Usuario', function($resource) {
		
	   var URL = '/api/global/usuario';
	   
	   return $resource(URL + '/:id', null, {
		   
		   query : {
				method : 'GET',
				url : URL + '/busca',
				isArray : true,
		   },
		   
		   buscaPorValor : {
			   method : 'GET',
			   url : URL + '/busca/valor',
			   isArray : true,
			   cache : true
		   }
		   
	   });
	   
});

