engitnaApp.factory('Arquivo', ['$resource', '$upload', function($resource, $upload) {
		
	   var URL = '/api/portal/engenharia/interna/arquivo';
	   
	   var resource = $resource(URL + '/:id', null, {
		   
		   query : {
				method : 'GET',
				url : URL + '/busca',
				isArray : true,
		   },
		   
		   buscaPublicos : {
			   method : 'GET',
			   url : URL + '/busca/publicos',
			   isArray : true
		   },
		   
		   buscaRestritos : {
			   method : 'GET',
			   url : URL + '/busca/restritos',
			   isArray : true
		   }
		   
	   });
	   
	   var upload = function(params){
		   params.url = URL + '/upload';
		   return $upload.upload(params);
	   };

	   resource.upload = upload;
	   
	   return resource;
}]);

