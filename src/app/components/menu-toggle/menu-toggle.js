/**
 * @author    tdjun {@link http://tdjun.co.kr}
 * @copyright Copyright (c) 2016, tdjun
 * @license   GPL-3.0
 */
'use strict';

import template from './menu-toggle.html!text';
import {Inject, View, Component} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'menu-toggle'
})
@View({
    template: template,
    bindToController: {
        section: '=',
        onClickSub: '&',
        onToggleOpen: '&'
    }
})
@Inject('$scope', '$element', '$timeout', '$mdUtil')
//end-non-standard
class menuToggle {
    constructor($scope, $element, $timeout, $mdUtil) {
        let _section = this.section;

        $mdUtil.nextTick(function() {
            $scope.$watch(
                function() { return $scope.vm.section.open; },
                function(open){
                    // We must run this in a next tick so that the getTargetHeight function is correct
                    $mdUtil.nextTick(function() {
                        let $ul = $element.find('ul');
                        let $li = $ul[0].querySelector('a.active');
                        let docsMenuContent = document.querySelector('.docs-menu').parentNode;
                        let targetHeight = open ? getTargetHeight() : 0;

                        $timeout(function () {
                            // Set the height of the list
                            $ul.css({height: targetHeight + 'px'});

                            // If we are open and the user has not scrolled the content div; scroll the active
                            // list item into view.
                            if (open && $li && $li.offsetParent && $ul[0].scrollTop === 0) {
                                $timeout(function() {
                                    var activeHeight = $li.scrollHeight;
                                    var activeOffset = $li.offsetTop;
                                    var parentOffset = $li.offsetParent.offsetTop;

                                    // Reduce it a bit (2 list items' height worth) so it doesn't touch the nav
                                    var negativeOffset = activeHeight * 2;
                                    var newScrollTop = activeOffset + parentOffset - negativeOffset;

                                    $mdUtil.animateScrollTo(docsMenuContent, newScrollTop);
                                }, 350, false);
                            }
                        }, 0, false);

                        function getTargetHeight() {
                            var targetHeight;
                            $ul.addClass('no-transition');
                            $ul.css('height', '');
                            targetHeight = $ul.prop('clientHeight');
                            $ul.css('height', 0);
                            $ul.removeClass('no-transition');
                            return targetHeight;
                        }
                    }, false);
                }
            );
        });

        // 완전억지스러움.
        var parentNode = $element[0].parentNode.parentNode.parentNode;
        if(parentNode.classList.contains('parent-list-item')) {
            var heading = parentNode.querySelector('h2');
            $element[0].firstChild.setAttribute('aria-describedby', heading.id);
        }
    }

    isOpen() {
        return this.section.open;
    }

    toggle() {
        this.onToggleOpen({toggleSection:this.section});
    }

    selectSubPage(page) {
        this.onClickSub( {section:this.section, page:page} );
    }
}

export default menuToggle;
