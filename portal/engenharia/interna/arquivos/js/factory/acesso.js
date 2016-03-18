engitnaApp.factory('AcessoPPA', ['$resource', function($resource) {
		
	   var URL = '/api/ppa/acesso';
	   
	   return $resource(URL + '/:id', null, {
		   
			buscaAutorizacoes : {
			   method : 'GET',
			   url : URL + '/busca/autorizacoes',
			   isArray : true
		   },
		   
		   
	   });
	   
}]);

