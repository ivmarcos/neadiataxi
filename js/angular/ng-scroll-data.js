// © Copyright 2015 Marcos Andrei Ivanechtchuk <ivmarcos@gmail.com>.  All Rights Reserved.

(function(){
	angular.module('ng-scroll-data',[]).directive('ngScrollData', function($timeout){

		return {
			restrict: 'EA',
			link : function(scope, element, attrs){		
				
				//get the values passed in the view
				var lastPosition = undefined,
					stepDown = parseInt(attrs.ngScrollStepDown) || 3,
					stepUp = parseInt(attrs.ngScrollStepUp) || 1,
					limit = parseInt(attrs.ngScrollLimit),
					downPosition = parseFloat(attrs.ngScrollDownPosition) || 0.5,
					upPosition = parseFloat(attrs.ngScrollUpPosition) || 0.5,
					initialLimit = attrs.ngScrollInitialLimit,
					onUpdate = attrs.ngScrollOnUpdate,
					length = 0;
				
				scope.ngScrollBegin = 0;
				scope.ngScrollLimit = initialLimit ? initialLimit : limit;
				console.log('onUpdate', onUpdate);
				
				//bind the window scroll event
				$(window).scroll(function(e){
					var dh = $(document).height(),
						wh = $(window).height(),
					 	st = $(window).scrollTop(),
					 	scrollEvent = {e : e, dh : dh, wh : wh, st : st};
					onScroll(scrollEvent);
				});

				//listen the ctrl+end & ctrl+home keys to simulate then
				$(window).keydown(function(e){
					//end
					if (e.ctrlKey && e.keyCode == 35){
						if (length <= limit) return;
						lastPosition = undefined;
						scope.ngScrollBegin = length - limit;
						var dh = $(document).height();
						$(window).scrollTop(dh);
						apply();
					};
					//home
					if (e.ctrlKey && e.keyCode == 36){
						if (length <= limit) return;
						lastPosition = undefined;
						scope.ngScrollBegin = 0;
						var dh = $(document).height();
						var wh = $(window).height();
						$(window).scrollTop(dh-wh);
						apply();
					};
				});

				//scroll event
				function onScroll(e){
					console.log('onScroll');
					if (length <= limit) return;
					var position = e.st + e.wh,
						isBottom = position == e.dh,
						isTop = position == e.wh,
						isFirstPage = scope.ngScrollBegin == 0,
						isLastPage = (length - limit) <= scope.ngScrollBegin;
					if (!lastPosition) lastPosition = position;
					var newDownPosition = parseInt((e.dh - e.wh) * downPosition),
					 	newUpPosition = parseInt((e.dh - e.wh) * upPosition),
					 	move = lastPosition == position ? 'stop' : position > lastPosition ? 'down' : 'up';
					 	
					 	console.log('moving', move);

					//adding offset
					if (isBottom && move == 'down' && !isLastPage) {
						scope.ngScrollBegin = scope.ngScrollBegin + stepDown;
						lastPosition = undefined;
						$(window).scrollTop(newDownPosition);
						apply();
						return;
					}
					if (move == 'down' && scope.ngScrollLimit == initialLimit){
						scope.ngScrollLimit = limit;
						initialLimit = undefined;
						apply();
					}
					//removing offset
					if (move == 'up' && !isFirstPage){
						scope.ngScrollBegin = scope.ngScrollBegin - stepUp;	
						if (scope.ngScrollBegin < 0) scope.ngScrollBegin = 0;	
						lastPosition = undefined;
						$(window).scrollTop(newUpPosition);
						apply();
						return;
					}
					if (isBottom && move == 'stop' && !isLastPage) {
						lastPosition = undefined;
						$(window).scrollTop(newDownPosition);
						return;
					}
					if (isTop && move == 'stop' && !isFirstPage){
						lastPosition = undefined;
						$(window).scrollTop(newUpPosition);
						return;
					}				
					lastPosition = position;
				};			
			
				var apply = function(){
					console.log('apply!!!!!!!!!!');
					if (onUpdate) {
						scope.$eval(onUpdate);
					}
					scope.$applyAsync();
				};
				
				//unbind functions
				var destroy = function(){
					$(window).unbind('scroll');
					$(window).unbind('keydown');
				};
				
				element.on('$destroy', destroy);
				scope.$on('$destroy', destroy);

				//update the length value
				scope.$watch(attrs.ngScrollItems, function(){
					var items = scope.$eval(attrs.ngScrollItems);
					if (items) {
						length = items.length;
					}
				});
				
				scope.$watch(attrs.ngScrollItemsLength, function(){
					var itemsLength = scope.$eval(attrs.ngScrollItemsLength);
					if (itemsLength) {
						length = itemsLength;
					}
				});

			},
		}
	
	}).filter('ngScrollPaginator', function() {
	  return function(list, limit, begin) {
		if (!list) return;
		console.log('filtrando');
	    if (limit >= 0) {
	    	return list.slice(begin, begin + limit);
	    } else {
	    	if (begin === 0) {
	    		return list.slice(limit, list.length);
	    	}else {
	    		return list.slice(Math.max(0, begin + limit), begin);
	    	}
	    }
	  };
	});
}());
