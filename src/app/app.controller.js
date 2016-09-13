'use strict';

import {Inject} from './ng-decorators'; // jshint unused: false

@Inject('$timeout', '$mdSidenav')
class MainController {
    constructor($timeout, $mdSidenav) {
        this.$timeout = $timeout;
        this.$mdSidenav = $mdSidenav;
    }

    closeMenu() {
        this.$timeout(() => {
            this.$mdSidenav('left').close();
        });
    }
    openMenu() {
        this.$timeout(() => {
            this.$mdSidenav('left').open();
        });
    }
}

export default MainController;
