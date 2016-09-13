/**
 * @author    tdjun {@link http://tdjun.co.kr}
 * @copyright Copyright (c) 2016, tdjun
 * @license   GPL-3.0
 */
'use strict';

import {SECTIONS} from '../../core/constants/constants';
import {View, Component} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'menu-section'
})
@View({
    template: `
    <ul class="docs-menu">
        <li ng-repeat="section in vm.sections" 
            class="parent-list-item {{section.className || ''}}" 
            ng-class="{'parentActive' : vm.isSectionSelected(section)}" >
            <h2 id="heading_{{ section.name | nospace }}" class="menu-heading md-subhead"
                ng-if="section.type === 'heading'">
                {{section.name}}
            </h2>
            <menu-link section="section" on-click="vm.selectPage(null, section)" 
                ng-if="section.type === 'link' && !section.hidden"></menu-link>
            <ul ng-if="section.children" class="menu-nested-list">
                <li ng-repeat="child in section.children" ng-class="{'childActive' : isSectionSelected(child)}">
                    <menu-link section="child" 
                        on-click="vm.selectPage(child, section)"  
                        ng-if="child.type === 'link'"></menu-link>
                    <menu-toggle section="child" 
                        on-toggle-open="vm.toggleSelectSection(toggleSection)"
                        on-click-sub="vm.selectPage(section, page)" 
                        ng-if="child.type === 'toggle'"></menu-toggle>
                </li>
            </ul>
        </li>
    </ul>
    `
})
//end-non-standard
class menuSection {
    constructor() {
        this.sections = SECTIONS;
        // this.currentPage;
        // this.currentSection;
        // this.openedSection;
    }

    selectSection(section) {
        this.openedSection = section;
    }

    toggleSelectSection(section) {
        if (this.openedSection){
            delete this.openedSection.open;
        }
        this.openedSection = (this.openedSection === section ? null : section);
        if (this.openedSection){
            this.openedSection.open = true;
        }
    }

    isSectionSelected(section) {
        return this.openedSection === section;
    }

    selectPage(section, page) {
        if (this.currentPage){
            delete this.currentPage.select;
        }
        page.select = true;
        this.currentPage = page;
        this.currentSection = section;
    }

    isPageSelected(page) {
        return this.currentPage === page;
    }
}

export default menuSection;
