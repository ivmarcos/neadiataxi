curriculoApp.factory('InformacaoCurriculo', function($resource) {
		
	   URL = '/api/portal/curriculo/informacaoCurriculo';
	   
	   return $resource(URL + '/:id', null, {
		   
		   query : {
			   method : 'GET',
			   url : URL  + '/busca',
			   isArray : true
		   }
		   
	   });
});

