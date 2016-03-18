adminApp.factory('ARHHoraExtra', ['$resource', function($resource) {

	var URL = '/api/portal/arh/horaExtra';
   
	return $resource(URL + '/:id', null, {
	   
		buscaGrupoPorPrefixo : {
			method : 'GET',
			url : URL + '/busca/grupo/prefixo',
			isArray : true
		},
		
		buscaGrupoPorUOR : {
			method : 'GET',
			url : URL + '/busca/grupo/uor',
			isArray : true
		},
		
		buscaGrupoPorFuncionario : {
			method : 'GET',
			url : URL + '/busca/grupo/funcionario',
			isArray : true
		},

		buscaOcorrenciaFuncionario : {
			method : 'GET',
			url : URL + '/busca/ocorrencia/funcionario',
			isArray : true
		},

		buscaConsolidado : {
			method : 'GET',
			url : URL + '/busca/consolidado',
			isArray : true
		},

		buscaTendencia : {
			method : 'GET',
			url : URL + '/busca/tendencia',
			isArray : true
		},
		
	});

	
}]);
