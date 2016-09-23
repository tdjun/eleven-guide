
'use strict';

import {Directive, Inject} from '../../ng-decorators'; // jshint unused: false

const $TIMEOUT = new WeakMap();
const $Q = new WeakMap();
const $INTERPOLATE = new WeakMap();

//start-non-standard
@Directive({
    selector: 'demoFile'
})
//end-non-standard
class demoFile {
    constructor($q, $interpolate) {
        this.restrict = 'E';
        this.require = '^docsDemo';
        $Q.set(this, $q);
        $INTERPOLATE.set(this, $interpolate);
    }

    compile(element, attr) {
        let $q = $Q.get(demoFile.instance);
        let $interpolate = $INTERPOLATE.get(demoFile.instance);

        let contentsAttr = attr.contents;
        let html = element.html();
        let name = attr.name;
        element.contents().remove();

        return function postLink(scope, element, attr, docsDemoCtrl) { // jshint unused: false
            docsDemoCtrl.addFile(
                $interpolate(name)(scope),
                $q.when(scope.$eval(contentsAttr) || html)
            );
            element.remove();
        };
    }

    //start-non-standard
    @Inject('$q', '$interpolate')
    //end-non-standard
    static directiveFactory($q, $interpolate) {
        demoFile.instance = new demoFile($q, $interpolate);
        return demoFile.instance;
    }
}

export default demoFile;
