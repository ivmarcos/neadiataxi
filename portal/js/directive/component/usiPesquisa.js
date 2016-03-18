portalApp.directive('usiPesquisa', function(){
	
	return {
		restrict : 'E',
		require : 'ngModel',
		template: 	function(elem, attr){
			
			return ''.concat( 
					'<div class="form-group has-feedback">',
						'<label class="sr-only"></label>',
						'<input type="text" class="form-control" placeholder="',
						( attr.placeholder == '' ? '' : (attr.placeholder || 'Localizar...')) ,
						'" ng-model="', 
						attr.ngModel,
						'"',
						attr.index ? ' tabindex="' + attr.index + '"' : '',
						'>',
						'<i class="fa fa-search form-control-feedback" style="line-height : 34px"></i>',
					'</div>');
		}
		
	}

});


