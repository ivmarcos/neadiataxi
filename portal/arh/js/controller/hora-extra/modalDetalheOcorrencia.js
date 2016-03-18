adminApp.controller('ARHHoraExtraDetalheOcorrenciaController', ['$scope', '$log', '$uibModalInstance', 'dado', 'dados', 'periodo', function($scope, $log, $modalInstance, dado, dados, periodo){

	$scope.dado = dado;
	$scope.dados = dados;
	$scope.periodo = periodo;
	
	$scope.alertas = [];
	
	$scope.fecha = function(){
		$modalInstance.dismiss('cancel');
	}
	
	$scope.fechaAlerta = function(index){
		$scope.alertas.splice(index, 1);
	}
	
	
}]);


