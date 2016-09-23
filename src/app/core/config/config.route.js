/**
 * @author    tdjun {@link http://tdjun.co.kr}
 * @copyright Copyright (c) 2016, tdjun
 * @license   GPL-3.0
 */
'use strict';

import {Config, Run, Inject} from '../../ng-decorators'; // jshint unused: false


class OnConfig {
    //start-non-standard
    @Config()
    @Inject('$urlRouterProvider')
    //end-non-standard
    static configFactory($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
}

class OnRun {
    //start-non-standard
    @Run()
    @Inject('$rootScope', '$log')
    //end-non-standard
    static runFactory($rootScope, $log) {
        console.log('runFactory', $rootScope);
        $rootScope.$on('$stateChangeStart', (event, toState) => {
            console.log('$stateChangeStart');
            if (toState.resolve) {
                $rootScope.isLoading = true;
            }
        });

        $rootScope.$on('$stateChangeSuccess', (event, toState) => {
            console.log('$stateChangeSuccess');
            if (toState.resolve) {
                $rootScope.isLoading = false;
            }
        });

        $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
            console.log('$stateChangeError');
            if (toState.resolve) {
                $rootScope.isLoading = false;
            }
            event.preventDefault();
        });

    }
}

export {OnConfig, OnRun};
