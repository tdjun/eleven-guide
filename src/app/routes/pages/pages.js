/**
 * @author    tdjun {@link http://tdjun.co.kr}
 * @copyright Copyright (c) 2016, tdjun
 * @license   GPL-3.0
 */
'use strict';

import homeTemplate from './home.html!text';
import licenseTemplate from './license.html!text';
import {RouteConfig} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app', {
    url: '/',
    template: homeTemplate,
})
@RouteConfig('license', {
    url: '/license',
    template: licenseTemplate,
})
//end-non-standard
class Pages {}
