portalApp.factory('Sessao', ['$q', '$http', 'CacheFactory', 'Autorizacao', '$log', 'URL_API', function($q, $http, CacheFactory, Autorizacao, $log, URL_API) {

	var KEY_SESSION = 'usiSession';
	var	KEY_USER = 'user';
	var KEY_ROLES = 'usiRoles';
	var URL_BASE = URL_API + '/portal/sessao'; 
	 
	var cache = CacheFactory(KEY_SESSION, {
		maxAge: 30 * 60 * 1000,
		onExpire: function(){
			$log.debug('Sessão expirada. Removendo cache.')
		}
	}); 
	
	//var cookie = ipCookie;
	var _usuario;
	var	_acessos = [];
	
	function verificaAcesso(transacao){
		
		$log.debug('Verificando acesso à transação', transacao);
		
		var deferred = $q.defer();
		
		acessos().then(function(){
			
			if (possuiAcesso()) {
				
				$log.debug('Acesso permitido para transação', transacao);
				deferred.resolve(true);
				
			}else{
				
				$log.debug('Acesso negado local. Verificando acesso no servidor', transacao);
				
				Autorizacao.transacao({transacao : transacao}, function(permissao){

					if (permissao.ok){
						
						$log.debug('Acesso liberado no servidor', transacao);
						_acessos.push(transacao);
						put(KEY_ROLES, _acessos);
						//putCookie(KEY_ROLES, _acessos);
						deferred.resolve(true);
						
					}else{
						
						$log.debug('Acesso negado à transação', transacao);
						deferred.reject('Acesso negado à transação ' + transacao);
						
					}
					
				})
			}
		});
		
		function possuiAcesso(){
			return _acessos.indexOf(transacao) > -1;
		}
		
		return deferred.promise;
		
	}
	
	function acessos(){
		
		var deferred = $q.defer();
		
		//verifica primeiro na variável
		if (!_acessos){
			
			$log.debug('Verificando acessos local.');
			
			//verifica em segundo no cache
			_acessos = get(KEY_ROLES);
			//_acessos = getCookie(KEY_ROLES);
			
			if (!_acessos){
				
				$log.debug('Sem acessos local. Buscando acessos no servidor.');
				
				//solicita informação ao server
				Autorizacao.transacoesAutorizadas(function(transacoes){
					_acessos = transacoes;
					put(KEY_ROLES, _acessos);
					//putCookie(KEY_ROLES, _acessos);
					deferred.resolve(_acessos);
				});
				
			}else{
				
				deferred.resolve(_acessos);
				
			}
			
		}else{
			
			deferred.resolve(_acessos);
			
		}
		
		return deferred.promise;
	}
	
	function usuario(){
		
		var q = $q.defer();
		
		//verifica primeiro na variável
		if (!_usuario) {
			
			//verifica em segundo no cache
			_usuario = get(KEY_USER);
			
			if (!_usuario){
				
				//solicita informação ao server
				$http.get(URL_BASE + '/usuario').success(function(retorno){
					
					_usuario = retorno;
					
					put(KEY_USER, _usuario);
					
					q.resolve(_usuario);
					
				});
				
			}else{
				q.resolve(_usuario);
			}
		}else{
			q.resolve(_usuario);
		}
			
		return q.promise;
		
	}
	
	function get(key){
		return cache.get(key);
	}
	
	function put(key, value){	
		cache.put(key, value);
	}
	
	function remove(key){
		cache.remove(key);
	}
	
	function logoff(){
		$log.debug('Logoff acionado. Removendo cookies e cache da sessão.');
		//cookie.remove(KEY_ROLES);
		cache.destroy();
		location.href = URL_BASE + '/logoff?p=' + location.href;
	}
	
	function notificacoes(){
	}
	
	function alertas(){
	}
	
	function removeAlerta(alerta){
	}
	
	function adicionaAlerta(alerta){
	}
	
	function removeNotificacao(notificacao){
	}
	
	function adicionaNotificacao(notificacao){
	}
	
	return {
		usuario : usuario,
		notificacoes : notificacoes,
		alertas : alertas,
		get : get,
		put : put,
		logoff : logoff,
		remove : remove,
		verificaAcesso : verificaAcesso
	};
	
	
}]);

