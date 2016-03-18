portalApp.controller('PortalController', function($scope, $log, Sessao){
	
	Sessao.usuario().then(function(usuario){
		console.log('usuario', usuario);
		$scope.usuario = usuario;
	});
	
	$scope.logoff = function(){
		console.log('logoff');
		Sessao.logoff();
		location.reload();
	}

});


