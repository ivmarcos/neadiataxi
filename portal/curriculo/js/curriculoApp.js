var curriculoApp = angular.module('curriculoApp', ['portalApp', 'ngRoute', 'ui.bootstrap', 'route-segment', 'view-segment', 'ngAnimate', 'angular.filter']); 

curriculoApp.config(['$routeProvider', '$routeSegmentProvider', '$httpProvider', function ($routeProvider, $routeSegmentProvider, $httpProvider){
	
	//$routeSegmentProvider.options.autoLoadTemplates = true;
	
	//suporte a cross origin, para viabilizar NodeJS
	$httpProvider.defaults.withCredentials = true;
	
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
		
	}
		
	
	$routeSegmentProvider

		.when('/', 								'curriculo')
		.when('/cadastro', 						'curriculo.cadastro')
		.when('/lista', 						'curriculo.lista')
		
		.segment('curriculo', {
			templateUrl : '_index.html'
		})
		
		.within()
		
			.segment('cadastro', {
				'default' : true,
				templateUrl : '_cadastro.html',
				controller : 'CurriculoController',
			})
		
			.segment('lista', {
				templateUrl : '_lista.html'
			})
		
		
		
			


	
}]);

