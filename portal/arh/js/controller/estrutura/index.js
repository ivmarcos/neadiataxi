adminApp.controller('ARHEstruturaController', ['$scope', '$log', '$uibModal', 'Sessao', 'ARHEstrutura', function ($scope, $log, $modal, Sessao, ARHEstrutura) {
	
	var gridOptions = {
		background: 'rgba(57,57,57,0.0)',
		drawBorder: false,
		shadow: false,
		gridLineColor: '#ddd',
		gridLineWidth: 1
	}

	var Visao = {
		VISIN : {
			id : 0,
			label : 'VISIN',
		},
		VISIN_TODOS : {
			id : 1,
			label : 'Demais Colaboradores',
		},
		VISIN_CUSTO : {
			id : 2,
			label : 'Custo',
		},
		/*DEPENDENCIA : {
			id : 3,
			label : 'Dependência',
			grupo : {
				campo : 'PRF_DEPE',
				ordem : 'CD_CMSS',
				nome : function(dado){
					return dado.PRF_DEPE + ' - ' + dado.NM_DEPE;
				},
				nomeSubgrupo : function(dado){
					return Visao.COMISSAO.grupo.nome(dado);
				}
			}
		},*/
		COMISSAO : {
			id : 4,
			label : 'Comissão',
			grupo : {
				campo : 'CD_CMSS',
				ordem : 'PRF_DEPE',
				nome : function(dado){
					var prefixoComissao = dado.CD_CMSS > 4 ? dado.CD_CMSS + ' - ' : '';
					return prefixoComissao + dado.NM_CMSS;
				},
				nomeSubgrupo : function(dado){
					return	Visao.DEPENDENCIA.grupo.nome(dado);
				}
			}
		},
		
	}
	
	$scope.categoria = {
		1 : {
			expandida : true,
			nome : 'Destino'
		},
		2 : {
			expandida : true,
			nome : 'Origem'
		}
	}
	
	$scope.selecionaVisao = function(visao){
		$scope.visao = visao;
		$scope.buscaDados();
	}
		
	function inicia(){
		
		//cria a lista os grupos
		
		$scope.visoes = [];
		$scope.visao = Visao.VISIN;
		
		for (var p in Visao){
			
			$scope.visoes.push(Visao[p]);
			
		}
		
		//grupo padrão
		
		buscaApuracoes();
	}
	
	function buscaApuracoes(){

		$scope.apuracoes = [];
		
		ARHEstrutura.buscaApuracoes(function(dados){
			
			dados.forEach(function(dado){
				
				$scope.apuracoes.push({
					id 			: dado.CD_APR,
					apuracao 	: dado.TS_APR
				});
				
			});
			
			//última apuracação como a padrão
			$scope.apuracao = $scope.apuracoes[$scope.apuracoes.length - 1];
			
			$scope.buscaDados($scope.apuracao);
			
			//gráfico
			//buscaAjustesPorTempo();
			
		});
		
	}
	
	$scope.buscaDados = function(apuracao){
		
		$scope.apuracao = apuracao || $scope.apuracao;
		
		$scope.grupos = {};
		
		$scope.params = {
			id 		: $scope.apuracao.id,
			visao 	: $scope.visao.id,
		}
		
		if ($scope.visao.id > 2){
			
			ARHEstrutura.buscaDados($scope.params, function(dados){
			
				$scope.dados = dados;

				dados.forEach(function(dado){
					
					var grupoId = dado[$scope.visao.grupo.campo];
					
					var nome = $scope.visao.grupo.nome(dado);
					
					$scope.grupos[grupoId] = {
						nome : nome
					}
					
				});
				
				$log.debug('grupos', $scope.grupos);
		
			});
			
		}
		
		
	}
	
	$scope.expandeGrupo = function(grupoId){
		$scope.grupos[grupoId].expandido = ! $scope.grupos[grupoId].expandido;
	}

	$scope.expandeTipo = function(tipo){
		$scope.categoria[tipo].expandida = ! $scope.categoria[tipo].expandida;
	}
	
	$scope.detalha = function(dado){
		$modal.open({
			templateUrl: '/portal/arh/estrutura/_modal_funcionario.html',
			controller: 'ARHEstruturaModalFuncionarioController',
			size : 'lg',
			resolve : {
				dado : function(){
					return dado;
				}
			}
		})
	}
	
	$scope.subtotalGrupo = function(grupoId, tipo, campo){
		
		if (!$scope.dados) return 0;

		var dados = $scope.dados.filter(function(d){return d[$scope.visao.grupo.campo] == grupoId && d.TIP_DEPE == tipo});
		
		var subtotal = 0;

		if (!dados) return 0;
		
		dados.forEach(function(dado){
			if (dado[campo]) subtotal += dado[campo];
		});
		
		return subtotal;
		
	}
	
	$scope.total = function(campo){
		
		if (!$scope.dados) return 0;
		
		var dados = $scope.dados;
		
		if (!dados) return 0;
		
		var total = 0;
		
		dados.forEach(function(dado){
			if (dado[campo]) total += dado[campo];
		});
		
		return total;
		
	}
	
	$scope.edita = function(dado){
		$modal.open({
			templateUrl: '/portal/arh/estrutura/_modal.html',
			controller: 'ARHEstruturaModalController',
			size : 'sm',
			resolve : {
				dado : function(){
					return dado;
				}
			}
		})
		.result.then(
			function(gravacao){
				dado.CD_GRV 			= gravacao.id;
				dado.QT_GRV 			= gravacao.quantidade;
				dado.CD_USU_INCL_GRV 	= gravacao.usuarioInclusao_id;
				dado.CD_USU_ATL_GRV 	= gravacao.usuarioAtualizacao_id;
				dado.TS_INCL_GRV 		= gravacao.dataHoraInclusao;
				dado.TS_ATL_GRV			= gravacao.dataHoraAtualizacao;
			}
		);
		
	}
	
	$scope.subtotalTipo = function(tipo, campo){
		
		if (!$scope.dados) return 0;

		var dados = $scope.dados.filter(function(d){return d.TIP_DEPE == tipo});
		
		var subtotal = 0;

		if (!dados) return 0;
		
		dados.forEach(function(dado){
			if (dado[campo]) subtotal += dado[campo];
		});
		
		return subtotal;
	}
	
	
	$scope.consolida = function(campo){
		
		if (!$scope.dados) return 0;

		var subtotal1 = $scope.subtotalTipo(1, campo);
		var subtotal2 = $scope.subtotalTipo(2, campo);
		
		return subtotal1 - subtotal2;

	}
	
	$scope.consolidaAjustada = function(){
		
		if (!$scope.dados) return 0;

		var subtotalVagas1 		= $scope.subtotalTipo(1, 'QT_VAG');
		var subtotalEmGravacao1 = $scope.subtotalTipo(1, 'QT_GRV');
		var subtotalVagas2		= $scope.subtotalTipo(2, 'QT_VAG');
		var subtotalEmGravacao2 = $scope.subtotalTipo(2, 'QT_GRV');
		
		return (subtotalVagas1 - subtotalEmGravacao1) + (subtotalVagas2 + subtotalEmGravacao2);
		
	}
		
	function buscaAjustesPorTempo(){
		
		ARHEstrutura.buscaAjustesPorTempo(function(dados){
			
			var serie1 = [];
			
			dados.forEach(function(dado){
				
				var data = new Date(dado.TS_APR);
				
				serie1.push([data, dado.TOTAL_AJST]);
				
			});
			
			criaGrafico(serie1);
			
		});
	}
	
	function criaGrafico(data){
		
		$.jqplot('grafico', [data], {
		      axes:{
		        xaxis:{
		          renderer: $.jqplot.DateAxisRenderer,
		          //labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
		          tickOptions:{formatString:'%#d %b'},
		          tickInterval:'1 day',
		          labelOptions : {
		        	  fontSize : '5pt'
		          }
		        },
		        yaxis : {
		          //min : -20,
		         // labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
		          labelOptions : {
		        	  fontSize : '5pt'
		          }
		        }
		      },
		      grid : gridOptions,
			  seriesDefaults : {
				  pointLabels : {
					  show : true
				  }
			  },
		      series:[{lineWidth: 3}]
		}).replot();
		
	}
	
	inicia();
	
}]);


