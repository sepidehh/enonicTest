var portal = require('/lib/xp/portal'); // Import the portal functions
var thymeleaf = require('/lib/xp/thymeleaf'); // Import the Thymeleaf rendering function

// Handle the GET request
exports.get = function(req) {
    // Specify the view file to use
    var view = resolve('top.html');

    // Return the merged view and model in the response object
    return {
        body: thymeleaf.render(view, {})
    }
};