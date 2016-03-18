engitnaApp.factory('Categoria', function($resource) {
		
	   var URL = '/api/portal/engenharia/interna/categoria';
	   
	   return $resource(URL + '/:id', null,  {
		   
		   query : {
			   method : 'GET',
			   url : URL + '/busca',
			   isArray : true,
		   }
		   
	   });
	   
	   
});

