engitnaApp.controller('ListaAcessoCadastroController',	['$scope', '$routeSegment', '$location', 'AcessoEngenhariaInterna', function ($scope, $routeSegment, $location, AcessoEngenhariaInterna){
	
	$scope.autorizacoes = AcessoEngenhariaInterna.buscaAutorizacoes({'include' : ['usuario'], 'attributes[usuario]' : ['id', 'nome']});
	
		
}]);
