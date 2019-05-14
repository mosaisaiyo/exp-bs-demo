/**
 * http://usejsdoc.org/
 */
angular.module('leaveReqApp', []).controller('recordCtrl',
    function($scope, $http) {

      $http({
	method : 'GET',
	url : '/data/leaverec'
      }).then(function successCallback(response) {
	$scope.leaveRecord = [ {
	  action : '',
	  act_type : 'Annual Leave',
	  start_date : '2019.04.29',
	  end_date : '2019.04.30',
	  processor : 'EChao',
	  ori_type : '',
	  ori_start : '',
	  ori_end : '',
	  status : 'post',
	  notes : '',
	  used : '2 days'
	}, {
	  action : '',
	  act_type : 'Sick Leave(Full Pay)',
	  start_date : '2019.04.15',
	  end_date : '2019.04.15',
	  processor : 'EChao',
	  ori_type : '',
	  ori_start : '',
	  ori_end : '',
	  status : 'post',
	  notes : '',
	  used : '1 days'
	}, {
	  action : '',
	  act_type : 'Annual Leave',
	  start_date : '2019.04.04',
	  end_date : '2019.04.04',
	  processor : 'EChao',
	  ori_type : '',
	  ori_start : '',
	  ori_end : '',
	  status : 'post',
	  notes : '',
	  used : '1 days'
	}, {
	  action : '',
	  act_type : 'Annual Leave',
	  start_date : '2019.03.14',
	  end_date : '2019.03.15',
	  processor : 'EChao',
	  ori_type : '',
	  ori_start : '',
	  ori_end : '',
	  status : 'post',
	  notes : '',
	  used : '2 days'
	}, {
	  action : '',
	  act_type : 'Conpassionate Leave',
	  start_date : '2019.03.11',
	  end_date : '2019.03.13',
	  processor : 'EChao',
	  ori_type : '',
	  ori_start : '',
	  ori_end : '',
	  status : 'post',
	  notes : '',
	  used : ''
	} ];
	$scope.leaveRecord.push(response.data);
      }, function errorCallback(response) {
	// 请求失败执行代码
      });

    });