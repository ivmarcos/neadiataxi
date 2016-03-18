portalApp.filter('usiZeroFill', function () {

    return function (input, compMask) {
		
    	if (!input) return '';
		
		var compMask = compMask;

		compMask -= input.toString().length;

		if ( compMask > 0 ) {
			return new Array( compMask + (/\./.test( input ) ? 2 : 1) ).join('0') + input;
		}
		
		return input + '';
		
    }
	
});
