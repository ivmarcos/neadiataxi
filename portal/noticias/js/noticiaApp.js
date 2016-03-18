var noticiaApp = angular.module('projetoApp', ['portalApp', 'ngRoute', 'ui.bootstrap', 'route-segment', 'view-segment', 'angularFileUpload', 'angular.filter', 'infinite-scroll', 'ngAnimate', 'easypiechart']); 

noticiaApp.config(['$routeSegmentProvider', '$resourceProvider', function ($routeSegmentProvider, $resourceProvider){
	
	
	//suporte a cross origin, para viabilizar outros servidores rest
	$httpProvider.defaults.withCredentials = true;
	
	$routeSegmentProvider.options.autoLoadTemplates = true;
	
	var resolveAcesso = function(transacao) {
		
		return {
			
			data : function($q, Sessao, growl){
			
				var deferred = $q.defer();
				
				Sessao.verificaAcesso(transacao).then(
						function permitido(){
							deferred.resolve();
						},
						function negado(msg){
							growl.error(msg);
							deferred.reject(msg);
						}				
				);
				
				return deferred.promise;
			}
		};
		
	};
		
	angular.extend($resourceProvider.defaults.actions, {
			query : {
				method : 'GET',
				url : this.url + '/busca',
				isArray : true
			}
	});
	
	
	//Definindo o roteamento
	$routeSegmentProvider

		.when('/',					'home')
		.when('/cadastro/:id', 		'cadastro')
		.when('/lista', 			'lista')
		.when('/visualiza/:id', 	'visualiza')

		.segment('home', {
			controller : 'VisaoGeralController'
		})
	
		
	$routeProvider.otherwise({redirectTo : '/'});
	

}]);

