var contentLib = require('/lib/xp/content'); // Import the content library functions
var portal = require('/lib/xp/portal'); // Import the portal functions
var thymeleaf = require('/lib/xp/thymeleaf'); // Import the Thymeleaf rendering function

exports.get = function(req) {

    var nearestSite = portal.getSite();

    // Get all the country contents (in the current site)
    var result = contentLib.query({
        start: 0,
        count: 100,
        contentTypes: [
            app.name + ':country'
        ],
        "query": "_path LIKE '/content" + nearestSite._path + "/*'"
    });
    var hits = result.hits;
    var num = 0;
	var numOfCountriesWithDefinedPopulation = 0;
	  // Loop through the contents and extract the needed data
    for(var i = 0; i < hits.length; i++) {
		if(typeof(hits[i].data.population) !== "undefined"){
            num += parseInt(hits[i].data.population.replace(/\D/g,''));
            numOfCountriesWithDefinedPopulation++;
		}
    }
	var model = {
        totalPopulation: num.toString(),
		totalCountries: numOfCountriesWithDefinedPopulation
    };
    // Specify the view file to use
    var view = resolve('population.html');

    // Compile HTML from the view with dynamic data from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    }
};