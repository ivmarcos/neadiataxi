portalApp.directive('usiRouteTitle', ['$routeSegment', 'usiBreadcrumbProvider', function($routeSegment, usiBreadcrumbProvider){
 
	return {
		restrict : 'E',
		controller : function($scope){
 
			var run = function(){
				var segments = $routeSegment.chain;
				var segmentBuild = '';
				var titleBuild = 'Portal USI';
				for (var i = 0; i < segments.length; i++){
					segmentBuild = segmentBuild.concat(segmentBuild.length > 0 ? '.' : '').concat(segments[i].name);
					var label = usiBreadcrumbProvider.getLabel(segmentBuild) || segments[i].params.breadcrumbLabel;
					if (label)	titleBuild = titleBuild.concat(' - ').concat(label);
				}
				document.title = titleBuild;
			};
 
			$scope.$on('routeSegmentChange', run);
			$scope.$on('breadcrumbLabelUpdated', run);
		}
	};
 
 
}]);