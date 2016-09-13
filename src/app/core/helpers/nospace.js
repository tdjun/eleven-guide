'use strict';

import {Filter} from '../../ng-decorators'; // jshint unused: false

class StatusLabel {
    //start-non-standard
    @Filter({
        filterName: 'nospace'
    })
    //end-non-standard
    static nospaceFilter() {
        return function (value) {
            return (!value) ? '' : value.replace(/ /g, '');
        };
    }
}
