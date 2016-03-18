adminApp.controller('ARHHoraExtraComparativoController', ['$scope', '$log', 'ARHHoraExtra', function ($scope, $log, ARHHoraExtra) {
	
	var cores = $scope.cores = ['#4bb2c5', '#EAA228', '#c5b47f', '#579575', '#839557', '#958c12', '#953579', '#4b5de4', '#d8b83f', '#ff5800', '#0085cc', '#c747a3', '#cddf54', '#FBD178', '#26B4E3', '#bd70c7'];
	
	var opcoesGrafico = {
		gridPadding: {top:0, bottom:0, left:0, right:0},
		seriesDefaults: {
			renderer: jQuery.jqplot.PieRenderer, 
			rendererOptions: {
			  showDataLabels: true,
			  padding : 10
			}
		},
		grid : {
			background: 'rgba(57,57,57,0.0)',
			drawBorder: false,
			shadow: false,
			gridLineColor: '#ddd',
			gridLineWidth: 1
		},
		seriesColor : cores
	}
	
	//formata data no padrão yyyy-MM-dd;
	function formataData(data){
		return data.toISOString().substring(0, 10);
	}

	function inicia(){
	
		buscaDados();
		
	}
	
	function buscaDados(){
		
		var params = {
			inicio : formataData($scope.$parent.inicio),
			fim : formataData($scope.$parent.fim),
		}
		
		ARHHoraExtra.buscaConsolidado(params, function(dados){
			
			var dado = dados[0];

			var serie = [];
			
			for (var p in dado){
				if (/TTL/.test(p)){
					serie.push([p, dado[p]]);
				}
			}
			
			criaGrafico(serie);
			
			criaLegenda(dados);
			
		});
	}
	
	function criaLegenda(dados){

		var Campo = {
			TREINAMENTO : {
				nome : 'TTL_HH_EXTA_TREI',
				label : 'Treinamento',
			},
			FERIAS : {
				nome : 'TTL_HH_EXTA_FERS',
				label : 'Férias',
			},
			EFETIVA : {
				nome : 'TTL_HH_EXTA_EFT',
				label : 'Efetiva',
			},

		}
		
		
		var itens = [];
		var total = 0;
		
		var dado = dados[0];
		
		for (var p in dado){
			
			for (var c in Campo){

				var campo = Campo[c]; 
				
				if (campo.nome == p){
					
					itens.push({
						label 		: campo.label,
						quantidade 	: dado[p],
					});
					
					total += dado[p];
				}
			}
			
		}
		
		$scope.itens = itens;
		$scope.total = total;

	}
	
	$scope.$watchGroup(['inicio', 'fim'], buscaDados);
	
	function criaGrafico(serie){
		$log.debug('comparativos dados', serie);
		
		$.jqplot('graficoComparativo', [serie], opcoesGrafico).replot();
	}
	
	inicia();
	
	
}]);