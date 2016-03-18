portalApp.factory('loader', ['$rootScope', function($rootScope){
 
	var options = {
		enabled : true,
		blocking : false,
	}
 
	return {
		show : function(){
			if (options.enabled) $rootScope.$broadcast('showLoader');
		},
		hide : function(){
			$rootScope.$broadcast('hideLoader');
		},
		disable : function(){
			options.enabled = false;
		},
		enable : function(){
			options.enabled = true;
		},
		setOptions : function(newOptions){
			options = newOptions;
			$rootScope.$broadcast('reloadLoader');
		}
	}
 
 
}]);