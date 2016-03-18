portalApp.directive('usiHoraExtra', ['$interpolate', '$compile', '$log', '$routeSegment', 'ARHHoraExtra', function($interpolate, $compile, $log, $routeSegment, ARHHoraExtra){

	//formata data no padrão yyyy-MM-dd;
	var formataData = function(data){
		return data.toISOString().substring(0, 10);
	}
	
	var TEMPLATE_LINHA = 	[
							'<tr id="dado{{dado._index}}" class="{{dado._classes.linha}}" data-index="{{dado._index}}">',
							'	<td>',
							'		<div style="{{dado._styles.label}}">',
							'			<i class="{{dado._classes.expansor}}"></i>',
							'			<span title="{{dado._titles.label}}">{{dado._label}}</span>',
							'		</div>',
							'	</td>',
							'	<td class="text-center">',
							'		<span>{{(dado.TTL_QT_OCOR_HH_EXTA || 0)}}</span>',	
							'	</td>',
							'	<td class="{{dado._classes.coluna.hora}}">',
							'		<span class="{{dado._classes.he.treinamento}}">{{(dado.TTL_HH_EXTA_TREI || 0 | usiHoraFormatada)}}</span>',	
							'	</td>',
							'	<td class="{{dado._classes.coluna.hora}}">',
							'		<span class="{{dado._classes.he.ferias}}">{{dado.TTL_HH_EXTA_FERS || 0 | usiHoraFormatada }}</span>',	
							'	</td>',
							'	<td class="{{dado._classes.coluna.hora}}">',
							'		<span class="{{dado._classes.he.efetiva}}">{{dado.TTL_HH_EXTA_EFT || 0 | usiHoraFormatada}}</span>',	
							'	</td>',
							'	<td class="{{dado._classes.coluna.hora}}">',
							'		<span class="{{dado._classes.he.paga}}">{{dado.TTL_HH_EXTA_PG || 0 | usiHoraFormatada}}</span>',	
							'	</td>',
							'	<td class="text-center">',
							'		<span class="{{dado._classes.valorPago}}">{{dado.TTL_VL_PG || 0 | currency : "" : 2}}</span>',	
							'	</td>',
							'</tr>',
							].join('');
					
	var TEMPLATE_TABELA = 	[
							'<table class="table table-condensed" id="horaExtra">',
							'	<thead class="cabecalho">',
							'		<tr>',
							'			<td>',
							'				DEPENDÊNCIA / UOR / FUNCIONÁRIO',
							'			</td>',
							'			<td>',
							'				QTD. OCORRÊNCIAS',
							'			</td>',
							'			<td>',
							'				H.E. TREINAMENTO',
							'			</td>',
							'			<td>',
							'				H.E. FÉRIAS',
							'			</td>',
							'			<td>',
							'				H.E. EFETIVA',
							'			</td>',
							'			<td>',
							'				H.E. PAGA',
							'			</td>',
							'			<td>',
							'				TOTAL PAGO',
							'			</td>',
							'		</tr>',
							'	</thead>',
							'</table>'
							].join('');
	
	return {
		restrict : 'E',
		scope : {
			inicio 		: '=',
			fim 		: '=',
		},
		controller : ['$scope', '$uibModal', function($scope, $modal){
			
			
			$scope.detalha = function(dado){
				
				var params = {
					inicio 		: formataData($scope.inicio),
					fim 		: formataData($scope.fim),
					matricula 	: dado.MTC_FUN
				}
				
				for (var p in $scope.paramsUrl){
					params[p] = $scope.paramsUrl[p];
				}
				
				ARHHoraExtra.buscaOcorrenciaFuncionario(params, function(dados){
					
					$modal.open({
						templateUrl: '/portal/arh/hora-extra/_modal_detalhe_ocorrencia.html',
						controller: 'ARHHoraExtraDetalheOcorrenciaController',
						size : 'lg',
						resolve : {
							dado : function(){
								return dado;
							},
							dados : function(){
								return dados;
							},
							periodo : function(){
								return {
									inicio 	: $scope.inicio,
									fim 	: $scope.fim
								};
							}
						}
					});
					
				});
				
			}
			
			//observa mudanças nas propriedades de inicio e fim
			$scope.$watchGroup(['inicio', 'fim'], function(){
				
				
				if ($scope.inicio && $scope.fim){
					
					var params = getParametros();
					
					$scope.buscaDados(params);
				}
				
				
			});
			
			function getParametros(){
				
				//parametros padrão
				var params = {
					inicio 	: formataData($scope.inicio),
					fim 	: formataData($scope.fim)
				}
				
				//parametros url
				$scope.paramsUrl = paramsUrl = $routeSegment.$routeParams;
				
				for (var p in paramsUrl){
					params[p] = paramsUrl[p];
				}

				return params;
			}
			
			
			$scope.buscaDados = function(params){
								
				$log.debug('params', params);
				
				ARHHoraExtra.buscaGrupoPorPrefixo(params, function(dados){
					
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
				
				//adiciona o pacote agrupador USI
				criaPacote(_dados);
				
				_dados.forEach(function(dado, index){
					
					dado._index = index;
					
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
			
			function criaPacote(dados, opcoes){
				
				var opcoesPadrao = {
					label : 'USI'
				}
				
				if (!opcoes){
					opcoes = opcoesPadrao;
				}else{
					for (var p in opcoesPadrao){
						if (!opcoes.hasOwnProperty(p)) opcoes[p] = opcoesPadrao[p];
					}
				}
				
				var pacote = {
					_label : opcoes.label,
					_nivel : opcoes.nivel || 0,
					_pacote : true,
					_index : 0,
					_expandido : true,
					_carregado : true,
				}
				
				var clone = dados[0];
				
				//agrupa as informações (soma as quantidades)
				dados.forEach(function(dado){
					
					dado._nivel = pacote._nivel + 1;
					dado._visivel = true;
					dado._pai = pacote._index;
					dado._pacote = true;
					
					for (var p in dado){
							
						if (/TTL/.test(p)){
							if (!pacote.hasOwnProperty(p)) pacote[p] = 0;
							pacote[p] += dado[p] || 0;
						}
						
					}
					
				});
				
				dados.unshift(pacote);
				
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
				
			}
		
			var Funcoes = {
				
				//seta os atributos usados para exibicao
				atualiza : function(){
					
					var self = this;
					
					this._label = this._label || this.LBL;
					
					this._styles = {
						label : 'margin-left : ' + 30 * self._nivel + 'px'
					}
					
					this._titles = {
						label : self._nivel == 3 ? 'Ver histórico' : null
					}
					
					this._classes = {
						expansor 		: self.isPai() ? (self._expandido ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o') : 'hidden',
						linha 			: 'usi-estrutura-linha link ' + (self.isPai() ? 'pai' : '') + (self._visivel ? '' : ''),
						he 				: {
							treinamento 	: !self.TTL_HH_EXTA_TREI ? 'zero' : '',
							ferias 			: !self.TTL_HH_EXTA_FERS ? 'zero' : '',
							efetiva 		: !self.TTL_HH_EXTA_EFT ? 'zero' : '',
							paga 			: !self.TTL_HH_EXTA_PG ? 'zero' : '',
						},
						valorPago		: !self.TTL_VL_PG ? 'zero' : '',
						coluna 			: {
							hora : 'text-center coluna-hora',
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
						
						if (!this._carregado){
							
							this.carrega();
							
						}else{
							
							this.getFilhos().forEach(function(filho){
								filho.exibe();
							});
						}
						
						this._expandido = true;
						
						this.atualizaView();
					
					}
										
				},
				
				//carrega dados do servidor (os filhos)
				carrega : function(){
					
					$log.debug('Carregando', this);
					
					var self = this;

					var params = {
						inicio 		: formataData($scope.inicio),
						fim 		: formataData($scope.fim),
						prefixo		: self.PRF_DEPE,
						uor			: self.CD_UOR
					}
					
					for (var p in $scope.paramsUrl){
						params[p] = $scope.paramsUrl[p];
					}
					
					//verifica qual serviço irá utilizar de acordo com o nível
					var servico = self._nivel == 1 ? ARHHoraExtra.buscaGrupoPorUOR : ARHHoraExtra.buscaGrupoPorFuncionario;
					
					servico(params, function(dados){
					
						var linhas = [];
						
						var lastIndex = _dados.length;
						
						dados.forEach(function(dado, index){
							
							dado._index = lastIndex + index;
							dado._nivel = self._nivel + 1;
							dado._pai = self._index;
							dado._visivel = true;
								
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
							
							dado.adicionaListeners();
							
						});
						
						_dados = _dados.concat(dados);
						
						self._carregado = true;
	
					});
					
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
					var self = this;
					self.atualiza();
					self.getLinha().replaceWith(self.html());
					self.adicionaListeners();
				},
				
				adicionaListeners : function(){
					this.getLinha().bind('click', Listeners.LINHA);
				},
				
				getFilhos : function(){
					var self = this;
					return _dados.filter(function(d){return d._pai == self._index});
				},
				
				getLinha : function(){
					return $('#dado' + this._index);
				},
				
				isPai : function(){
					return this._pacote || this.PCT;
				},
				
			}
		}	
	}

}]);


