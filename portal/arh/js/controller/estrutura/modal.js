adminApp.controller('ARHEstruturaModalController', ['$scope', '$uibModalInstance', 'ARHEstruturaGravacao', 'dado', function($scope, $modalInstance, ARHEstruturaGravacao, dado){

	$scope.dado = dado;
	
	$scope.gravacao = new ARHEstruturaGravacao({
		id 						: dado.CD_GRV,
		prefixo 				: dado.PRF_DEPE,
		comissao_id 			: dado.CD_CMSS,
		quantidade 				: dado.QT_GRV,
		usuarioInclusao_id 		: dado.CD_USU_INCL_GRV,
		usuarioAtualizacao_id	: dado.CD_USU_ATL_GRV,
		dataHoraInclusao 		: dado.TS_INCL_GRV,
		dataHoraAtualizacao 	: dado.TS_ATL_GRV,
	});
	
	$scope.salva = function(){
		$scope.gravacao.$save(
			function(){
				$modalInstance.close($scope.gravacao);
			},
			function(){
				alert('Houve um erro ao tentar salvar.');
			}
		);
	}
	
	$scope.fecha = function(){
		$modalInstance.dismiss('cancel');
	}
	
}]);


