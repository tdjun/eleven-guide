
'use strict';

import {Directive} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Directive({
    selector: 'hljs'
})
//end-non-standard
class hljs {
    constructor() {
        this.restrict = 'E';
    }

    compile(element, attrs) {
        console.log(1111);
        console.log(element, attrs);
    }

    static directiveFactory() {
        hljs.instance = new hljs();
        return hljs.instance;
    }
}

export default hljs;
