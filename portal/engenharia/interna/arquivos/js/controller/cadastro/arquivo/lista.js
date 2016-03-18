engitnaApp.controller('ListaArquivoCadastroController',	['$scope', '$routeSegment', '$location', 'Arquivo', function ($scope, $routeSegment, $location, Arquivo){
	
	$scope.arquivos = Arquivo.query({include : ['all']});
	
	$scope.abre = function(routeId, arquivo){
		var url = $routeSegment.getSegmentUrl(routeId, {id : arquivo.arquivo_id});
		$location.url(url);	
	}
	
}]);
