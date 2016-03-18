curriculoApp.controller('CurriculoController', ['$scope', '$log', '$routeSegment', 'Sessao', 'BlocoCurriculo', 'InformacaoCurriculo', function($scope, $log, $routeSegment, Sessao, BlocoCurriculo, InformacaoCurriculo){

	function inicia(){
		
		Sessao.usuario().then(function(usuario){
			
			$scope.usuario = usuario;
			
			buscaDados(usuario);
			
		});
		
	}
	
	function buscaDados(usuario){
		
		BlocoCurriculo.query(function(blocos){
			
			var params = {
				usuario_id : usuario.id
			}
			
			//busca as informações registradas pelo usuário e vincula aos blocos de informação
			InformacaoCurriculo.query(params, function(informacoes){
				
				informacoes.forEach(function(informacao){
					
					//busca o bloco associado à informação e realiza o vínculo
					var bloco = blocos.filter(function(b){return b.id == informacao.blocoCurriculo_id})[0];
					
					if (!bloco._informacoes) {
						bloco._informacoes = [];
					}
						
					bloco._informacoes.push(informacao);
					
					
				});
				
			});
			
			$scope.blocos = blocos;
			
		});
		
	}
	
	function getBloco(informacao){
		return $scope.blocos.filter(function(b){return b.id == informacao.blocoCurriculo_id})[0];
	}
	
	$scope.nova = function(bloco){
		
		bloco._editando = true;
		
		bloco._informacao = new InformacaoCurriculo({
			blocoCurriculo_id 		: bloco.id,
			usuario_id				: $scope.usuario.id,
		});
		
	}
	
	
	
	$scope.adiciona = function(bloco){
		
		$log.debug('Adicionando...', bloco);
		
		bloco._editando = false;
		
		bloco._informacao.$save(
			
			function sucesso(salva){
				
				if (!bloco._informacoes) bloco._informacoes = [];
				
				var anterior = bloco._informacoes.filter(function(i){return i.id == salva.id;})[0];
				
				if (anterior){

					for (var p in salva){
						anterior[p] = salva[p];
					}
					
				}else{
					
					bloco._informacoes.push(salva);
					
				}
				
			}

		);
		
	}
	
	$scope.edita = function(informacao){
		
		var bloco = getBloco(informacao);
		
		bloco._editando = true;
		
		bloco._informacao = informacao;
		
	}
	
	$scope.remove = function(informacao){

		var bloco = getBloco(informacao);
		
		$log.debug('Removendo do bloco', bloco);
	
		var index = bloco._informacoes.indexOf(informacao);
		
		informacao.$remove({id : informacao.id},
				
			function sucesso(){
				
				bloco._informacoes.splice(index, 1);
				
			}
		
		);
		
	}
	
	inicia();
	
}]);


