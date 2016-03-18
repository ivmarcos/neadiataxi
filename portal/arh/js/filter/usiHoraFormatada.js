portalApp.filter('usiHoraFormatada', ['$filter', function ($filter) {

	
	return function (valor) {
		
		if (!valor) return valor;
		
		valor = $filter('usiHoraBB')(valor);
		
		return valor.replace(/(\d+)?(h|min)?/g, '<strong>$1</strong>$2')
	}
	

}]);