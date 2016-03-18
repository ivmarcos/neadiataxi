adminApp.factory('ARHPerfil', ['Sessao', function(Sessao) {
	
	var prefixosCESIN = [9050,9051,9052,9053];
	var perfil = {};

	//identifica o perfil do usuário
	function inicia(){
		
		Sessao.usuario().then(function(usuario){
			
			if (usuario.prefixo == 4905) return perfil.usi = true;
			
			if (prefixosCESIN.indexOf(usuario.prefixo) > 0) return perfil.cesin = true;
			
			if (usuario.prefixo == 8558) return perfil.disec = true;
			
			if (usuario.prefixo == 9600) return perfil.uop = true;
			
		});
	}
	
	inicia();
	
	return perfil;
	
}]);

