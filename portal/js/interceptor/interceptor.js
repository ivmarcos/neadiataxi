portalApp.factory('portalHttpInterceptor', ['$q', 'growl', 'loader', function($q, growl, loader) {
	
	var loads = 0;
    return {
      // optional method
      request: function(config) {
        // do something on success
		
		loads++;
		
		//aciona o loader somente em urls da api
		if (config && /^\/api/.test(config.url)){
			loader.show();
		}
		
        return config || $q.when(config);
      },

     // optional method
     requestError: function(rejection) {
        // do something on error
    	 growl.error('Erro ao fazer requisição ao servidor');
		 
        if (canRecover(rejection)) {
          return responseOrNewPromise;
        }
        return $q.reject(rejection);
      },



      // optional method
      response: function(response) {
        // do something on success
		if ((--loads) === 0) {
                // Hide loader
			loader.hide();
        }
        return response || $q.when(response);
      },

      // optional method
     responseError: function(rejection) {
        // do something on error
		
		 if (!(--loads)) {
            // Hide loader
			loader.hide();
         }
			
    	 switch (rejection.status){
    	 case 0 : {
    		 growl.error('Sessão encerrada. Recarregue a página.');
    		 break;
    	 }
    	 case 403 : {
    		 growl.error(rejection.data.msg || 'Erro não identificado.');
    		 break;
    	 }
    	 case 404:
    		 growl.error('Recurso não localizado no servidor');
    		 break;
    	 case 500:
    		 growl.error(rejection.data.msg || 'Erro interno do servidor');
    		 break;
    	 default:
    	 	growl.error('Erro não identificado. Código:' + rejection.status + ' Status: ' + rejection.statusText);
    	 }

		 return $q.reject(rejection);
      }
    };

}])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('portalHttpInterceptor');
}]);