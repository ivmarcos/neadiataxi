portalApp.factory('Acesso', ['$resource', 'CacheFactory', 'URL_API', function($resource, CacheFactory, URL_API) {

	   var URL = URL_API + '/acesso';
	   
	   return $resource(URL + '/:id', null, {
		   
		   	transacao : {
		   	   method : 'GET',
			   url : URL + '/transacao/:transacao',
		   	},
		   	
	   		transacoesAutorizadas : {
	   			method : 'GET',
	   			url : URL + '/transacoes/autorizadas',
	   			isArray : true,
	   		}
	   });
	   
	   
	
}]);

