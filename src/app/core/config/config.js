/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './config.#{ENV|environment}.js';
import {Config, Run, Inject} from '../../ng-decorators'; // jshint unused: false

class OnConfig {
    //start-non-standard
    @Config()
    @Inject('$provide', '$httpProvider', '$locationProvider','$mdThemingProvider','$mdIconProvider')
    //end-non-standard
    static configFactory($provide, $httpProvider, $locationProvider, $mdThemingProvider, $mdIconProvider){

        /*********************************************************************
         * Route provider configuration based on these config constant values
         *********************************************************************/
        // set restful base API route
        $httpProvider.interceptors.push('HttpApiUrlInterceptor');
        // set retry http request if request failed
        $httpProvider.interceptors.push('HttpRetryInterceptor');

        $locationProvider.html5Mode(true);

        $mdThemingProvider.definePalette('docs-blue', $mdThemingProvider.extendPalette('blue', {
            '50': '#DCEFFF',
            '100': '#AAD1F9',
            '200': '#7BB8F5',
            '300': '#4C9EF1',
            '400': '#1C85ED',
            '500': '#106CC8',
            '600': '#0159A2',
            '700': '#025EE9',
            '800': '#014AB6',
            '900': '#013583',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 A100',
            'contrastStrongLightColors': '300 400 A200 A400'
        }));

        $mdThemingProvider.definePalette('docs-red', $mdThemingProvider.extendPalette('red', {
            'A100': '#DE3641'
        }));

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

        $mdIconProvider.icon('md-toggle-arrow', 'src/images/icons/toggle-arrow.svg', 48);

        $mdThemingProvider.theme('default')
            .primaryPalette('docs-blue')
            .accentPalette('docs-red');

        $mdThemingProvider
            .enableBrowserColor();

    }
}

export {OnConfig};
