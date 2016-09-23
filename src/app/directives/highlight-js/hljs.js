
'use strict';

import {Directive, Inject} from '../../ng-decorators'; // jshint unused: false

const $TIMEOUT = new WeakMap();
const $Q = new WeakMap();
const $INTERPOLATE = new WeakMap();

//start-non-standard
@Directive({
    selector: 'hljs'
})
//end-non-standard
class hljsDirective {
    constructor($timeout, $q, $interpolate) {
        this.restrict = 'E';
        $TIMEOUT.set(this, $timeout);
        $Q.set(this, $q);
        $INTERPOLATE.set(this, $interpolate);
    }

    compile(element, attr) {
        let $timeout = $TIMEOUT.get(hljsDirective.instance);
        let $q = $Q.get(hljsDirective.instance);
        let $interpolate = $INTERPOLATE.get(hljsDirective.instance);

        var code;
        //No attribute? code is the content
        if (!attr.code) {
            code = element.html();
            element.empty();
        }

        return function(scope, element, attr) {

            if (attr.code) {
                // Attribute? code is the evaluation
                code = scope.$eval(attr.code);
            }
            var shouldInterpolate = scope.$eval(attr.shouldInterpolate);

            $q.when(code).then(function(code) {
                if (code) {
                    if (shouldInterpolate) {
                        code = $interpolate(code)(scope);
                    }
                    var contentParent = angular.element(
                        '<pre><code class="highlight" ng-non-bindable></code></pre>'
                    );
                    element.append(contentParent);
                    // Defer highlighting 1-frame to prevent GA interference...
                    $timeout(function() {
                        render(code, contentParent);
                    }, 34, false);
                }
            });

            function render(contents, parent) {
                var codeElement = parent.find('code');

                // Strip excessive newlines and the leading/trailing newline (otherwise the whitespace
                // calculations below are not correct).
                var strippedContents = contents.replace(/\n{2,}/g, '\n\n').replace(/^\n/, '').replace(/\n$/, '');
                var lines = strippedContents.split('\n');

                // Make it so each line starts at 0 whitespace
                var firstLineWhitespace = lines[0].match(/^\s*/)[0];
                var startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
                lines = lines.map(function(line) {
                    return line
                        .replace(startingWhitespaceRegex, '')
                        .replace(/\s+$/, '');
                });

                var highlightedCode = hljs.highlight(attr.language || attr.lang, lines.join('\n'), true);  // jshint ignore:line
                highlightedCode.value = highlightedCode.value
                    .replace(/=<span class="hljs-value">""<\/span>/gi, '')
                    .replace('<head>', '')
                    .replace('<head/>', '');
                codeElement.append(highlightedCode.value).addClass('highlight');
            }
        };

    }

    //start-non-standard
    @Inject('$timeout', '$q', '$interpolate')
    //end-non-standard
    static directiveFactory($timeout, $q, $interpolate) {
        hljsDirective.instance = new hljsDirective($timeout, $q, $interpolate);
        return hljsDirective.instance;
    }
}

export default hljsDirective;
