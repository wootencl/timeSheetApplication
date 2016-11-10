// import 'babel-polyfill';
import 'script!jquery';
import 'script!lodash';
// import 'script!what-input';
import Backbone from 'backbone';
import 'backbone-validation';
import 'script!jquery.cookie';
import 'script!moment';
import 'script!fastclick';
import 'script!clndr';
import 'script!timepicker';
import 'script!foundation-sites/js/foundation';

import { app } from './app';

$(document).ready(function () {
	app.init();

  //Initialize Foundation
  $(document).foundation();
});