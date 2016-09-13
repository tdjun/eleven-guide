/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Config, Inject} from '../../ng-decorators'; // jshint unused: false

class OnConfigDev {
    //start-non-standard
    @Config()
    //end-non-standard
    static configFactory(){

    }
}
