var thymeleaf = require('/lib/xp/thymeleaf'); // Import the thymeleaf render function
var contentLib = require('/lib/xp/content'); // Import the content service functions
var portal = require('/lib/xp/portal'); // Import the portal functions

// Handle the GET request
exports.get = function(req) {
    var model = {};
	var content = portal.getContent();
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
    var countries = [];
	var codeValues ={};
    var countryLink ={};
    var inhabitants ={};
    
    // Loop through the contents and extract the needed data
    for(var i = 0; i < hits.length; i++) {
        var country = {};
        country.name = hits[i].displayName;
        codeValues[hits[i].data.countryCode] = "#ffff00";
        country.contentUrl = portal.pageUrl({
            id: hits[i]._id
        });
        countryLink[hits[i].data.countryCode]= country.contentUrl;
        inhabitants[hits[i].data.countryCode]= hits[i].data.population;
        countries.push(country);
    }
    // Add data to the model
    model.countries = countries;
    model.codeValues = codeValues; // Jvectormap
    model.countryLink = countryLink; // Jvectormap
    model.inhabitants = inhabitants;
	model.regionPart1 = content.page.regions.Part1;
    model.regionPart2 = content.page.regions.Part2;

    // Specify the view file to use
    var view = resolve('hello.html');
    // Compile HTML from the view with dynamic data from the model
    var body = thymeleaf.render(view, model);
    // Return the response object
    return {
        body: body
    }
};