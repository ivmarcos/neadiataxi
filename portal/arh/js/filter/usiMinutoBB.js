portalApp.filter('usiMinutoBB', function () {

	
	return function (valor) {
		
		if (!valor) return valor;
		
		var decimal = valor % 1,
			minutos = '';
				
		if (decimal != 0){
			return (decimal * 60).toFixed(0);
		}
		
	}
	

});