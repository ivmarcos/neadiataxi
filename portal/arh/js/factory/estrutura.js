adminApp.factory('ARHEstrutura', ['$resource', function($resource) {

	   var URL = '/api/portal/arh/estrutura';
	   
	   return $resource(URL + '/:id', null, {
		   
		   	buscaDados : {
		   	   method : 'GET',
			   url : URL + '/busca/dados',
			   isArray : true
		   	},
		   	
		   	buscaApuracoes : {
		   	   method : 'GET',
			   url : URL + '/busca/apuracoes',
			   isArray : true
		   	},
			
			buscaAjustesPorTempo : {
		   	   method : 'GET',
			   url : URL + '/busca/ajustes/tempo',
			   isArray : true
			},
			
			buscaFuncionarios : {
		   	   method : 'GET',
			   url : URL + '/busca/funcionarios',
			   isArray : true
			},
			
			buscaDadosSubordinacao : {
				method : 'GET',
				url : URL + '/busca/dados/subordinacao',
				isArray : true
			},
			
			buscaQuadroPorComissao : {
				method : 'GET',
				url : URL + '/busca/quadro/comissao',
				isArray : true
			},
			
			buscaQuadroPorPrefixo : {
				method : 'GET',
				url : URL + '/busca/quadro/prefixo',
				isArray : true
			},
			
			buscaQuadroPorComissaoEPrefixo : {
				method : 'GET',
				url : URL + '/busca/quadro/comissao/prefixo',
				isArray : true
			}
		   	
	   });
	   
	   
	
}]);

