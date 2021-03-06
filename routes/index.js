var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
    views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
    // Views
    app.get('/', routes.views.home);
    
    routes.views.test(app);

    app.get('/createAd', middleware.requireUser);
    app.get('/createAd', routes.views.createAd);

    app.get('/pointQrcode', routes.views.pointQrcode);
};
