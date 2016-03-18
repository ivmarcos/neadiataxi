portalApp.directive('usiClone', ['$compile', '$timeout', function($compile, $timeout) {
	
	return {
		priority : 10,
		link: function (scope, element, attrs) {
			
			var id = element[0].id;
			
			function findTargetElement(element){
				return $('*[usi-clone-target=' + id + ']');
			};
			
			function findHideElement(element){
				return $('*[usi-clone-hide=' + id + ']');
			};
			
			var hide = findHideElement(element);
			
			console.log('element', element);
			console.log('hide', hide);
			
			function init(){
				
				$timeout(function(){
					var target = findTargetElement(element);
					console.log('target', target);
					target.click(function(){
						console.log('clonando!!');
						hide.hide();
						var localScope = target.scope();
						var view = $compile(element.html())(localScope);
						console.log('view')
						target.append(view);
						localScope.$apply();
					});
				}, 10000);
				
				element.on('blur', function(){
					hide.show();
					element.hide();
				});

				element.remove();
				
			};
			
			init();
			
		}

	};
}]);