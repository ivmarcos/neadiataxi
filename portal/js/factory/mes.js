portalApp.factory('Mes', function() {
		
	var meses = [];
	
	var Mes = {
		JANEIRO : {
			nome : 'Janeiro',
			numero : 1,
		},
		FEVEREIRO : {
			nome : 'Fevereiro',
			numero : 2,
		},
		MARCO : {
			nome : 'Março',
			numero : 3,
		},
		ABRIL : {
			nome : 'Abril',
			numero : 4,
		},
		MAIO : {
			nome : 'Maio',
			numero : 5,
		},
		JUNHO : {
			nome : 'Junho',
			numero : 6,
		},
		JULHO : {
			nome : 'Julho',
			numero : 7,
		},
		AGOSTO : {
			nome : 'Agosto',
			numero : 8,
		},
		SETEMBRO : {
			nome : 'Setembro',
			numero : 9,
		},
		OUTUBRO : {
			nome : 'Outubro',
			numero : 10,
		},
		NOVEMBRO : {
			nome : 'Novembro',
			numero : 11,
		},
		DEZEMBRO : {
			nome : 'Dezembro',
			numero : 12,
		},
	}
	
	function getByNumero(numero){
		for (var p in Mes){
			if (Mes[p].numero == numero) return Mes[p];
		}
	}
	
	function todos(){
		if (!meses.length){
			for (var p in Mes){
				meses.push(Mes[p]);
			}
		}
		return meses;
	}
	
	function atual(){
		var date = new Date();
		var numero = date.getMonth();
		return getByNumero(numero);
	}
	
	return {
		getByNumero : getByNumero,
		todos : todos,
		atual : atual,
	}
		
	   
});

