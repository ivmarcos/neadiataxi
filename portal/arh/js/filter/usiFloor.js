portalApp.filter('usiFloor', function () {

	
	return function (valor) {
		
		if (!valor) return valor;
		
		return Math.floor(valor);
		
	}
	

});