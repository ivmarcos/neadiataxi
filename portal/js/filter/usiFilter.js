portalApp.filter('usiFilter', function() {
	
	return function(array, input, prop){
		if (!input || !array) return array;
		var text = removeSymbols(input);
		var regex = new RegExp(text, 'i');
		return array.filter(function(object){return match(object, regex, prop);});
	};
	
	
	function match(object, regex, prop){
		if ('object' === typeof object){
			if (prop){
				var attr = object[prop];
				var string = removeSymbols(attr.toString());
				if (regex.test(string)) return true;	
			}else{
				for (key in object){
					var attr = object[key];
					if ('object' === typeof attr) { 
						if (match(attr, regex)) return true;
					} else {
						var string = removeSymbols(attr.toString());
						if (regex.test(string)) return true;	
					}
				}
			}
		}else {
			var string = removeSymbols(object.toString());
			if (regex.test(string)) return true;	
		}
		return false;
	}
	
	function removeSymbols(input) {
		
		var string = input;
		
		var map 	= {
				a : /[\xE0-\xE6]/g,
				A : /[\xC0-\xC6]/g,
				e : /[\xE8-\xEB]/g,
				E : /[\xC8-\xCB]/g,
				i : /[\xEC-\xEF]/g,
				I : /[\xCC-\xCF]/g,
				o : /[\xF2-\xF6]/g,
				O : /[\xD2-\xD6]/g,
				u : /[\xF9-\xFC]/g,
				U : /[\xD9-\xDC]/g,
				c : /\xE7/g,
				C : /\xC7/g,
				n : /\xF1/g,
				N : /\xD1/g,
		};

		for (var c in map) {
			var regex = map[c];
			string = string.replace(regex, c);
		}

		return string;
	}


}); 