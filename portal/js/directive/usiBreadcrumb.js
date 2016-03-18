portalApp.directive('usiBreadcrumb', ['usiBreadcrumbProvider', '$routeSegment', function(usiBreadcrumbProvider, $routeSegment){
 
	return {

		restrict : 'E',

		template : function(){
			return ''.concat(
				   '<ol class="breadcrumb">', 
				   '<li ng-repeat="breadcrumb in breadcrumbs" ng-class="{active : breadcrumb.active}">',
				   '<a ng-href="{{breadcrumb.url}}" ng-bind="breadcrumb.label" ng-if="!breadcrumb.active">',
				   '</a>',
				   '<span ng-bind="breadcrumb.label" ng-if="breadcrumb.active">',
				   '</li>',
				   '</ol>');
		},

		controller : function($scope){
 
			var params = $routeSegment.$routeParams;
			
			var run = function(){
				$scope.breadcrumbs = [];
				var segments = $routeSegment.chain;
				var segmentBuild = '';
				for (var i = 0; i < segments.length; i++){
					var segment = segments[i];
					segmentBuild = segmentBuild.concat(segmentBuild.length > 0 ? '.' : '').concat(segment.name);
					var id = segmentBuild;
					var url = segment.params.breadcrumbUrlRef ? $routeSegment.getSegmentUrl(segment.params.breadcrumbUrlRef) : $routeSegment.getSegmentUrl(id, params);
					url = '#'.concat(url);
					var label = usiBreadcrumbProvider.getLabel(id) || segment.params.breadcrumbLabel;
					if (label){
						var breadcrumb = {
								id : id,
								url : url,
								label : label,
							}
						$scope.breadcrumbs.push(breadcrumb);
					}
				}
				var last = $scope.breadcrumbs.slice(-1)[0];
				last.active = true;
				last.url = undefined;
			};
 
			$scope.$on('routeSegmentChange', run);
			$scope.$on('breadcrumbLabelUpdated', run);
		}
	};
 
 
}]);