portalApp.directive('usiLoader', function(){
	
	return {
		restrict : 'E',
		scope : true,
		template: 	'<div id="loader">' +
						'<i class="fa fa-spinner fa-pulse fa-2x" id="ajaxLoader"></i>' +
					'</div>',
		link : function($scope, element, attrs){
			
			var show = false,
				tolerancia = 100; //tolerancia em ms para não exibir o loader
			
			$scope.$on('showLoader', function(){
				show = true;
				setTimeout(function(){
					if (show) element.show();
				}, tolerancia)
			});
			
			$scope.$on('hideLoader', function(){
				show = false;
				element.hide();
			});
			
		
		},
		
	}

});


