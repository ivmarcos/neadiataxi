portalApp.directive('usiFloatThead', function($timeout){
	return {
	    link: function(scope, element, attrs) {
	    	var options = scope.$eval(attrs.options);
	    	$timeout(function(){
		    	element.floatThead(options);
	    	}, options.delay || 100);
	    }
	  };
});