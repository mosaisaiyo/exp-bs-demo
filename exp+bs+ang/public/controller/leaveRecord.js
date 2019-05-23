/**
 * http://usejsdoc.org/
 */
angular.module('leaveReqApp', []).controller('recordCtrl',
	function ($scope, $http) {
		/*-- 单击创建按钮 --*/
		$scope.createLeave = function () {
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
			for(var i=0;i<$scope.leaveRecord.length;i++) {
				if($scope.leaveRecord[i]["id"]!=id)
					recTemp.push($scope.leaveRecord[i]);
			}
			$scope.leaveRecord = recTemp;
		} 

		/*-- 修改记录 --*/
		$scope.editRec = function(id) {
			var recTemp = [];
			for(var i=0;i<$scope.leaveRecord.length;i++) {
				if($scope.leaveRecord[i]["id"]==id)
					$scope.leaveRecord[i]["status"]="Modified";
			}
		} 

		/*-- 初始化表格 --*/
		$http({
			method: 'GET',
			url: '/data/leaverec?action=init'
		}).then(function successCallback(response) {
			$scope.leaveRecord = [];
			for(var i=0;i<response.data.length;i++)
				$scope.leaveRecord.push(response.data[i]);
		}, function errorCallback(response) {
			// 请求失败执行代码
		});

	});