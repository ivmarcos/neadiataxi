var adminApp = angular.module('adminApp', ['portalApp', 'ngRoute', 'route-segment', 'view-segment', 'angular.filter', 'ui.bootstrap', 'ngAnimate']); 

adminApp.config(['$routeProvider', '$routeSegmentProvider', function($routeProvider, $routeSegmentProvider){
	
	//$routeSegmentProvider.options.autoLoadTemplates = true;
	//definição das rotas para as páginas administrativas do portal
	
	
	//verifica acesso a determinada transacao
	var resolveAcesso = function(transacao) {
		
		return {
			
			data : function($q, Sessao, growl){
			
				var q = $q.defer();
				
				Sessao.verificaAcesso(transacao).then(
						function permitido(){
							q.resolve();
						},
						function negado(msg){
							growl.error(msg);
							q.reject(msg);
						}				
				);
				
				return q.promise;
			}
		};
		
	}
	
	$routeSegmentProvider

	.when('/ramais',						'ramais')
	.when('/arh', 							'arh')
	.when('/arh/estrutura',					'arh.estrutura')
	.when('/arh/hora-extra',				'arh.horaExtra')
	.when('/arh/hora-extra/quadro',			'arh.horaExtra.quadro')
	.when('/arh/hora-extra/quadro/:valor',	'arh.horaExtra.quadro-valor')
	.when('/arh/hora-extra/comparativo',	'arh.horaExtra.comparativo')
	.when('/arh/hora-extra/tendencia',		'arh.horaExtra.tendencia')
	
	.segment('ramais', {
		templateUrl : '_ramal.html',
		controller 	: 'RamalController',
	})
	
	.segment('arh', {
		templateUrl : 'arh/_index.html',
		resolve : resolveAcesso('PORTALARHUSI')
	})
	
	.within()
	
		.segment('estrutura', {
			'default' : true,
			templateUrl : 'arh/estrutura/_index.html',
			controller 	: 'ARHEstruturaController',
		})
		
		.segment('hora-extra', {
			templateUrl : 'arh/hora-extra/_index.html',
			controller 	: 'ARHHoraExtraController',
		})
		
		.within()
		
			.segment('quadro', {
				'default' : true,
				templateUrl : 'arh/hora-extra/_quadro.html',
			})

			.segment('quadro-valor', {
				templateUrl : 'arh/hora-extra/_quadro.html',
			})
			
			.segment('comparativo', {
				templateUrl : 'arh/hora-extra/_comparativo.html',
				controller 	: 'ARHHoraExtraComparativoController',
			})

			.segment('tendencia', {
				templateUrl : 'arh/hora-extra/_tendencia.html',
				controller 	: 'ARHHoraExtraTendenciaController',
			});
		
	$routeProvider.otherwise({redirectTo : '/arh'});
	
}]);
  