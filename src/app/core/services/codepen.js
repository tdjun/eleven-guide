
'use strict';

import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

// Provides a service to open a code example in codepen.

//start-non-standard
@Service({
    serviceName: 'codepen'
})
@Inject('demoAngularScripts', '$document', 'codepenDataAdapter')
//end-non-standard
class codepen {
    constructor(demoAngularScripts, $document, codepenDataAdapter) {
        this.demoAngularScripts = demoAngularScripts;
        this.$document = $document;
        this.codepenDataAdapter = codepenDataAdapter;
    }

    editOnCodepen(demo) {
        var data = this.codepenDataAdapter.translate(demo, this.demoAngularScripts.all());
        var form = buildForm(data);
        this.$document.find('body').append(form);
        form[0].submit();
        form.remove();
    }
}


// The following URL must be HTTP and not HTTPS to allow us to do localhost testing
var CODEPEN_API = 'http://codepen.io/pen/define/';

// Builds a hidden form with data necessary to create a codepen.
function buildForm(data) {
    var form = angular.element(
        `<form style="display: none;" method="post" target="_blank" action=${CODEPEN_API}></form>`
    );
    var input = `<input type="hidden" name="data" value=${escapeJsonQuotes(data)}/>`;
    form.append(input);
    return form;
}

// Recommended by Codepen to escape quotes.
// See http://blog.codepen.io/documentation/api/prefill
function escapeJsonQuotes(json) {
    return JSON.stringify(json)
        .replace(/'/g, '&amp;apos;')
        .replace(/"/g, '&amp;quot;')
        /**
         * Codepen was unescaping &lt; (<) and &gt; (>) which caused, on some demos,
         * an unclosed elements (like <md-select>).
         * Used different unicode lookalike characters so it won't be considered as an element
         */
        .replace(/&amp;lt;/g, '&#x02C2;') // http://graphemica.com/%CB%82
        .replace(/&amp;gt;/g, '&#x02C3;'); // http://graphemica.com/%CB%83
}

export default codepen;
