/**
 * @author    tdjun {@link http://tdjun.co.kr}
 * @copyright Copyright (c) 2016, tdjun
 * @license   GPL-3.0
 */
'use strict';

// js vendor files
import angular from 'angular';

import 'angular-animate';
import 'angular-sanitize';
import 'angular-messages';

import 'angular-aria';
import 'angular-material';

// css vendor files

// js app files
import mainModule from './ng-decorators';


angular.element(document).ready(function() {
   angular.bootstrap(document, [mainModule.name], {
     strictDi: true
   });
});
