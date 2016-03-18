engitnaApp.controller('EdicaoCategoriaCadastroController', ['$scope', '$routeSegment', '$location', 'Categoria', 'Restricao', function ($scope, $routeSegment, $location, Categoria, Restricao){
	
	var id = $routeSegment.$routeParams.id;
	
	$scope.alertas = [];
	
	$scope.restricoes = Restricao.todas();
	
	$scope.novo = function(routeId){
		
		if (routeId){
			var url = $routeSegment.getSegmentUrl(routeId, {id : 'novo'});
			$location.url(url);
		}
		
		$scope.categoria = new Categoria();
		
	}
	
	
	function inicia(){
		
		var novo = id == 'nova';
		
		if (novo){
			$scope.novo();
		}else{
			$scope.categoria = Categoria.get({id : id, include : ['all']});
		}
	
	}
	
	function adicionaAlerta(alerta){
		var existe =  $scope.alertas.filter(function(a){return a.msg == alerta.msg})[0];
		if (!existe) $scope.alertas.push(alerta);
	}
	
	$scope.fechaAlerta = function(index){
		console.log('index', index);
		$scope.alertas.splice(index, 1);
	}
		
	$scope.aposSelecionar = function($files){
		console.log($files);
		var file = $files[0];
		$scope.categoriaSelecionado = file;
	};
	
	$scope.salva = function(){
		$scope.categoria.$save(
		function(){
			adicionaAlerta({msg : 'Categoria salva com sucesso.', tipo : 'success'});
		}, 
		function(err){
			adicionaAlerta({msg : 'Houve um erro ao tentar salvar a categoria.', tipo : 'danger'});
		});
	}
		
	inicia();
	
}]);
