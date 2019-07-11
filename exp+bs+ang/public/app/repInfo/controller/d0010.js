/**
 * http://usejsdoc.org/
 */

define('repInfo', ['angular', 'mosTable'], function (angular, mosTable) {

    'use strict';

    var app = angular.module('repInfoApp', []);

    app.controller('repCtrl', ['$scope', '$http', function ($scope, $http) {
        var cfg0017 = {};
        $scope.cfg0017 = undefined;
        $scope.dat0010 = undefined;
        $scope.selKey = undefined;
        $scope.selZone = undefined;
        $scope.d0017Tab = new mosTable.mosTable();
        $scope.d0010Tab = new mosTable.mosTable();

        $scope.eventHandle = function (evt) {
            if (evt.target.innerText == "查阅指标") {
                var sel0017 = {};
                sel0017["column"] = $scope.cfg0017["column"];
                sel0017["items"] = [];
                $scope.selKey = evt.data.key;
                for (var i = 0; i < $scope.cfg0017.items.length; i++) {
                    if ($scope.cfg0017.items[i]._moskey == $scope.selKey) {
                        sel0017["items"].push($scope.cfg0017.items[i]);
                        $scope.selZone = $scope.cfg0017.items[i]["FACTOR"];
                    }
                }
                if (sel0017.items.length > 0) {
                    $scope.d0017Tab.removeTableBodyRows();
                    $scope.d0017Tab.refreshTableBodyRows("d0017", sel0017, { fstColBtn: true, fstColBtnTxt: "更多指标" });
                }

                if ($scope.selZone != undefined) {
                    var sel0010 = {};
                    sel0010["column"] = $scope.dat0010["column"];
                    sel0010["items"] = [];
                    for (var i = 0; i < $scope.dat0010.items.length; i++) {
                        if ($scope.dat0010.items[i].ZZONE == $scope.selZone) {
                            sel0010["items"].push($scope.dat0010.items[i]);
                        }
                    }
                    $scope.d0010Tab.removeTableBodyRows();
                    $scope.d0010Tab.refreshTableBodyRows("d0010", sel0010);
                }
            } else if (evt.target.innerText == "更多指标") {
                $scope.d0017Tab.removeTableBodyRows();
                $scope.d0017Tab.refreshTableBodyRows("d0017", $scope.cfg0017, { fstColBtn: true, fstColBtnTxt: "查阅指标" });

                $scope.d0010Tab.removeTableBodyRows();
                //$scope.d0010Tab.refreshTableBodyRows("d0010", sel0010);
            }

        }

        /*-- 初始化表格 --*/
        if ($scope.fg0017 == undefined) {
            $http({
                method: 'GET',
                url: '/data/cfg0017'
            }).then(function successCallback(response) {

                $scope.cfg0017 = response.data;

                try {

                    $scope.d0017Tab.eventHandle = $scope.eventHandle;
                    $scope.d0017Tab.init("d0017", $scope.cfg0017, { fstColBtn: true, fstColBtnTxt: "查阅指标" });

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

                var sel0010 = {};
                sel0010["column"] = $scope.dat0010["column"];
                sel0010["items"] = [];

                $scope.d0010Tab.init("d0010", sel0010);

            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }

        /*-- 测试事件 --*/
        $scope.initClick = function () {

            return;

        }

        function colBtn(p) {
            console.log(p);
        }
    }]);

    return app;
});