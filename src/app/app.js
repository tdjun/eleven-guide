/**
 * @author    tdjun {@link http://tdjun.co.kr}
 * @copyright Copyright (c) 2016, tdjun
 * @license   GPL-3.0
 */
'use strict';

// js vendor files
import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import 'angular-ui-router';

// css vendor files

// js app files
import './core/core';
import './directives/directives';
import './components/components';
import './routes/routes';
import AppController from './app.controller';
import mainModule from './ng-decorators';


angular.element(document).ready(function() {
    mainModule.controller('AppController', AppController);
    angular.bootstrap(document, [mainModule.name], {
        strictDi: true
    });
});
