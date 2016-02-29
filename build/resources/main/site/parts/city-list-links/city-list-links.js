var contentLib = require('/lib/xp/content'); // Import the content library functions
var portal = require('/lib/xp/portal'); // Import the portal functions
var thymeleaf = require('/lib/xp/thymeleaf'); // Import the Thymeleaf rendering function

// Handle the GET request
exports.get = function (req) {

    var model = {};
    var nearestSite = portal.getSite(); //site address: baraye moshkhase kardane addresse gereftane query to DB

    // Get all the country contents (in the current site)
    var countryResult = contentLib.query({
        start: 0,
        count: 100,
        contentTypes: [
            app.name + ':country'
        ],
        "query": "_path LIKE '/content" + nearestSite._path + "/*'"
    });
	
	
	var cities = [];
	var countryHits = countryResult.hits;

	for(var i = 0; i < countryHits.length; i++) {
		var countryPath = countryHits[i]._path;

	    var cityResult = contentLib.query({
			start: 0,
			count: 100,
			contentTypes: [
				app.name + ':city'
			],
			"query": "_path LIKE '/content" + countryPath + "/*'",
		});
		var cityHits = cityResult.hits;
		
		for(var j = 0; j< cityHits.length;j++){
			var city = {};
			city.name = cityHits[j].displayName;
			city.country = countryHits[i].displayName;
			city.contentUrl = portal.pageUrl({
				id: countryHits[i]._id
			});
			cities.push(city);
		}
    }

	model.cities = cities;

    // Specify the view file to use
    var view = resolve('city-list-links.html');

    // Compile HTML from the view with dynamic data from the model
    var body = thymeleaf.render(view, model);

    // Return the response object
    return {
        body: body
    }
};