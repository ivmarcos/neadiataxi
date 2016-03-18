adminApp.controller('ARHHoraExtraTendenciaController', ['$scope', '$log', 'ARHHoraExtra', function ($scope, $log, ARHHoraExtra) {

	var cores = $scope.cores = ['#4bb2c5', '#EAA228', '#c5b47f', '#579575', '#839557', '#958c12', '#953579', '#4b5de4', '#d8b83f', '#ff5800', '#0085cc', '#c747a3', '#cddf54', '#FBD178', '#26B4E3', '#bd70c7'];
	var tipos = $scope.tipos = ['Treinamento', 'Férias', 'Efetiva', 'Total'];
	
	//formata data no padrão yyyy-MM-dd;
	function formataData(data){
		return data.toISOString().substring(0, 10);
	}

	var opcoesGrafico = {
		axes : {
			xaxis : {
				renderer 			: $.jqplot.DateAxisRenderer,
				tickOptions: 		{
					formatString 	: '%#d'
				},	
		        tickInterval		:'1 day',
		        labelOptions 		: {
					fontSize : '5pt'
		        }
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
			        

	function inicia(){
	
		buscaDados();
		
	}
	
	function buscaDados(){
		
		var params = {
			inicio 	: formataData($scope.$parent.inicio),
			fim 	: formataData($scope.$parent.fim),
		}
		
		ARHHoraExtra.buscaTendencia(params, function(dados){
			
			var serie1 	= [],
				serie2 	= [],
				serie3 	= [],
				serie4 	= [];
			
			dados.forEach(function(dado){
				
				serie1.push([new Date(dado.DT_OCOR), dado.TTL_HH_EXTA_TREI]);	
				serie2.push([new Date(dado.DT_OCOR), dado.TTL_HH_EXTA_FERS]);	
				serie3.push([new Date(dado.DT_OCOR), dado.TTL_HH_EXTA_EFT]);	
				serie4.push([new Date(dado.DT_OCOR), dado.TTL_HH_EXTA_PG]);	

			});

			
			criaGrafico([serie1, serie2, serie3, serie4]);
			
		});
	}
	
	$scope.$watchGroup(['inicio', 'fim'], buscaDados);

	
	function criaGrafico(series){
		$.jqplot('graficoTendencia', series, opcoesGrafico).replot();
	}
	
	inicia();
	
	
}]);