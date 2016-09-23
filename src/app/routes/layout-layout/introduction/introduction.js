
'use strict';

import template from './introduction.html!text';
import {RouteConfig, Component, View} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('layout.introduction', {
    url: '/introduction',
    template: '<introduction></introduction>',
})
@Component({
    selector: 'introduction'
})
@View({
    template: template
})
//end-non-standard
class Introduction {}
