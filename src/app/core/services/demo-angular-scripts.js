'use strict';

import {BUILDCONFIG} from '../constants/constants';
import {Service} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'demoAngularScripts'
})
//end-non-standard
class demoAngularScripts {
    constructor() {
        this.scripts = [
            'angular.js',
            'angular-animate.min.js',
            'angular-route.min.js',
            'angular-aria.min.js',
            'angular-messages.min.js'
        ];
    }

    all() {
        return this.scripts.map(fullPathToScript);
    }
}

function fullPathToScript(script) {
    return `https://ajax.googleapis.com/ajax/libs/angularjs/${BUILDCONFIG.ngVersion}/${script}`;
}

export default demoAngularScripts;
