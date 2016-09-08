import 'babel-polyfill';
import { app } from './app';

window.onload = function() {
    app.init();
}