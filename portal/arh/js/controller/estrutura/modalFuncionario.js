adminApp.controller('ARHEstruturaModalFuncionarioController', ['$scope', '$log', '$uibModalInstance', 'ARHEstrutura', 'dado', 'apuracao', function($scope, $log, $modalInstance, ARHEstrutura, dado, apuracao){

	var prefixosLotacao = [4905, 9549, 9501, 9502, 9503];
	
	$scope.dado = dado;
	
	$scope.alertas = [];
	
	function inicia(){
		
		$log.debug('dado', dado);
		
		var	parametros = {
			id 			: (apuracao ? apuracao.id : dado.CD_APR),
			comissaoId 	: dado.CD_CMSS,
			prefixo		: dado.PRF_DEPE
		}
		
		ARHEstrutura.buscaFuncionarios(parametros, function(dados){
			
			$scope.dados = dados;
			
			var valorEsperado = $scope.usi(dado.PRF_DEPE) ? dado.TOTAL_QT_LOT : dado.TOTAL_QT_EXST;
			
			if (valorEsperado > 0 && !dados.length){
				$scope.alertas.push({msg : 'Informação não capturada nessa apuração.', type : 'danger'});
			}
			
		});
		
	}
	
	$scope.fecha = function(){
		$modalInstance.dismiss('cancel');
	}
	
	$scope.fechaAlerta = function(index){
		$scope.alertas.splice(index, 1);
	}
	
	$scope.usi = function(prefixo){
		prefixosLotacao.indexOf(dado.PRF_DEPE) > 0;
	}
	
	inicia();
	
}]);


