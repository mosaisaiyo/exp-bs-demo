// 定义引导执行体
define(['require',
    'angular',
], function(require, angular) {
    'use strict';
    require(['domReady!'], function(document) {
        angular.bootstrap(document, ['leaveReqApp']);
    });
});