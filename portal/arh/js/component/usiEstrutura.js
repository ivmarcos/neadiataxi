portalApp.directive('usiEstrutura', ['$interpolate', '$compile', '$log', '$timeout', '$rootScope', 'ARHEstrutura', 'ARHPerfil', function($interpolate, $compile, $log, $timeout, $rootScope, ARHEstrutura, ARHPerfil){

	var TEMPLATE_LINHA = 	[
							'<tr id="dado{{dado._index}}" class="{{dado._classes.linha}}" data-index="{{dado._index}}">',
							'	<td>',
							'		<div style="{{dado._estilos.label}}">',
							'			<i class="{{dado._classes.expansor}}"></i>',
							'			<span>{{dado._label}}</span>',
							'		</div>',
							'	</td>',
							'	<td class="dados">',
							'		<span>{{dado.TOTAL_QT_DOT_NOTA || 0 | currency : "" : 0}}</span>',
							'	</td>',
							'	<td class="dados">',
							'		<span class="{{dado._classes.dotacao}}">{{(dado.TOTAL_QT_DOT || 0) | currency : "" : 0}}</span>',
							'	</td>',
							'	<td class="{{dado._classes.coluna.custo}}">',
							'		<span class="{{dado._classes.orcado}}">{{(dado.TOTAL_VL_ORC_DEPE || 0) | currency : "" : 2}}</span>',
							'	</td>',
							'	<td class="{{dado._classes.coluna.custo}}">',
							'		<span class="{{dado._classes.custoDotacao}}">{{(dado.TOTAL_CST_CMSS_DOT || 0) | currency : "" : 2}}</span>',
							'	</td>',
							'	<td class="{{dado._classes.coluna.custo}}">',
							'		<span>{{(dado.TOTAL_VL_ORC_DEPE - dado.TOTAL_CST_CMSS_DOT || 0) | currency : "" : 2}}</span>',
							'	</td>',
							'	<td class="dados">',
							'		<span class="{{dado._classes.lotacao}}">{{(dado.TOTAL_QT_LOT || 0) | currency : "" : 0}}</span>',
							'	</td>',
							'	<td class="{{dado._classes.coluna.custo}}">',
							'		<span class="{{dado._classes.custoLotacao}}">{{(dado.TOTAL_CST_CMSS_LOT || 0) | currency : "" : 2}}</span>',
							'	</td>',
							'	<td class="{{dado._classes.coluna.custo}}">',
							'		<span>{{(dado.TOTAL_VL_ORC_DEPE - dado.TOTAL_CST_CMSS_LOT || 0) | currency : "" : 2}}</span>',
							'	</td>',
							'	<td class="dados">',
							'		<span class="{{dado._classes.existente}}">{{(dado.TOTAL_QT_EXST || 0) | currency : "" : 0}}</span>',
							'	</td>',
							'	<td class="{{dado._classes.coluna.custo}}">',
							'		<span class="{{dado._classes.custoExistente}}">{{(dado.TOTAL_CST_CMSS_EXST || 0) | currency : "" : 2}}</span>',
							'	</td>',
							'	<td class="{{dado._classes.coluna.custo}}">',
							'		<span>{{(dado.TOTAL_VL_ORC_DEPE - dado.TOTAL_CST_CMSS_EXST || 0) | currency : "" : 2}}</span>',
							'	</td>',
							'	<td class="{{dado._classes.coluna.quadro}}">',
							'		<span class="{{dado._classes.bloqueado}}">{{(dado.TOTAL_QT_BLOQ || 0) | currency : "" : 0}}</span>',
							'	</td>',
							'	<td class="{{dado._classes.coluna.vagas}}">',
							'		<span class="{{dado._classes.vagas}}">{{(dado.TOTAL_QT_VAG || 0) | currency : "" : 0}}</span>',
							'	</td>',
							'</tr>',
							].join('');
					
	var TEMPLATE_TABELA = 	[
							'<table class="table table-condensed">',
							'	<thead class="cabecalho">',
							'		<tr>',
							'			<td>',
							'				DEPENDÊNCIA / COMISSÃO',
							'			</td>',
							'			<td class="dados">',
							'				DOTAÇÃO (A) <br/> NOTA 2016/00078',
							'			</td>',
							'			<td class="dados">',
							'				DOTAÇÃO (B) </br> ARH',
							'			</td>',
							'			<td class="dados" ng-if="visao.id == 2">',
							'				ORÇADO (C) </br> ORC',
							'			</td>',
							'			<td class="dados" ng-if="visao.id == 2">',
							'				CUSTO DOTAÇÃO (D)',
							'			</td>',
							'			<td class="dados" ng-if="visao.id == 2">',
							'				REDUTOR (E = C - D)',
							'			</td>',
							'			<td class="dados">',
							'				LOTAÇÃO (F) </br> ARH',
							'			</td>',
							'			<td class="dados" ng-if="visao.id == 2">',
							'				CUSTO LOTAÇÃO (G)',
							'			</td>',
							'			<td class="dados" ng-if="visao.id == 2">',
							'				(H = C - G)',
							'			</td>',
							'			<td class="dados">',
							'				EXISTENTES (I) </br> ARH',
							'			</td>',
							'			<td class="dados" ng-if="visao.id == 2">',
							'				CUSTO EXISTENTES (J)',
							'			</td>',
							'			<td class="dados" ng-if="visao.id == 2">',
							'				(L = C - J)',
							'			</td>',
							'			<td class="dados" ng-if="visao.id < 2">',
							'				BLOQUEADOS (M) </br> ARH',
							'			</td>',
							'			<td class="dados vagas" ng-if="visao.id < 2">',
							'				VAGAS (N) </br> ARH',
							'			</td>',
							'		</tr>',
							'	</thead>',
							'</table>'
							].join('');
	
	return {
		restrict : 'E',
		scope : {
			apuracao 	: '=',
			visao 		: '=',
		},
		controller : ['$scope', '$uibModal', function($scope, $modal){
			
			$scope.detalha = function(dado){
				
				$modal.open({
					templateUrl: '/portal/arh/estrutura/_modal_funcionario.html',
					controller: 'ARHEstruturaModalFuncionarioController',
					size : 'lg',
					resolve : {
						dado : function(){
							return dado;
						},
						apuracao : function(){
							return $scope.apuracao;
						}
					}
				});
				
			}
			
			//observa mudanças nas propriedades de apuracao e visao
			$scope.$watchGroup(['apuracao', 'visao'], function(){
				
				if ($scope.apuracao){

					var params = {
						prefixo : 8010,
						id		: $scope.apuracao.id,
						visao 	: $scope.visao.id,
					}
					
					$scope.buscaDados(params);
				}
				
				
			});
			
			$scope.buscaDados = function(params){
								
				$log.debug('params', params);
				
				ARHEstrutura.buscaDadosSubordinacao(params, function(dados){
					
					$scope.dados = dados;
					
				});
				
			}
			
		}],
		link : function($scope, element, attrs){ // Manipulação do DOM 
			
			var _dados = [];
			
			$scope.$watch('dados', function(dados){
				
				_dados = dados;
				
				if (_dados) inicia();
							
			});
			
			//renderiza a tabela
			function inicia(){
				
				$log.debug('Renderizando a tabela');
				
				var tabela = $compile(TEMPLATE_TABELA)($scope);
				
				var linhas = [];
				
				criaAgrupamentos(_dados, null, {exibirFilho : true, labelRede : 'VISIN'}); 
				
				_dados.forEach(function(dado, index){
					
					for (var f in Funcoes){
						dado[f] = Funcoes[f];
					}
				
					//seta as propriedades usadas para renderização (classes)
					dado.atualiza();
					
					linhas.push(dado.html());
					
					
				});

				tabela.append(linhas);
				
				element.empty().append(tabela);
				
				//depois de renderizado adiciona os listeners
				_dados.forEach(function(dado){
					dado.adicionaListeners();
				})
				
				
				
			}
			
			function criaAgrupamentos(dados, dadoPai, opcoes){
				
				var opcoesPadrao = {
					exibirFilho 	: false,
					labelProprio 	: 'PRÓPRIO',
					labelRede		: 'REDE'
				}
				
				if (!opcoes) {
					opcoes = opcoesPadrao;
				}else{
					
					for (var p in opcoesPadrao){
						if (!opcoes.hasOwnProperty(p)) opcoes[p] = opcoesPadrao[p];
					}
					
				}
				
				$log.debug('opcoes', opcoes);
				
				var nivelRaiz = 0,
					lastIndex = dadoPai ? _dados.length : 0;
				
				if (dadoPai){
					nivelRaiz = dadoPai._nivel + 1;
				}
				
				var pacoteProprio = {
					_label 		      : opcoes.labelProprio,
					_nivel 		      : nivelRaiz,
					_pai 		      : dadoPai ? dadoPai._index : undefined,
					_pacote 	      : true,
					_expandido 		  : opcoes.exibirFilho,
				}
				
				var pacoteRede = {
					_label		: dadoPai ? dadoPai.NM_REDE_DEPE || opcoes.labelRede : opcoes.labelRede,
					_nivel 		: nivelRaiz,
					_pai 		: dadoPai ? dadoPai._index : undefined,
					_pacote 	: true,
					_expandido 	: opcoes.exibirFilho,
				}

				var primeiroDaRede, contemRede;
				
				primeiroDaRede = contemRede = dados.filter(function(d){return !d.CD_CMSS && !d._pacote;})[0];
				primeiroDaComissao = contemComissao = dados.filter(function(d){return d.CD_CMSS && !d._pacote;})[0];
				
				if (contemComissao && contemRede){
					
					dados.unshift(pacoteProprio);
					
				}
				
				if ((contemRede && contemComissao) || !dadoPai){

					var indexPrimeiroDaRede = dados.indexOf(primeiroDaRede);
					
					dados.splice(indexPrimeiroDaRede, 0, pacoteRede);
				
				}
				
				for (var index = 0; index < dados.length; index++){

					var d = dados[index];
					
					d._index = lastIndex + index;
					
					if (d._pacote) {
						d._visivel = true;
						continue;
					}
				
					d._visivel = contemRede && contemComissao ? opcoes.exibirFilho : true;
					

					if (d.CD_CMSS) {
						
						var referencia = contemComissao && contemRede ? pacoteProprio : dadoPai;
						d._pai = referencia._index;
						d._nivel = referencia._nivel + 1;
						
					}else{
						
						var referencia = (contemRede && contemComissao) || !dadoPai ? pacoteRede : dadoPai;
						d._pai = referencia._index;
						d._nivel = referencia._nivel + 1;
					}
					
					for (var p in d){
						
						//somente os atributos TOTAL, para somar
						if (/TOTAL/.test(p)){
							
							//inicializa atributos
							if (!pacoteProprio[p]) pacoteProprio[p] = 0;
							if (!pacoteRede[p]) pacoteRede[p] = 0;
							
							//soma as qtds
							if (d.CD_CMSS) {
								pacoteProprio[p] += d[p] || 0;	
							}else{
								pacoteRede[p] += d[p] || 0;
							}
						}
					}
					
				}

				
				$log.debug('pacoteRede', pacoteRede);
				
				$log.debug('pacoteProprio', pacoteProprio);
				
				$log.debug('dados', dados);

			}
			
									
			//retorna o dado correspondente da linha
			function getDado(linha){
				var index = linha.getAttribute('data-index');
				return _dados.filter(function(d){return d._index == index})[0];
			}
			
			var Listeners = {
				
				LINHA : function(event){
					
					var dado = getDado(this);
					
					$log.debug('Clicou', dado);
					
					dado.click();
				},
				
				EDITOR : function(event){
					
					var linha = $(this).closest('tr')[0];
					
					$log.debug('Clicou editor');
					
					var dado = getDado(linha);

					event.stopPropagation();
					
					dado.edita();
					
					
				}
				
			}
		
			var Funcoes = {
				
				//remover depois, ajustes manuais
				manual : function(){
					
					if (this._nivel == 1){
						
						if (this.PRF_DEPE == 4905) {
							this.TOTAL_QT_DOT_NOTA = 890;
							//this.TOTAL_VL_ORC_DEPE = 16144296;
						}
						
						if (this.PRF_DEPE == 9600) this.TOTAL_QT_DOT_NOTA = 14355;
						if (this.PRF_DEPE == 8558) this.TOTAL_QT_DOT_NOTA = 2091;
					}
					if (this._label == 'VISIN') this.TOTAL_QT_DOT_NOTA = 890 + 14335 + 2091;
					
				},
				//seta os atributos usados para exibicao
				atualiza : function(){
					
					var self = this;
					
					//remove depois
					this.manual();
					
					this.TOTAL_QT_VAG_AJST = (this.TOTAL_QT_VAG || 0) - (this.TOTAL_QT_GRV || 0);
					
					if (!this._label){
						
						if (this.CD_CMSS){

							var prefixoComissao = this.isFuncionario() ? this.CD_CMSS + ' - ' : '';
							
							this._label = prefixoComissao + this.NM_CMSS;
							
						}else{
							
							var prefixoDependencia = this.PRF_DEPE.toString().length < 5 ? this.PRF_DEPE + ' - ' : '';
							
							this._label = prefixoDependencia + this.NM_DEPE;
						}
						
					}
					
					this._estilos = {
						label : 'margin-left : ' + 30 * self._nivel + 'px'
					}
					
					this._classes = {
						expansor 		: self.isPai() ? (self._expandido ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o') : 'hidden',
						linha 			: 'usi-estrutura-linha link ' + (self.isPai() ? 'pai' : '') + (self._visivel ? '' : ' hidden'),
						editor 			: self.isPai() ? 'hidden' : 'usi-estrutura-editor text-muted fa fa-pencil',
						lotacao 		: !self.TOTAL_QT_LOT ? 'zero' : '',
						custoDotacao	: !self.TOTAL_CST_CMSS_DOT ? 'zero' : '',
						custoExistente	: !self.TOTAL_CST_CMSS_EXST ? 'zero' : '',
						dotacao 		: !self.TOTAL_QT_DOT ? 'zero' : '',
						bloqueado 		: !self.TOTAL_QT_BLOQ ? 'zero' : '',
						vagas 			: !self.TOTAL_QT_VAG ? 'zero' : '',
						existente 		: !self.TOTAL_QT_EXST ? 'zero' : '',
						gravacao 		: !self.TOTAL_QT_GRV ? 'zero' : '',
						vagaAjustada 	: !self.TOTAL_QT_VAG_AJST ? 'zero' : '',
						orcado			: !self.TOTAL_VL_ORC_DEPE ? 'zero' : '',
						coluna			: {
								custo	: 'dados ' + ($scope.visao.id < 2 ? 'hidden' : ''),
								quadro  : 'dados ' + ($scope.visao.id < 2 ? '' : 'hidden'),
								vagas 	: 'dados vagas ' + ($scope.visao.id < 2 ? '' : 'hidden'),
						}
					}
					
				},
				
				edita : function(){
					
					$log.debug('editando..');
					
					$scope.edita(this);
					
				},
				
				click : function(){
					
					if (this.isPai()){
						
						if (!this._expandido){
							this.expande();
						}else{
							this.recolhe();
						}
						
					}else{
						
						$scope.detalha(this);
					}
				},
				
				expande : function(){
					
					if (this.isPai()){
						
						$log.debug('Expandindo...');
					
						var self = this;
						
						if (!this._pacote && !this._carregado){
							
							var params = {
								prefixo : this.PRF_DEPE,
								id 		: this.CD_APR,
								visao	: $scope.visao.id,
							}
							
							//busca os dados subordinados 
							ARHEstrutura.buscaDadosSubordinacao(params, function(dados){
								
								var lastIndex = _dados.length;
								var linhas = [];
								
										//teste
								criaAgrupamentos(dados, self);
								
								dados.forEach(function(dado, index){
									
									for (var f in Funcoes){
										dado[f] = Funcoes[f];
									}
				
									dado.atualiza();
									
									linhas.push(dado.html());
									
								});
								
								//insere as linhas na posição atual
								self.getLinha().after(linhas);
								
								//depois de renderizado adiciona os listeners
								dados.forEach(function(dado){
									
									//$log.debug('adicionando listeners', dado);
									
									dado.adicionaListeners();
									
								});
								
						
								
								_dados = _dados.concat(dados);
								
							});
							
							this._carregado = true;
							
						}else{
							
							this.getFilhos().forEach(function(filho){
								filho.exibe();
							});
						}
						
						this._expandido = true;
						
						this.atualizaView();
					
					}
										
				},
				
				recolhe : function(){
					
					if (this.isPai()){
						
						$log.debug('Recolhendo...');

						this.getFilhos().forEach(function(filho){
							filho.recolhe();
							filho.oculta();
						});
						
						this._expandido = false;
						
						this.atualizaView();
					}
					
				},
				
				oculta : function(){
					this._visivel = false;
					this.getLinha().addClass('hidden');
				},
				
				exibe : function(){
					this._visivel = true;
					this.getLinha().removeClass('hidden');
				},
				
				html : function(){
					var self = this;
					return $interpolate(TEMPLATE_LINHA)({dado : self});
				},
				
				atualizaView : function(){
					this.atualiza();
					this.getLinha().replaceWith(this.html());
					this.adicionaListeners();
				},
				
				adicionaListeners : function(){
					this.getLinha().bind('click', Listeners.LINHA);
					this.getEditor().bind('click', Listeners.EDITOR);
				},
				
				getFilhos : function(){
					var self = this;
					return _dados.filter(function(d){return d._pai == self._index});
				},
				
				getEditor : function(){
					return this.getLinha().children('td').children('.usi-estrutura-editor');
				},
				
				getLinha : function(){
					return $('#dado' + this._index);
				},
				
				isPai : function(){
					return !this.CD_CMSS || this._pacote;
				},
				
				isFuncionario : function(){
					return this.CD_CMSS > 4;
				}
				
			}
		}	
	}

}]);


