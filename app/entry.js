
require('foundation-sites/dist/foundation.min.js');
require('client-app/app.js');

var models = require.context('client-app/models', true,  /\.js$/);
models.keys().forEach(models);

var views = require.context('client-app/views', true,  /\.js$/);
views.keys().forEach(views);

var collections = require.context('client-app/collections', true,  /\.js$/);
collections.keys().forEach(collections);