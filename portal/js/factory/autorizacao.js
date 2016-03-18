portalApp.factory('Autorizacao', ['$resource', 'URL_API', function($resource, URL_API) {

	   var URL = URL_API + '/acesso/autorizacao';
	   
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

