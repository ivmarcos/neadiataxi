adminApp.controller('ARHHorasExtrasGraficoController', ['$scope', '$log', 'HorasExtras', function ($scope, $log, HorasExtras) {
	
	var grid = {
		background: 'rgba(57,57,57,0.0)',
		drawBorder: true,
		shadow: false,
		gridLineColor: '#696969',
		gridLineWidth: 1,
	}
	
	function inicia(){
		
		var params = {
			prefixo: '4905,9050,9051,9052,9549'
		}
		
		HorasExtras.buscaDados(params, function(dados){
			criaGraficoHe(dados);
		})
		
	}
	function criaGraficoHe(dados){
		
		var dadosHeTrn = [];
		var dadosHeFer = [];
		var dadosHeEft = [];
		var dadosHeTot = [];
		var dadosHePg = [];
		var id = 'graficoHorasExtras';
		var ticks = [];
		
		dados.forEach(function(dado){
			
			ticks.push(dado.MES_REF);
			
			dadosHeTrn.push(dado.HE_TREIN);
			dadosHeFer.push(dado.HE_FERIAS);
			dadosHeEft.push(dado.HE_EFET);
			dadosHeTot.push(dado.TOTAL);
			dadosHePg.push(dado.VLR_PAGO);
			
			console.log('dadosHeTrn', dadosHeTrn);
			console.log('dadosHeFer', dadosHeFer);
			console.log('dadosHeEft', dadosHeEft);
			console.log('dadosHeTot', dadosHeTot);
			console.log('dadosHePg', dadosHePg);
			
		})
		$.jqplot.sprintf.thousandsSeparator = '.';
		$.jqplot.sprintf.decimalMark = ',';
		$.jqplot(id, [dadosHeTrn, dadosHeFer, dadosHeEft, dadosHeTot, dadosHePg], {
			grid: grid,
			// Azul, Laranja, Cinza, Amarelo, Vermelho
			seriesColors: ["#4169E1","#FF8000","#6E6E6E","#DBA901","#FF0000"], 
			seriesDefaults: {
				renderer:$.jqplot.BarRenderer,
				pointLabels: { show: true }
			},
			series:[
				{label:'Treinamento'},
				{label:'Ferias'},
				{label:'Efetiva'},
				{label:'Total'},
				{label:'Valor Pago', renderer: $.jqplot.LineRenderer, linePattern: 'dashed', yaxis:'y2axis'}
			],
			axes: {
				xaxis: {
					renderer: $.jqplot.CategoryAxisRenderer,
					ticks: ticks,
					tickOptions: {
						angle: -30,
					},
					tickRenderer: $.jqplot.CanvasAxisTickRenderer,
				},
				yaxis: {
					tickOptions: {
						showGridline: false,
						formatString: '%.1f'
					},
					autoscale:true,
				},
				y2axis: {
					tickOptions: {
						showGridline: false,
						formatString: "R$%'.2f"
					},
					autoscale:true,
				}
			},
		}).replot();
	}
	
	inicia();
}]);