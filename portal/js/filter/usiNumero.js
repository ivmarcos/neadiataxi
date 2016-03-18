portalApp.filter('usiNumero', function() {
	
	return function(input, fractionSize){
		if (!input) return input;
		var string = input.toString().replace(',', '').replace('.', ',');
		return string;
	}
		
}); 