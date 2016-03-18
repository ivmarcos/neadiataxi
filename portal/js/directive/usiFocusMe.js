portalApp.directive('usiFocusMe', function($parse, $timeout){
	return {
	    link: function(scope, element, attrs) {
	      scope.$watch(attrs.usiFocusMe, function(value) {
	        if(value === true) { 
	          $timeout(function() {
	            element[0].focus();
	          });
	        }
	      });
	    }
	  };
});