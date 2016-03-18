portalApp.directive('usiData', function($filter){

	var dateFilter = $filter('date');

	return {
		require: 'ngModel',
		restrict: 'A',
		priority: 1000,
		link: function(scope, elm, attrs, ctrl) {
			
			var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
			var format = 'DD/MM/YYYY';
			
			var getUTC = function(data){
				return data.getTimezoneOffset() / 60;
			}
			
			/* corrige problemas com alterações de datas - horário de verão*/
			var fix = function(data){

				if (!data) return data;
				
				if ('string' == typeof data && regex.test(data)){
					data = moment(data, format).toDate();
				}
		
				if ('object' == typeof data){
					if (data.getHours() < 2){
						data.setHours(3);
					}
				}
				
				return data;
			}
			
			ctrl.$formatters.unshift(function toView(modelValue) {
				return modelValue;
			});
			
			ctrl.$validators.date = function(modelValue){
				
				if (ctrl.$isEmpty(modelValue)) {
				  return true;
		        }

				
				return new Date(modelValue);
			
			};

			ctrl.$parsers.unshift(function toModel(viewValue) {
				
				
				return fix(viewValue);
				
			});
		},
	};


});