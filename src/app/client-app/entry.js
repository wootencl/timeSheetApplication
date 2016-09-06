// var req = require.context("../client-app", true, /^(.*\.(js$))[^.]*$/igm);
// req.keys().forEach(function(key){
//     req(key);
// });

import 'script!jquery';
import 'script!foundation-sites';
import { app } from '../client-app/app.js';

var models = require.context("../client-app/models", true, /^(.*\.(js$))[^.]*$/igm);
models.keys().forEach(function(key){
    models(key);
});

var collections = require.context("../client-app/collections", true, /^(.*\.(js$))[^.]*$/igm);
collections.keys().forEach(function(key){
    collections(key);
});

var views = require.context("../client-app/views", true, /^(.*\.(js$))[^.]*$/igm);
views.keys().forEach(function(key){
    views(key);
});

window.onload = function() {
	app.init();
}

