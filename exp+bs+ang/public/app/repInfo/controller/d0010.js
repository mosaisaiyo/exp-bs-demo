/**
 * http://usejsdoc.org/
 */

define('repInfo', ['angular', 'mosTable'], function(angular, mosTable) {

    'use strict';

    var app = angular.module('repInfoApp', []);

    app.controller('repCtrl', ['$scope', '$http', function($scope, $http) {
        var cfg0017 = {};
        $scope.cfg0017 = undefined;
        $scope.dat0010 = undefined;

        /*-- 初始化表格 --*/
        if ($scope.fg0017 == undefined) {
            $http({
                method: 'GET',
                url: '/data/cfg0017'
            }).then(function successCallback(response) {

                $scope.cfg0017 = response.data;

                try {
                    var d0010Tab = new mosTable.mosTable();
                    d0010Tab.eventHandle = function(e) {}
                    d0010Tab.init("d0017", $scope.cfg0017);

                } catch (e) {
                    console.log(e.message);
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }

        if ($scope.dat0010 == undefined) {
            $http({
                method: 'GET',
                url: '/data/dat0010'
            }).then(function successCallback(response) {

                $scope.dat0010 = response.data;

            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }

        /*-- 测试事件 --*/
        $scope.initClick = function() {

            return;

        }

        function colBtn(p) {
            console.log(p);
        }
    }]);

    return app;
});