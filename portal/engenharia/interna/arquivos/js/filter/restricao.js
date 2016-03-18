engitnaApp.filter('restricao', ['Restricao', function(Restricao){

	return function(sigla){
		return Restricao.todas().filter(function(r){return r.sigla == sigla})[0].nome;
	}

}]); 



