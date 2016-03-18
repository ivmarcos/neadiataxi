portalApp.filter('usiHoraBB', function () {

	
	return function (valor) {
		
		if (!valor) return valor;
		
		
		var decimal = valor % 1,
			inteiro = Math.floor(valor),
			horas = '',
			minutos = '';
				
		if (decimal != 0){
			minutos = (decimal * 60).toFixed(0) + 'min';
		}
		
		if (inteiro > 0){
			horas = inteiro + 'h';
		}
		
		return horas + minutos;
	}
	

});