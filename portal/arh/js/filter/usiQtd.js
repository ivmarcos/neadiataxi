portalApp.filter('usiQtd', ['$filter', function ($filter) {

	
	return function (valor) {
		if (!valor) return valor;
		var resultado = $filter('currency')(valor); 
		if (/\)/.test(resultado)){  
			return resultado.replace(/\)/, '').replace(/\(/, '');
		}
		return resultado;
	}
	

}]);