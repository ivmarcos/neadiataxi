portalApp.directive('usiScroll', ['$timeout', '$routeSegment', function($timeout, $routeSegment) {
	
	return {
		restrict    : 'A',
		scope       : '@&', 
		link: 		function (scope, element, attrs) {

			var source = $(window);
			var segment = undefined;
			
			source.scroll(function(e){
				if (segment && segment != $routeSegment.name){
					detach();
					return;
				}
				segment = $routeSegment.name;
				var p = source.scrollTop();
				var h = source.height();
				var dh = $(document).height();
				//console.log(p);
				onScroll(p, h, dh);
				//console.log(element.height());
				scope.$apply();
			})
			
			
			function onScroll(p, h, dh){
				var onScrollFunction = scope.$eval(attrs.usiScroll);
				if (typeof(onScrollFunction) == 'function'){
					onScrollFunction(p, h, dh);
				}
			};
			
			function detach(){
				console.log('detaching..**************************');
				scope.$destroy();
				source.unbind('scroll');
			};

		}
	};
}]);