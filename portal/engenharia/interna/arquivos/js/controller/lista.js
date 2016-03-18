engitnaApp.controller('ListaController',['$scope', '$routeSegment', 'Arquivo', function ($scope, $routeSegment, Arquivo){
	
	var publico = /^publico/.test($routeSegment.name);
		
	function inicia(){
		
		if (publico){
			$scope.arquivos = Arquivo.buscaPublicos({ativo : true});
		}else{
			$scope.arquivos = Arquivo.buscaRestritos({ativo : true});
		}
	}

	inicia();
	
}]);
