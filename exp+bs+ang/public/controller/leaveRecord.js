/**
 * http://usejsdoc.org/
 */

define('leaveRec', ['angular', 'mosTable'], function(angular, mosTable) {

    'use strict';

    var app = angular.module('leaveReqApp', []);

    app.controller('recordCtrl', ['$scope', '$http', function($scope, $http) {

        /*-- 单击创建按钮 --*/
        $scope.createLeave = function() {
            $http({
                method: 'GET',
                url: '/data/leaverec?action=new'
            }).then(function successCallback(response) {
                //response.data["id"]=$scope.leaveRecord.length + 1;
                $scope.leaveRecord.push(response.data);
            }, function errorCallback(response) {
                // 请求失败执行代码
            });
        }

        /*-- 删除记录 --*/
        $scope.removeRec = function(id) {
            var recTemp = [];
            for (var i = 0; i < $scope.leaveRecord.length; i++) {
                if ($scope.leaveRecord[i]["id"] != id)
                    recTemp.push($scope.leaveRecord[i]);
            }
            $scope.leaveRecord = recTemp;
        }

        /*-- 修改记录 --*/
        $scope.editRec = function(id) {
            var recTemp = [];
            for (var i = 0; i < $scope.leaveRecord.length; i++) {
                if ($scope.leaveRecord[i]["id"] == id)
                    $scope.leaveRecord[i]["status"] = "Modified";
            }
        }

        /*-- 初始化表格 --*/
        $http({
            method: 'GET',
            url: '/data/leaverec?action=init'
        }).then(function successCallback(response) {
            $scope.leaveRecord = [];
            for (var i = 0; i < response.data.length; i++)
                $scope.leaveRecord.push(response.data[i]);
        }, function errorCallback(response) {
            // 请求失败执行代码
        });

        /*-- 测试事件 --*/
        $scope.initClick = function() {
            // Define mockdata
            var oITComp = {
                column: { 'name': '名称', 'address': '地址', 'tel': '电话', 'industry': '行业', 'rank': '排名' },
                items: [{ 'name': 'SAP', 'address': 'Pudong Jinke road.', 'tel': '02138896030', 'industry': 'IT/Internet/ERP', 'rank': '17' },
                    { 'name': 'SalesForce', 'address': 'Pudong Jinke road.', 'tel': '02138896031', 'industry': 'IT/Internet/CRM' },
                    { 'name': 'Alibaba', 'address': 'Pudong Jinke road.', 'tel': '02138896033', 'industry': 'Internet/Ecom', 'rank': '17' },
                    { 'name': 'Baidu', 'address': 'Pudong Jinke road.', 'tel': '02138896032', 'industry': 'Internet' }
                ]
            };

            var oWeather = {
                column: { date: '日期', week: '星期', weather: '天气', temp: '温度' },
                items: [{ date: '2019.06.28', week: 'Friday', weather: 'Sunny', temp: '28' },
                    { date: '2019.06.29', week: 'Saturday', weather: 'Sunny', temp: '28' },
                    { date: '2019.06.30', week: 'Sunday', weather: 'Rainy', temp: '21' },
                    { date: '2019.07.01', week: 'Monday', weather: 'Rainy', temp: '22' },
                    { date: '2019.07.02', week: 'Tuesday', weather: 'Cloudy', temp: '24' }
                ]
            };


            try {
                var itcompTab = new mosTable.mosTable();
                var weatherTab = new mosTable.mosTable();

                //itcompTab.setModal("itcomp", oITComp);
                //weatherTab.setModal("weather", oWeather);

                itcompTab.init("itcomp", oITComp);
                weatherTab.init("weather", oWeather);



            } catch (e) {
                console.log(e.message);
            }

        }

        $scope.refreshClick = function() {

            if (mosTable.oData["tabdata"] != undefined) {
                mosTable.refreshTableBody("tabdata");
            }

        }

        function pageLoad() {
            return;
        }

        function pageShow() {
            return;
        }

        function pageResize() {
            return;
        }
    }]);

    return app;
});