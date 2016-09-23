'use strict';

import {Service} from '../../ng-decorators'; // jshint unused: false

// Translates demo metadata and files into Codepen's post form data.  See api documentation for
// additional fields not used by this service. http://blog.codepen.io/documentation/api/prefill


// The following URL's need to use `localhost` as these values get replaced during release
var CORE_JS  = 'http://localhost:8080/angular-material.js';
var CORE_CSS = 'http://localhost:8080/angular-material.css';
var DOC_CSS  = 'http://localhost:8080/docs.css';              // CSS overrides for custom docs

var LINK_FONTS_ROBOTO = '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">';

var UNSECURE_CACHE_JS = 'http://ngmaterial.assets.s3.amazonaws.com/svg-assets-cache.js';
var ASSET_CACHE_JS = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-114/svg-assets-cache.js';

//start-non-standard
@Service({
    serviceName: 'codepenDataAdapter'
})
//end-non-standard

class codepenDataAdapter {
    constructor() {}

    // Translates a demo model to match Codepen's post data
    // See http://blog.codepen.io/documentation/api/prefill
    translate(demo, externalScripts) {
        var files = demo.files;

        return appendLicenses({
            title: demo.title,
            html: processHtml(demo),
            head: LINK_FONTS_ROBOTO,

            js: processJs(files.js),
            css: mergeFiles( files.css ).join(' '),

            js_external: externalScripts.concat([ASSET_CACHE_JS, CORE_JS]).join(';'), // jshint ignore:line
            css_external: [CORE_CSS, DOC_CSS].join(';') // jshint ignore:line
        });
    }

}

export default codepenDataAdapter;

// Modifies index.html with necessary changes in order to display correctly in codepen
// See each processor to determine how each modifies the html
function processHtml(demo) {

    var allContent = demo.files.index.contents;

    var processors = [
        applyAngularAttributesToParentElement,
        insertTemplatesAsScriptTags,
        htmlEscapeAmpersand
    ];

    processors.forEach(function(processor) {
        allContent = processor(allContent, demo);
    });

    return allContent;
}

/**
 * Append MIT License information to all CodePen source samples(HTML, JS, CSS)
 */
function appendLicenses(data) {

    data.html = appendLicenseFor(data.html, 'html');
    data.js   = appendLicenseFor(data.js, 'js');
    data.css  = appendLicenseFor(data.css, 'css');

    function appendLicenseFor(content, lang) {
        var commentStart = '', commentEnd = '';

        switch(lang) {
            case 'html' : commentStart = '<!--'; commentEnd = '-->'; break;
            case 'js'   : commentStart = '/**';  commentEnd = '**/'; break;
            case 'css'  : commentStart = '/*';   commentEnd = '*/';  break;
        }

        return content + '\n\n'+
            commentStart + '\n'+
            'Copyright 2016 Google Inc. All Rights Reserved. \n'+
            'Use of this source code is governed by an MIT-style license that can be found'+
            'in the LICENSE file at http://material.angularjs.org/HEAD/license.\n'+
            commentEnd;
    }

    return data;
}

// Applies modifications the javascript prior to sending to codepen.
// Currently merges js files and replaces the module with the Codepen
// module.  See documentation for replaceDemoModuleWithCodepenModule.
function processJs(jsFiles) {
    var mergedJs = mergeFiles(jsFiles).join(' ');
    var script = replaceDemoModuleWithCodepenModule(mergedJs);
    return script;
}

// Maps file contents to an array
function mergeFiles(files) {
    return files.map(function(file) {
        return file.contents;
    });
}

// Adds class to parent element so that styles are applied correctly
// Adds ng-app attribute.  This is the same module name provided in the asset-cache.js
function applyAngularAttributesToParentElement(html, demo) {
    var tmp;

    // Grab only the DIV for the demo...
    angular.forEach(angular.element(html), function(it,key){
        if ((it.nodeName !== 'SCRIPT') && (it.nodeName !== '#text')) {
            tmp = angular.element(it);
        }
    });

    tmp.addClass(demo.id);
    tmp.attr('ng-app', 'MyApp');
    return tmp[0].outerHTML;
}

// Adds templates inline in the html, so that templates are cached in the example
function insertTemplatesAsScriptTags(indexHtml, demo) {
    if (demo.files.html.length) {
        var tmp = angular.element(indexHtml);
        angular.forEach(demo.files.html, function(template) {
            tmp.append(`<script type='text/ng-template' id='${template.name}'>${template.contents}</script>`);
        });
        return tmp[0].outerHTML;
    }
    return indexHtml;
}

// Escapes ampersands so that after codepen unescapes the html the escaped code block
// uses the correct escaped characters
function htmlEscapeAmpersand(html) {
    return html
        .replace(/&/g, '&amp;');
}

// Required to make codePen work. Demos define their own module when running on the
// docs site.  In order to ensure the codepen example can use the svg-asset-cache.js, the
// module needs to match so that the $templateCache is populated with the necessary
// assets.
function replaceDemoModuleWithCodepenModule(file) {
    var matchAngularModule =  /\.module\(('[^']*'|"[^"]*")\s*,(\s*\[([^\]]*)\]\s*\))/ig;
    var modules = `['ngMaterial', 'ngMessages', 'material.svgAssetsCache']`;

    // See scripts.js for list of external Angular libraries used for the demos

    return file.replace(matchAngularModule, `.module('MyApp',${modules})`);
}
