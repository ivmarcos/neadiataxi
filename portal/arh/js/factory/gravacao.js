adminApp.factory('ARHEstruturaGravacao', ['$resource', function($resource) {

	   var URL = '/api/portal/arh/estrutura/gravacao';
	   
	   return $resource(URL + '/:id', null, {
		   
		  		   	
	   });
	   
	   
	
}]);

