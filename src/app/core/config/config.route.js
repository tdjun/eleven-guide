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
    static configFactory($urlRouterProvider, $mdSidenav) {
        $urlRouterProvider.otherwise('/');
    }
}

class OnRun {
    //start-non-standard
    @Run()
    @Inject('$rootScope', '$log')
    //end-non-standard
    static runFactory($rootScope, $log) {
        $rootScope.$on('$stateChangeStart', (event, toState) => {
            if (toState.resolve) {
                $rootScope.isLoading = true;
            }
            console.log('$stateChangeStart', $rootScope.isLoading);
        });

        $rootScope.$on('$stateChangeSuccess', (event, toState) => {
            if (toState.resolve) {
                $rootScope.isLoading = false;
            }
            console.log('$stateChangeSuccess', $rootScope.isLoading);
        });

        $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
            if (toState.resolve) {
                $rootScope.isLoading = false;
            }
            console.log('$stateChangeError', $rootScope.isLoading);
            event.preventDefault();
        });

    }
}

export {OnConfig, OnRun};
