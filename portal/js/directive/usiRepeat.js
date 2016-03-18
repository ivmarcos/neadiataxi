portalApp.directive('usiRepeat', function(){
	
	return {
		restrict : 'EA',
		link: 	function(scope, element, attrs){
			
			var childHtml = element.html();
			
			element.html('');
			
			scope.$watch(attrs.usiRepeatSize, function(value) {
				var size = scope.$eval(attrs.usiRepeatSize);
				if (size){
					updateHtml(size);
				}
	        });
			
			function updateHtml(size){
				var html = '';
				for (var i = 0; i < size; i++){
					html = html.concat(childHtml);
				}
				element.html(html);
			}
		},
		
	}

});


