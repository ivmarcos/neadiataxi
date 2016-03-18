portalApp.directive('usiSlide', function(){
	
	return {
		restrict : 'E',
		scope : true,
		template: 	'<div class="slide row carousel hidden-print" ng-class="{fade : fade}">' +
						'<img ng-src="/arquivos/portal/slide/{{slide.image}}">' +
					'</div>',
		controller : ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout){
			
			var slides = [{image : 'img01.jpg'}, {image : 'img02.jpg'}, {image : 'img03.jpg'}, {image : 'img04.jpg'}];
			$scope.slide;
			
			$scope.slideIntervalo = 5000;
			
			function inicia(){
				
				slide();
				$interval(slide, 6000);
				
			}
			
			var slide = function(){
				
				if (!$scope.slide) {
					$scope.slide = slides[0];
					return;
				}
				
				$scope.fade = true;
				
				$timeout(function(){
					$scope.fade = false;
					var index = slides.indexOf($scope.slide);
					if (index == slides.length - 1) index = -1;
					$scope.slide = slides[index + 1];
				}, 500);
				
			}
			
			inicia();
		}]
		
	}

});


