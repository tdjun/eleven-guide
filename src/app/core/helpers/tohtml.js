'use strict';

import {Filter, Inject} from '../../ng-decorators'; // jshint unused: false

class toHtml {
    //start-non-standard
    @Filter({
        filterName: 'toHtml'
    })
    @Inject('$sce')
    //end-non-standard
    static toHtmlFilter($sce) {
        return function(str) {
            return $sce.trustAsHtml(str);
        };
    }
}
