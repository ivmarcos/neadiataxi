portalApp.directive('usiAutoSize', function(){
	return {
	    link: function(scope, element, attrs) {
	    	element.autosize();
	    }
	  };
});