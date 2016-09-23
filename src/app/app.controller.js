'use strict';

import {Inject} from './ng-decorators'; // jshint unused: false
//start-non-standard
@Inject('$timeout', '$mdSidenav')
//end-non-standard
class AppController {
    constructor($timeout, $mdSidenav) {
        this.$timeout = $timeout;
        this.$mdSidenav = $mdSidenav;

        var introLink = { name:'Introduction', url:'/', type:'link' };
        this.currentPage = introLink;

        // Grab the current year so we don't have to update the license every year
        this.thisYear = (new Date()).getFullYear();

        // this.currentPage;
        // this.currentSection;
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
    selectPage(section, page) {
        this.currentPage = page;
        this.currentSection = section;

        this.closeMenu();
    }
}

export default AppController;
