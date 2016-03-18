var engitnaApp = angular.module('engitnaApp', ['portalApp', 'ngRoute', 'route-segment', 'view-segment', 'angularFileUpload', 'infinite-scroll', 'ngAnimate', 'angular.filter', 'ui.bootstrap']); 

engitnaApp.config(['$routeProvider', '$routeSegmentProvider', '$httpProvider', function ($routeProvider, $routeSegmentProvider, $httpProvider){
	
	
	//suporte a cross origin, para viabilizar outros servidores rest
	$httpProvider.defaults.withCredentials = true;
	
	$routeSegmentProvider.options.autoLoadTemplates = true;
	
	
	//verifica acesso a determinada transacao
	var resolveAcesso = function(transacao) {
		
		return {
			
			data : function($q, Sessao, growl){
			
				return $q(function(resolve, reject){
				
					Sessao.verificaAcesso(transacao).then(
					
							function permitido(){
								resolve();
							},
							
							function negado(msg){
								growl.error(msg);
								reject(msg);
							}				
					)
					
				});
			}
		}
		
	}
	
	
	$routeSegmentProvider

		.when('/restrito', 	'restrito')
		.when('/cadastro', 	'cadastro')

		.when('/cadastro/arquivo/lista', 	'cadastro.arquivo.lista')
		.when('/cadastro/arquivo/:id', 		'cadastro.arquivo.edicao')
		
		.when('/cadastro/categoria/lista', 	'cadastro.categoria.lista')
		.when('/cadastro/categoria/:id', 	'cadastro.categoria.edicao')

		.when('/cadastro/acesso/lista', 	'cadastro.acesso.lista')
		
		
		.segment('restrito', {
			'default' 	: true,
			templateUrl	: '_lista.html',
			controller	: 'ListaController',
			resolve 	: resolveAcesso('ENGITNAARQRST1')
		})
		
		.segment('cadastro', {
			templateUrl: 'cadastro/_index.html',
			resolve: resolveAcesso('ENGITNAARQADMIN'),
		})
		
		.within()

			.segment('restrito', {
				'default' : true,
				templateUrl : 'cadastro/arquivo/_index.html',
			})
			
			.within()
				
				.segment('lista', {
					'default' : true,
					templateUrl : 'cadastro/arquivo/_lista.html',
					controller : 'ListaArquivoCadastroController',
				})
				
				.segment('edicao', {
					templateUrl : 'cadastro/arquivo/_edicao.html',
					controller : 'EdicaoArquivoCadastroController',
				})
			
			.up()
			
			.segment('categoria', {
				templateUrl : 'cadastro/categoria/_index.html',
			})
			
			.within()
				
				.segment('lista', {
					'default' : true,
					templateUrl : 'cadastro/categoria/_lista.html',
					controller : 'ListaCategoriaCadastroController',
				})
				
				.segment('edicao', {
					templateUrl : 'cadastro/categoria/_edicao.html',
					controller : 'EdicaoCategoriaCadastroController',
				})
			
			.up()
			
			.segment('acesso', {
				templateUrl : 'cadastro/acesso/_index.html',
			})
			
			.within()
				
				.segment('lista', {
					'default' : true,
					templateUrl : 'cadastro/acesso/_lista.html',
					controller : 'ListaAcessoCadastroController',
				});
				
			
	$routeProvider.otherwise({redirectTo : '/restrito'});
	

}]);


//expõe perfil para todos os ambientes da aplicação
engitnaApp.run(['Perfil', '$rootScope', function(Perfil, $rootScope){
	$rootScope.perfil = Perfil;
}]);

