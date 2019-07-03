// define(['angular'], function (angular) {

//     window.name = 'NG_DEFER_BOOTSTRAP';
//     var isloaded = false;

//     var timer = setInterval(function () {
//         angular.element(document).ready(function () {
//             angular.bootstrap(document, ["leaveReqApp"]);
//             isloaded = true;
//         });

//         if (isloaded === true) {
//             clearInterval(timer);
//         }
//     }, 300);

//     return angular.module('leaveReqApp', []);
// });


define(['require',
        'angular',
], function (require, angular) {
    'use strict';
    require(['domReady!'], function (document) {
        angular.bootstrap(document, ['leaveReqApp']);
    });
});