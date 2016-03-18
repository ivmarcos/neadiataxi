engitnaApp.controller('ListaCategoriaCadastroController',	['$scope', '$routeSegment', '$location', 'Categoria', function ($scope, $routeSegment, $location, Categoria){
	
	$scope.categorias = Categoria.query({include : ['all']});
	
	$scope.abre = function(routeId, categoria){
		var url = $routeSegment.getSegmentUrl(routeId, {id : categoria.id});
		$location.url(url);	
	};
	
}]);
