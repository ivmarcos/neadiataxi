engitnaApp.factory('Perfil', ['Sessao', function(Sessao) {
		
	var perfil = {};
	
	Sessao.verificaAcesso('ENGITNAARQADMIN').then(function (){
		perfil.admin = true;
	});

	Sessao.verificaAcesso('ENGITNAARQRST1').then(function (){
		perfil.restrito = true;
	});
	
	return perfil;

}]);

