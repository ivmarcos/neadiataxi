var LINK_BOOTSTRAP_CSS = '../bower_components/bootstrap-material-design/dist/css/bootstrap-material-design.min.css';

var THEME = {
	DEFAULT 			: 1,
	MATERIAL_DEFAULT 	: 2,
	MATERIAL_BLUE		: 3,
}

var app = {


    changeCSS : function(theme){

    	this._toggled = !this._toggled;

    	var link = document.getElementById('boostrapCSS');

    	link.href = this._toggled ? LINK_BOOTSTRAP_CSS : '';

    	console.log(this._toggled);
    }

}
