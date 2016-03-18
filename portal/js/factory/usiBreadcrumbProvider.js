portalApp.factory('usiBreadcrumbProvider', ['$rootScope', '$routeSegment', function($rootScope, $routeSegment){
 
	var _labels = {};
	var _root = undefined;
	
	function notifyUpdate(){
		$rootScope.$emit('breadcrumbLabelUpdated');		
	};
	
	return {
		setRoot : function(root){
			_root = root;
		},
		getRoot : function(){
			return _root;
		},
		setLabel : function(id, label){
			_labels[id] = label;
			notifyUpdate();
		},
		setSegmentLabel : function(label){
			var id = $routeSegment.name;
			_labels[id] = label;
			notifyUpdate();
		},
		getLabel : function(id){
			return _labels[id];
		}
	};
 
 
}]);