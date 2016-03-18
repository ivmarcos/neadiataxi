engitnaApp.controller('EdicaoArquivoCadastroController', ['$scope', '$routeSegment', '$location', '$timeout', 'Arquivo', 'Categoria', function ($scope, $routeSegment, $location, $timeout, Arquivo, Categoria){
	
	var id = $routeSegment.$routeParams.id;
	
	$scope.alertas = [];
	
	$scope.tamanhoLimite = 100 * 1024 * 1024; //100mb
	
	$scope.categorias = Categoria.query();
	
	$scope.novo = function(routeId){
		
		if (routeId){
			var url = $routeSegment.getSegmentUrl(routeId, {id : 'novo'});
			$location.url(url);
		}
		
		$scope.arquivo = new Arquivo({ativo : true});
		$scope.arquivoSelecionado = null;
		
	}
	
	$scope.salva = function(){
		
		$scope.alertas = [];
		
		console.log()
		
		var novo = !$scope.arquivo.arquivo_id;
		
		if (novo) {
			upload();
		}else{
			altera();
		}
		
	}
	
	function inicia(){
		
		var novo = id == 'novo';
		
		if (novo){
			$scope.novo();
		}else{
			$scope.arquivo = Arquivo.get({id : id, include : ['all']});
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
		$scope.arquivoSelecionado = file;
	};
	
	function altera(){
		$scope.arquivo.$save(
		function(){
			adicionaAlerta({msg : 'Arquivo salvo com sucesso.', tipo : 'success'});
		}, 
		function(err){
			adicionaAlerta({msg : 'Houve um erro ao tentar salvar o arquivo.', tipo : 'danger'});
		});
	}
	
	function upload(){
		
		$scope.enviando = true;
		
		Arquivo.upload({
			data : {
				arquivo : $scope.arquivo
			},
			file : $scope.arquivoSelecionado
		})
		.progress(function(evt){
			$scope.progresso = parseInt(100.0 * evt.loaded / evt.total);
			if ($scope.progresso == 100){
				$timeout(function(){
					$scope.enviando = false;
				}, 250);
			}
		})
		.success(function(arquivo){
			adicionaAlerta({msg : 'Arquivo salvo com sucesso.', tipo : 'success'});
		});
		
	};	
	
	inicia();
	
}]);
