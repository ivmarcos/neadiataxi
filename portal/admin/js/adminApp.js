var adminApp = angular.module('adminApp', ['portalApp', 'ngRoute', 'route-segment', 'view-segment']); 

adminApp.config(['$routeSegmentProvider', function($routeSegmentProvider){
	
	$routeSegmentProvider

	.when('/noticia',				'noticia')
	.when('/ecoa',					'ecoa')
	
	.segment('ecoa', {
		templateUrl : 'portal/ecoa/index.html',
		controller 	: 'ECOAController',
	})
		
		.within()

			.segment('doacao-sangue', {
				templateUrl : 'portal/ecoa/_doacao-sangue.html',
				controller 	: 'DoacaoSangueECOAController',
			})
	
			.segment('fale', {
				templateUrl : 'portal/ecoa/_fale.html',
				controller 	: 'FaleECOAController',
			})
	
			.segment('cronograma', {
				templateUrl : 'portal/ecoa/_cronograma.html',
				controller 	: 'CronogramaECOAController',
			})
	
			.segment('voluntariado', {
				templateUrl : 'portal/ecoa/_voluntariado.html',
				controller 	: 'VoluntariadoECOAController',
			})
			
			.segment('qvt', {
				templateUrl : 'portal/ecoa/_voluntariado.html',
				controller 	: 'VoluntariadoECOAController',
			})

			.segment('aniversariantes', {
				templateUrl : 'portal/ecoa/_voluntariado.html',
				controller 	: 'AniversarianteECOAController',
			})

			.segment('ferias', {
				templateUrl : 'portal/ecoa/_voluntariado.html',
				controller 	: 'VoluntariadoECOAController',
			})
	
	.segment('ramais', {
		templateUrl : 'portal/_ramais.html',
		controller 	: 'ECOAController',
	});
	
}]);
  