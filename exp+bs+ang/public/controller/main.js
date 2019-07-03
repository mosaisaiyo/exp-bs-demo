require.config({
    paths: {
        'jquery': '../jquery-3.4.1/jquery.min',
        'bootstrap': '../bootstrap-3.3.7/js/bootstrap.min',
        'angular': '../angular-1.4.6/angular.min',
        'leaveRec': 'leaveRecord',
        'mosTable': '../javascripts/mosTable',
        'boot': 'bootstrap',
        'domReady': '../javascripts/domReady',
    },
    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'leaveRec': {
            deps: ['bootstrap', 'angular', 'mosTable']
        },
        'mosTable': {
            deps: ['jquery']
        },
    },
    deps: ['boot']
});

/* require(['app', 'angular'], function (app, angular) {
    console.info(angular.version);
    angular.bootstrap(document, ['leaveReqApp'])//这里会去执行app.js这个文件

}); */

require(['angular', 'leaveRec'], function (angular, leaveRec) {

});
