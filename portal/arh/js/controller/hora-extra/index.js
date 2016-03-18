adminApp.controller('ARHHoraExtraController', ['$scope', '$log', 'Mes', function ($scope, $log, Mes) {

	var meses = Mes.todos();
	var anos = [2016];
	var apuracoes = [];
	

	function inicia(){
	
		var apuracoes = [];
		
		var hoje = new Date();
		
		//cria os períodos de apuração
		anos.forEach(function(ano){
			
			if (ano == hoje.getFullYear()){
				
				for (var m = 1; m <= hoje.getMonth() + 1; m++){
					
					var mes = Mes.getByNumero(m);
					
					apuracoes.push({
						mes : mes,
						ano : ano
					});
					
				}
				
			}else{

				meses.forEach(function(mes){
					
					apuracoes.push({
						mes : mes,
						ano : ano
					});
					
				});
			
			}
			
		});
		
		$scope.apuracoes = apuracoes;
		
		$scope.apuracao = getUltimaApuracao(apuracoes);
		
		$scope.selecionaApuracao($scope.apuracao);
		
	
	}
	
	$scope.selecionaApuracao = function(apuracao){
		
		$log.debug('Selecionando apuracao', apuracao);
		
		$scope.apuracao = apuracao;
		
		criaPeriodo(apuracao);
		
		var ultimaData = getUltimaDataDeApuracao(apuracao);
		
		$scope.selecionaData(ultimaData);
		
	}
	
	$scope.selecionaData = function(data){
		
		var formataData = function(data){
			return data.toISOString().substring(0, 10);
		}
		
		$scope.fim = $scope.data = data;
		$scope.inicio = new Date(data.getFullYear(), data.getMonth(), 1);
		
	}
	
	
	function criaPeriodo(apuracao){
		
		var ultimaData = getUltimaDataDeApuracao(apuracao);
		
		var mes = apuracao.mes;
		var ano = apuracao.ano;
		
		var datas = [];
		
		$log.debug('ultimoDataMes', ultimaData);
		
		for (var d = 1; d <= ultimaData.getDate(); d++){
			datas.push(new Date(ano, mes.numero - 1, d));
		}
		
		$scope.datas = datas;
		
	}
	
	function getUltimaDataDeApuracao(apuracao){
		
		var mes = apuracao.mes;
		var ano = apuracao.ano;
		
		var hoje = new Date();
		var anoAtual = hoje.getFullYear();
		var mesAtual = hoje.getMonth() + 1;
		
		if (mesAtual == mes.numero && anoAtual == ano){
			hoje.setDate(hoje.getDate() - 1);
			return hoje;
		}
		
		return new Date(ano, mes.numero, 0);
	}
	
	function getUltimaApuracao(apuracoes){
		
		var hoje = new Date();
		
		var numeroMes = hoje.getMonth() + 1;
		var ano = hoje.getFullYear();
		
		return apuracoes.filter(function(a){return a.mes.numero == numeroMes && a.ano == ano})[0];
		
		
	}
	
	
	
	inicia();
	
	
}]);