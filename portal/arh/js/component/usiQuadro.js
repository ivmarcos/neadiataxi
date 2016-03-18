portalApp.directive('usiQuadro', ['$interpolate', '$compile', '$log', 'ARHEstrutura', function($interpolate, $compile, $log, ARHEstrutura){

	var TEMPLATE_LINHA = 	[
							'<tr id="dado{{dado._index}}" class="{{dado._classes.linha}}" data-index="{{dado._index}}">',
							'	<td>',
							'		<div style="{{dado._styles.label}}">',
							'			<i class="{{dado._classes.expansor}}"></i>',
							'			<span>{{dado._label}}</span>',
							'		</div>',
							'	</td>',
							'	<td class="dados">',
							'		<span>{{dado.TOTAL_DOT_NOTA || 0 | currency : "" : 0}}</span>',
							'	</td>',
							'	<td class="dados">',
							'		<span>{{dado.TOTAL_DOT || 0 | currency : "" : 0}}</span>',
							'	</td>',
							'	<td class="dados">',
							'		<span>{{dado.TOTAL_CST_DOT || 0 | currency : "" : 2}}</span>',
							'	</td>',
							'	<td class="dados">',
							'		<span>{{dado.TOTAL_LOT || 0 | currency : "" : 0}}</span>',
							'	</td>',
							'	<td class="dados">',
							'		<span>{{dado.TOTAL_CST_LOT || 0 | currency : "" : 2}}</span>',
							'	</td>',
							'	<td class="dados">',
							'		<span>{{dado.TOTAL_EXST || 0  | currency : "" : 0}}</span>',
							'	</td>',
							'	<td class="dados">',
							'		<span>{{dado.TOTAL_CST_EXST || 0 | currency : "" : 2}}</span>',
							'	</td>',
							'	<td class="dados">',
							'		<span>{{dado.TOTAL_BLOQ || 0 | currency : "" : 0}}</span>',
							'	</td>',
							'	<td class="dados vagas">',
							'		<span>{{dado.TOTAL_VAG || 0 | currency : "" : 0}}</span>',
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
							'			<td>',
							'				DOTAÇÃO NOTA (B)',
							'			</td>',
							'			<td>',
							'				DOTAÇÃO (C)',
							'			</td>',
							'			<td>',
							'				CUSTO DOTAÇÃO (D)',
							'			</td>',
							'			<td>',
							'				LOTAÇÃO (F)',
							'			</td>',
							'			<td>',
							'				CUSTO LOTAÇÃO (G)',
							'			</td>',
							'			<td>',
							'				EXISTENTES (H)',
							'			</td>',
							'			<td>',
							'				CUSTO EXISTENTES (I)',
							'			</td>',
							'			<td>',
							'				BLOQUEADOS (L)',
							'			</td>',
							'			<td class="vagas">',
							'				VAGAS (M)',
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
			prefixo		: '='
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
						prefixo 	: $scope.prefixo,
						apuracao	: $scope.apuracao.id,
					}
					
					$scope.buscaDados(params);
				}
				
				
			});
			
			
			
			$scope.buscaDados = function(params){
								
				$log.debug('params', params);
				
				ARHEstrutura.buscaQuadroPorPrefixo(params, function(dados){
					
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
				
				//adiciona o pacote agrupador VISIN
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
					label : 'VISIN'
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
							
						if (/TOTAL/.test(p)){
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
				
				
				//remover depois
				manual : function(){
					
					if (this._nivel == 1){
						
						if (this.PRF_DEPE == 4905) this.TOTAL_DOT_NOTA = 890;
						if (this.PRF_DEPE == 9600) this.TOTAL_DOT_NOTA = 14355;
						if (this.PRF_DEPE == 8558) this.TOTAL_DOT_NOTA = 2091;
					}
					if (this._label == 'VISIN') this.TOTAL_DOT_NOTA = 890 + 14335 + 2091;
					
				},
				//seta os atributos usados para exibicao
				atualiza : function(){
					
					var self = this;
					
					//remove depois
					this.manual();
					
					this._label = this._label || this.LBL;
					
					this._styles = {
						label : 'margin-left : ' + 30 * self._nivel + 'px'
					}
					
					this._classes = {
						expansor 		: self.isPai() ? (self._expandido ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o') : 'hidden',
						linha 			: 'usi-estrutura-linha link ' + (self.isPai() ? 'pai' : '') + (self._visivel ? '' : ''),
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
						prefixo 	: self.PRF_DEPE,
						comissao 	: self.CD_CMSS,
						apuracao 	: $scope.apuracao.id
					}
					
					//verifica qual serviço irá utilizar de acordo com o atributo
					var servico = self._nivel == 1 ? ARHEstrutura.buscaQuadroPorComissao : ARHEstrutura.buscaQuadroPorComissaoEPrefixo;
					
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
					this.atualiza();
					this.getLinha().replaceWith(this.html());
					this.adicionaListeners();
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


