/**
 * http://usejsdoc.org/
 */
angular.module('leaveReqApp', []).controller('recordCtrl',
	function ($scope, $http) {
		/*-- 单击创建按钮 --*/
		$scope.createLeave = function () {
			$http({
				method: 'GET',
				url: '/data/leaverec'
			}).then(function successCallback(response) {
				response.data["id"]=$scope.leaveRecord.length + 1;
				$scope.leaveRecord.push(response.data);
			}, function errorCallback(response) {
				// 请求失败执行代码
			});
		}

		/*-- 删除记录 --*/
		$scope.removeRec = function(id) {
			var recTemp = [];
			for(var i=0;i<$scope.leaveRecord.length;i++) {
				if(i!=(id-1))
					recTemp.push($scope.leaveRecord[i]);
			}
			$scope.leaveRecord = recTemp;
		} 

		/*-- 修改记录 --*/
		$scope.editRec = function(id) {
			var recTemp = [];
			for(var i=0;i<$scope.leaveRecord.length;i++) {
				if(i==(id-1))
					$scope.leaveRecord[i]["status"]="Modified";
			}
		} 

		/*-- 初始化表格 --*/
		$http({
			method: 'GET',
			url: '/data/leaverec'
		}).then(function successCallback(response) {
			$scope.leaveRecord = [{
				id: '1',
				action: '',
				act_type: 'Annual Leave',
				start_date: '2019.04.29',
				end_date: '2019.04.30',
				processor: 'EChao',
				ori_type: '',
				ori_start: '',
				ori_end: '',
				status: 'post',
				notes: '',
				used: '2 days'
			}, {
				id: '2',
				action: '',
				act_type: 'Sick Leave(Full Pay)',
				start_date: '2019.04.15',
				end_date: '2019.04.15',
				processor: 'EChao',
				ori_type: '',
				ori_start: '',
				ori_end: '',
				status: 'post',
				notes: '',
				used: '1 days'
			}, {
				id: '3',
				action: '',
				act_type: 'Annual Leave',
				start_date: '2019.04.04',
				end_date: '2019.04.04',
				processor: 'EChao',
				ori_type: '',
				ori_start: '',
				ori_end: '',
				status: 'post',
				notes: '',
				used: '1 days'
			}, {
				id: '4',
				action: '',
				act_type: 'Annual Leave',
				start_date: '2019.03.14',
				end_date: '2019.03.15',
				processor: 'EChao',
				ori_type: '',
				ori_start: '',
				ori_end: '',
				status: 'post',
				notes: '',
				used: '2 days'
			}, {
				id: '5',
				action: '',
				act_type: 'Conpassionate Leave',
				start_date: '2019.03.11',
				end_date: '2019.03.13',
				processor: 'EChao',
				ori_type: '',
				ori_start: '',
				ori_end: '',
				status: 'post',
				notes: '',
				used: ''
			}];

		}, function errorCallback(response) {
			// 请求失败执行代码
		});

	});