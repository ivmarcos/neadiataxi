portalApp.directive('usiBlurOnEnter', function(){
	return {
	    link: function(scope, element, attrs) {
	    	element.on({
	    		keydown: function(e){
	    			if (e.keyCode == 13){
	    				element[0].blur();
	    			}	
	    		}
	    	});
	    }
	}
});