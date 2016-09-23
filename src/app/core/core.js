/**
 * @author    tdjun {@link http://tdjun.co.kr}
 * @copyright Copyright (c) 2016, tdjun
 * @license   GPL-3.0
 */
'use strict';

// config
import './config/config';
import './config/config.route';

// helpers
import './helpers/nospace';
import './helpers/tohtml';

// interceptors
import './interceptors/http-api-url';
import './interceptors/http-retry';

// models


// resources

// http://snippetrepo.com/snippets/angularjs-http-rest-service-abstraction
// https://medium.com/@tomastrajan/model-pattern-for-angular-js-67494389d6f
// http://blog.jonparrott.com/angular-writing-list-controllers-the-easy-way/ TODO: move away from restangular and instead of create resources with $http (loading lodash is overkill for this project)
// also add code to abstract resource where I initilize version of endpoint as I can have different version for each endpoint e.g. microservices styles. The default should be v1 and extends class should have option overwrite version number e.g. v2

// services
import './services/codepen';
import './services/codepen-data-adapter';
import './services/demo-angular-scripts';
