
'use strict';

import './introduction/introduction';
import {RouteConfig} from '../../ng-decorators';  // jshint unused: false

//container
//children
//alignment
//options
//tips

//start-non-standard
@RouteConfig('layout', {
    url: '/layout',
    abstract: true,
    template: `<div ui-view></div>`,
})
//end-non-standard

class LayoutLayout {}
