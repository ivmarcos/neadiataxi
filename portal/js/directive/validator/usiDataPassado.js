portalApp.directive('usiDataPassado', function(){
 
	
	return {
		require : 'ngModel',
		priority : 2,
		link : function(scope, elm, attrs, ctrl){

			var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
			var format = 'DD-MM-YYYY';

			ctrl.$validators.dataPassado = function(modelValue, viewValue){
				
				if (ctrl.$isEmpty(modelValue) || !viewValue) {
			          return true;
		        }
				
				var date = viewValue;
				
				if (typeof date == 'string'){
					
					if (!regex.test(viewValue)) return false;
					
					date = moment(date, format).toDate();
					
				}
				
				var weekday = date.getDay();
				
				if (date < new Date()){
					return true;
				}
				
				return false;
			};
		}
	};
 
 
});