var thymeleaf = require('/lib/xp/thymeleaf'); // Import the thymeleaf render function
var contentLib = require('/lib/xp/content'); // Import the content service functions
var portal = require('/lib/xp/portal'); // Import the portal functions

// Handle the GET request
exports.get = function(req) {
    var model = {};
	var content = portal.getContent();

	model.bodyRegion = content.page.regions.body;
    model.rightRegion = content.page.regions.right;

	var view = resolve('profile.html');
    var body = thymeleaf.render(view, model);
    return {
        body: body
    };
};

