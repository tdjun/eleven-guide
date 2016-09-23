/**
 * @author    tdjun {@link http://tdjun.co.kr}
 * @copyright Copyright (c) 2016, tdjun
 * @license   GPL-3.0
 */
'use strict';

import template from './docs-demo.html!text';
import {Inject, View, Component} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'docs-demo'
})
@View({
    template: template,
    transclude: true,
    bindToController: true
})
@Inject('$scope', '$element', '$attrs', '$interpolate', 'codepen')
//end-non-standard
class docsDemo {
    constructor($scope, $element, $attrs, $interpolate, codepen) {

        this.codepen = codepen;

        this.interpolateCode = angular.isDefined($attrs.interpolateCode);
        this.demoId = $interpolate($attrs.demoId || '')($scope.$parent);
        this.demoTitle = $interpolate($attrs.demoTitle || '')($scope.$parent);
        this.demoModule = $interpolate($attrs.demoModule || '')($scope.$parent);

        var me = this;
        $attrs.$observe('demoTitle',  function(value) { me.demoTitle  = value || me.demoTitle; });
        $attrs.$observe('demoId',     function(value) { me.demoId     = value || me.demoId; });
        $attrs.$observe('demoModule', function(value) { me.demoModule = value || me.demoModule;  });

        this.files = {
            css: [], js: [], html: []
        };
    }

    addFile(name, contentsPromise) {
        var file = {
            name: convertName(name),
            contentsPromise: contentsPromise,
            fileType: name.split('.').pop()
        };
        contentsPromise.then(function(contents) {
            file.contents = contents;
        });

        if (name === 'index.html') {
            this.files.index = file;
        } else if (name === 'readme.html') {
            this.demoDescription = file;
        } else {
            this.files[file.fileType] = this.files[file.fileType] || [];
            this.files[file.fileType].push(file);
        }

        this.orderedFiles = []
            .concat(this.files.index || [])
            .concat(this.files.js || [])
            .concat(this.files.css || [])
            .concat(this.files.html || []);
    }

    editOnCodepen() {
        this.codepen.editOnCodepen({
            title: this.demoTitle,
            files: this.files,
            id: this.demoId,
            module: this.demoModule
        });
    }
}
function convertName(name) {
    switch(name) {
        case 'index.html' : return 'HTML';
        case 'script.js' : return 'JS';
        case 'style.css' : return 'CSS';
        default : return name;
    }
}

export default docsDemo;
