portalApp.factory('Noticia', function($resource) {
		
	   var URL = '/api/portal/noticia';
	   
	   return $resource(URL + '/:id', null, {
		   
		   buscaPorValor : {
			   method : 'GET',
			   url : URL + '/busca/valor',
			   isArray : true,
			   cache : true
		   }
		   
	   });
	   
});

