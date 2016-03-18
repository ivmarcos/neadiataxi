portalApp.directive('usiContext', function() {
	
	return {
		restrict    : 'A',
		scope       : '@&', 
		link: 		function (scope, element, attrs) {

			var menuContext = $('#' + attrs.usiContext);
			var last = undefined; 

			function onClick(){
				if (attrs.usiContextOnClick){
					scope.$eval(attrs.usiContextOnClick);
				};
			};
			
			function onClose(){
				if (attrs.usiContextOnClose){
					 scope.$eval(attrs.usiContextOnClose);
				};
			};
			
			function show(event){
				var screenHeight = window.screen.height;
				var pad = 200;
				var height = menuContext.height();
				var posY = event.clientY;
				posY = ((posY + height + pad) >= screenHeight) ? event.clientY - height : event.clientY;
				menuContext.css({
					position: "fixed",
					display: "block",
					left: event.clientX + 'px',
					top:  posY + 'px'
				});
				last = event.timeStamp;
			};
			
			function hide(){
				menuContext.css({
					'display' : 'none'
				});
			};
			
			element.bind('contextmenu', function(event) {
				onClick();
				show(event);
				scope.$apply();
				event.preventDefault();
			});
			
			$(document).click(function(event) {
				var target = $(event.target);
				if(!target.is(".popover") && !target.parents().is(".popover")) {
					if(last === event.timeStamp) return;
					hide();
					onClose();
					scope.$apply();
				}
			});
		}
	};
});