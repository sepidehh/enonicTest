var thymeleaf = require('/lib/xp/thymeleaf'); // Import the thymeleaf render function
var contentLib = require('/lib/xp/content'); // Import the content service functions
var portal = require('/lib/xp/portal'); // Import the portal functions

// Handle the GET request
exports.get = function(req) {
    var model = {};

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

	//call all the cities
	var cityResult = contentLib.query({
        start: 0,
        count: 100,
        contentTypes: [
            app.name + ':city'
        ],
        "query": "_path LIKE '/content" +  nearestSite._path + "/*'"
    });

	model.cityNumber = cityResult.hits.length;
	model.countryNumber = result.hits.length;

    // Specify the view file to use
    var view = resolve('counter.html');

    // Compile HTML from the view with dynamic data from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    }
};