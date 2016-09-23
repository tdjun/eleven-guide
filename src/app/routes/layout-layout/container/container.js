
'use strict';

import template from './container.html!text';
import {RouteConfig, Component, View} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('layout.container', {
    url: '/container',
    template: '<container></container>',
})
@Component({
    selector: 'container'
})
@View({
    template: template
})
//end-non-standard
class Container {}
