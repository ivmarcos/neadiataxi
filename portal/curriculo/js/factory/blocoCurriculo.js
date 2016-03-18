curriculoApp.factory('BlocoCurriculo', function($resource) {
		
	   URL = '/api/portal/curriculo/blocoCurriculo';
	   
	   return $resource(URL + '/:id', null, {
		   
		   query : {
			   method : 'GET',
			   url : URL  + '/busca',
			   isArray : true
		   }
		   
	   });
});

