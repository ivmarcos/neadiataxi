portalApp.directive('usiDiaUtil',['Data', 'Feriado', '$q', function(Data, Feriado, $q){
 
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl){
	
			var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
			var format = 'DD-MM-YYYY';
			
			ctrl.$validators.diaUtil = function(modelValue, viewValue){
				

				if (ctrl.$isEmpty(modelValue)) {
			          return true;
		        }

				var date = viewValue;

				if (typeof date == 'string'){

					if (!regex.test(date)) {
						return false;
					}

					date = moment(date, format).toDate();
				}

				if (Data.fimDeSemana(date)) {
					return false;
				}else{
					if (Feriado.isFeriado(date)){
						return false;
					}else{
						return true;
					}
				}

				return false;
				
			};
		}
	};
 
 
}]);