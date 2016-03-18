engitnaApp.factory('Restricao', function() {
		
	var Restricoes = [
	{
		nome : 'Nenhuma',
		sigla : null
	},
	{
		nome : 'Restrita Grupo 1',
		sigla : 'ENGITNAARQRST1'
	},
	{
		nome : 'Gestor',
		sigla : 'ENGITNAARQADMIN'
	}
	]
	
	return {
		todas : function(){
			return Restricoes;
		}
	}

});

