/**
 * http://usejsdoc.org/
 */

define('leaveRec', ['angular', 'mosTable'], function (angular, _mosTable) {

	'use strict';

	var app = angular.module('leaveReqApp', []);

	app.controller('recordCtrl', ['$scope', '$http', function ($scope, $http) {
		//app.controller('recordCtrl', function ($scope, $http) {
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
		$scope.removeRec = function (id) {
			var recTemp = [];
			for (var i = 0; i < $scope.leaveRecord.length; i++) {
				if ($scope.leaveRecord[i]["id"] != id)
					recTemp.push($scope.leaveRecord[i]);
			}
			$scope.leaveRecord = recTemp;
		}

		/*-- 修改记录 --*/
		$scope.editRec = function (id) {
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
		var l_count = -1;
		var tabdata = {
			column: { 'name': '名称', 'address': '地址', 'tel': '电话', 'industry': '行业', 'rank': '排名' },
			items: [{ 'name': 'SAP', 'address': 'Pudong Jinke road.', 'tel': '02138896030', 'industry': 'IT/Internet/ERP', 'rank': '17' },
			{ 'name': 'SalesForce', 'address': 'Pudong Jinke road.', 'tel': '02138896031', 'industry': 'IT/Internet/CRM' },
			{ 'name': 'Alibaba', 'address': 'Pudong Jinke road.', 'tel': '02138896033', 'industry': 'Internet/Ecom', 'rank': '17' },
			{ 'name': 'Baidu', 'address': 'Pudong Jinke road.', 'tel': '02138896032', 'industry': 'Internet' }]
		}
		function uuid() {
			var s = [];
			var hexDigits = "0123456789abcdef";
			for (var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
			s[8] = s[13] = s[18] = s[23] = "-";

			var uuid = s.join("");
			return uuid;
		}
		var mosTable = {};
		mosTable.oData = {};
		mosTable.setModal = function (n, d) {
			mosTable.modalName = n;
			
			mosTable.oData[n] = d;
			for (var i = 0; i < this.oData[n]["items"].length; i++) {
				this.oData[n]["items"][i]["_moskey"] = uuid();
			}
		}
		mosTable.getModal = function (n) {
			return mosTable.oData[n];
		}

		mosTable.refreshTableBody = function (n) {
			var ui_tables = $("table[moscomp='mos_tab']");

			this.oData.tabdata.items.push({ name: "Tencent", address: "Pudong Jinke road.", tel: "0213889642", industry: "Internet/Games", rank: "18", _moskey: "ac95513a-db88-49b8-8b23-71f793b569f3" })

			for (var i = 0; i < ui_tables.length; i++) {
				var ui_table = ui_tables.eq(i);
				if (ui_table.length == 1 && ui_table[0]["_moskey"] == this._moskey) {
					var ui_body = ui_table.children().eq(1);
					ui_body.empty();
					ui_body.append('<tr></tr>');

					(function (o, m) {
						var l_html = "";
						if (o.children().eq(1)[0].tagName == "TBODY") {
							for (var i = 0; i < m["items"].length; i++) {
								var o_tr = o.children().eq(1).find('tr').last();
								if (o_tr.children().length > 0) {
									o.children().eq(1).append('<tr></tr>');
									o_tr = o.children().eq(1).find('tr').last();
								}
								o_tr[0]["_moskey"] = m["items"][i]["_moskey"];
								o_tr[0]["_mosdata"] = m["items"][i];
								for (var col in m["column"]) {
									l_html = '<td>' + m["items"][i][col] + '</td>';
									o_tr.append(l_html);
								}
							}

						}
					})(ui_table, this.oData[n]);

				}
			}
		}
		mosTable.init = function (n) {

			if (this._ui_object) {
				return;
			}
			var o = undefined;
			for(var i=0;i<n.length;i++) {
				if(n.eq(i).attr('mosdata')==mosTable.modalName) {
					o = n.eq(i);
					break;
				}
			}

			if(o==undefined) return;
			
			var l_mosdata = o.attr("mosdata");
			var l_modal = this.getModal(l_mosdata);
			var l_html = "";

			this._ui_object = o;
			this._ui_object[0]["_moskey"] = uuid();
			this._moskey = this._ui_object[0]["_moskey"];

			if (o.children().length == 3) {
				if (o.children().eq(0)[0].tagName == "THEAD") {
					var o_thead = o.children().eq(0);
					var o_tr = o.children().eq(0).children().eq(0);
					if (o_tr.children().length == 0) {

						for (var col in l_modal["column"]) {
							l_html = '<td>' + l_modal.column[col] + '</td>';
							o_tr.append(l_html);
						}
					}
				}
				if (o.children().eq(1)[0].tagName == "TBODY") {
					for (var i = 0; i < l_modal["items"].length; i++) {
						var o_tr = o.children().eq(1).find('tr').last();
						if (o_tr.children().length > 0) {
							o.children().eq(1).append('<tr></tr>');
							o_tr = o.children().eq(1).find('tr').last();
						}
						o_tr[0]["_moskey"] = l_modal["items"][i]["_moskey"];
						o_tr[0]["_mosdata"] = l_modal["items"][i];
						for (var col in l_modal["column"]) {
							l_html = '<td>' + l_modal["items"][i][col] + '</td>';
							o_tr.append(l_html);
						}
					}

				}

			}
			return;
		}

		$scope.initClick = function () {

			try{
				var mosTable1 = new _mosTable.mosTable();
				var oWeather = { column: { date:'日期', week:'星期', weather:'天气',temp:'温度'},
								 items: [{date:'2019.06.28',week:'Friday',weather:'Sunny',temp:'28'},
								 {date:'2019.06.29',week:'Saturday',weather:'Sunny',temp:'28'},
								 {date:'2019.06.30',week:'Sunday',weather:'Rainy',temp:'21'},
								 {date:'2019.07.01',week:'Monday',weather:'Rainy',temp:'22'},
								 {date:'2019.07.02',week:'Tuesday',weather:'Cloudy',temp:'24'}]};
				
								 mosTable1.setModal("weather",oWeather);
				var n = $("table[moscomp='mos_tab']");
				mosTable1.init(n);
				
			}catch(e)
			{
				console.log(e.message);
			}
		
			if (mosTable.oData["tabdata"] == undefined) {
				mosTable.setModal("tabdata", tabdata);
			}

			mosTable.init($("table[moscomp='mos_tab']"));

		}

		$scope.refreshClick = function () {

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