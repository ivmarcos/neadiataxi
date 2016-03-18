adminApp.controller('RamalController', ['$scope', '$log', 'Sessao', 'Usuario', function($scope, $log, Sessao, Usuario){
	
	function inicia(){

		Sessao.usuario().then(function(usuario){
			
			$scope.usuario = usuario;
			$scope.buscaDados(usuario.prefixo);
			
		});
	
	}
	
	$scope.buscaDados = function(prefixo){
		
		Usuario.query({prefixo : prefixo, include : ['uor']}, function(usuarios){
			$scope.usuarios = usuarios;
		});
		
	}
	
	inicia();

}]);


