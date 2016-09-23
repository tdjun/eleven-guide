/**
 * @author    tdjun {@link http://tdjun.co.kr}
 * @copyright Copyright (c) 2016, tdjun
 * @license   GPL-3.0
 */
'use strict';

import {View, Component} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'menu-link'
})
@View({
    template: `
    <md-button
        ng-class="{'active' : vm.isSelected()}"
        ng-href="{{vm.section.url}}"
        ng-click="vm.focusSection(vm.section)">
        {{vm.section.name}}
        <span class="md-visually-hidden" ng-if="vm.isSelected()">current page</span>
    </md-button>
    `,
    bindToController: {
        section: '=',
        onClick: '&'
    }
})
//end-non-standard
class menuLink {
    constructor() {}

    isSelected() {
        return this.section.select;
    }

    focusSection(section) {
        this.onClick(section);
    }
}

export default menuLink;
