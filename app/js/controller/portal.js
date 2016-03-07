portalApp.controller('PortalController', function($scope, $log, Sessao){
	
	Sessao.usuario().then(function(usuario){
		$scope.usuario = usuario;
	});
	
	$scope.logoff = Sessao.logoff;

});


