portalApp.filter('usiMoment', function () {

    return function (input) {
    	return moment().from(input);
    };
});