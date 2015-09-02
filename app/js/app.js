//Author: Carter Wooten
//Tutorials that helped me along the way:
// - Templates: http://www.codebelt.com/javascript/precompiling-javascript-underscore-templates/

var timeSheetApp = timeSheetApp || {};

(function () {
    'use strict';

    //Helper Function for templates
    function createTemplate(templatePath, data) {
        var templateString = window['JST'][templatePath](data);
        return templateString;
    }


})();

