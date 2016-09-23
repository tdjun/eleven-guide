/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

export const AVAILABILITY_DATE_FORMAT = 'YYYYMMDD';
// http://labs.qandidate.com/blog/2014/10/16/using-the-accept-header-to-version-your-api/
export const HEADER_API_VERSION = 'application/json'; //'application/vnd.employee-scheduling.api+json;version=1;charset=utf-8'; // application/vnd.employee-scheduling.v1+json
export const BUILDCONFIG = {
    'ngVersion': '1.5.5',
    'version': '1.1.1',
    'repository': 'https://github.com/angular/material',
    'commit': '1f14cc43c4dd9b66252c94e7bd40314bc018a995',
    'date': '2016-09-08 19:35:37 -0700'
};
export const SECTIONS = [
    {
        name: 'Documentation Version',
        type: 'heading'
    },
    {
        name: 'Getting Started',
        type: 'link'
    },
    {
        name: 'Customization',
        type: 'heading',
        children: [
            {
                name: 'CSS',
                type: 'toggle',
                pages: [{
                    name: 'Typography',
                    url: 'CSS/typography',
                    type: 'link'
                },
                    {
                        name : 'Button',
                        url: 'CSS/button',
                        type: 'link'
                    },
                    {
                        name : 'Checkbox',
                        url: 'CSS/checkbox',
                        type: 'link'
                    }]
            },
            {
                name: 'Theming',
                type: 'toggle',
                pages: [
                    {
                        name: 'Introduction and Terms',
                        url: 'Theming/01_introduction',
                        type: 'link'
                    },
                    {
                        name: 'Declarative Syntax',
                        url: 'Theming/02_declarative_syntax',
                        type: 'link'
                    },
                    {
                        name: 'Configuring a Theme',
                        url: 'Theming/03_configuring_a_theme',
                        type: 'link'
                    },
                    {
                        name: 'Multiple Themes',
                        url: 'Theming/04_multiple_themes',
                        type: 'link'
                    },
                    {
                        name: 'Under the Hood',
                        url: 'Theming/05_under_the_hood',
                        type: 'link'
                    },
                    {
                        name: 'Browser Color',
                        url: 'Theming/06_browser_color',
                        type: 'link'
                    }
                ]
            }
        ]
    },
    {
        name: 'API Reference',
        type: 'heading',
        children: [
            {
                name: 'Layout',
                type: 'toggle',
                pages: [
                    {
                        name: 'Introduction',
                        id: 'layoutIntro',
                        url: 'layout/introduction'
                    }, {
                        name: 'Layout Containers',
                        id: 'layoutContainers',
                        url: 'layout/container'
                    }, {
                        name: 'Layout Children',
                        id: 'layoutGrid',
                        url: 'layout/children'
                    }, {
                        name: 'Child Alignment',
                        id: 'layoutAlign',
                        url: 'layout/alignment'
                    }, {
                        name: 'Extra Options',
                        id: 'layoutOptions',
                        url: 'layout/options'
                    }, {
                        name: 'Troubleshooting',
                        id: 'layoutTips',
                        url: 'layout/tips'
                    }]
            }
        ]
    },
    {
        name: 'Contributors',
        type: 'link'
    },
    {
        name: 'License',
        type: 'link',
        url: 'license',
        hidden: true
    }
];
