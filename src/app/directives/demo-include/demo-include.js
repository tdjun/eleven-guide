
'use strict';

import {Directive, Inject} from '../../ng-decorators'; // jshint unused: false

const $TIMEOUT = new WeakMap();
const $Q = new WeakMap();
const $COMPILE = new WeakMap();

//start-non-standard
@Directive({
    selector: 'demoInclude'
})
//end-non-standard
class demoInclude {
    constructor($timeout, $q, $compile) {
        this.restrict = 'E';
        $TIMEOUT.set(this, $timeout);
        $Q.set(this, $q);
        $COMPILE.set(this, $compile);
    }

    link(scope, element, attr) {
        let $timeout = $TIMEOUT.get(demoInclude.instance);
        let $q       = $Q.get(demoInclude.instance);
        let $compile = $COMPILE.get(demoInclude.instance);

        let demoContainer;

        // Interpret the expression given as `demo-include files="something"`
        let files = scope.$eval(attr.files) || {};
        let ngModule = scope.$eval(attr.module) || '';

        $timeout(handleDemoIndexFile);

        /**
         * Fetch the index file, and if it contains its own ngModule
         * then bootstrap a new angular app with that ngModule. Otherwise, compile
         * the demo into the current ng-app.
         */
        function handleDemoIndexFile() {
            files.index.contentsPromise.then(function (contents) {
                demoContainer = angular.element(`<div class="demo-content '${ngModule}'">`);

                var isStandalone = !!ngModule;
                var demoScope;
                var demoCompileService;
                if (isStandalone) {
                    angular.bootstrap(demoContainer[0], [ngModule]);
                    demoScope = demoContainer.scope();
                    demoCompileService = demoContainer.injector().get('$compile');
                    scope.$on('$destroy', function () {
                        demoScope.$destroy();
                    });

                } else {
                    demoScope = scope.$new();
                    demoCompileService = $compile;
                }

                // Once everything is loaded, put the demo into the DOM
                $q.all([
                    handleDemoStyles(),
                    handleDemoTemplates()
                ]).finally(function () {
                    demoScope.$evalAsync(function () {
                        element.append(demoContainer);
                        demoContainer.html(contents);
                        demoCompileService(demoContainer.contents())(demoScope);
                    });
                });
            });
        }

        /**
         * Fetch the demo styles, and append them to the DOM.
         */
        function handleDemoStyles() {
            return $q.all(files.css.map(function(file) {
                return file.contentsPromise;
            }))
                .then(function(styles) {
                    styles = styles.join('\n'); //join styles as one string

                    var styleElement = angular.element('<style>' + styles + '</style>');
                    document.body.appendChild(styleElement[0]);

                    scope.$on('$destroy', function() {
                        styleElement.remove();
                    });
                });

        }

        /**
         * Fetch the templates for this demo, and put the templates into
         * the demo app's templateCache, with a url that allows the demo apps
         * to reference their templates local to the demo index file.
         *
         * For example, make it so the dialog demo can reference templateUrl
         * 'my-dialog.tmpl.html' instead of having to reference the url
         * 'generated/material.components.dialog/demo/demo1/my-dialog.tmpl.html'.
         */
        function handleDemoTemplates() {
            return $q.all(files.html.map(function(file) {

                return file.contentsPromise.then(function(contents) {
                    // Get the $templateCache instance that goes with the demo's specific ng-app.
                    var demoTemplateCache = demoContainer.injector().get('$templateCache');
                    demoTemplateCache.put(file.name, contents);

                    scope.$on('$destroy', function() {
                        demoTemplateCache.remove(file.name);
                    });

                });

            }));
        }

    }

    //start-non-standard
    @Inject('$timeout', '$q', '$compile')
    //end-non-standard
    static directiveFactory($timeout, $q, $compile) {
        demoInclude.instance = new demoInclude($timeout, $q, $compile);
        return demoInclude.instance;
    }
}

export default demoInclude;
