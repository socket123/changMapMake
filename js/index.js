//Vue数据
var data_movies = new Vue({
	el: '#movies',
	data: {
		moviesList: '',
		docName: '',
		docUrl: '',
		docType: '',
		address: '',
		lasts: '',
		lngs: '',
		docImg: '',
		docTypeName: '',
		moviesListNew: [],
		dataListOne: [],
		moviesType: [],
		typeId: "0",
		city: "",

	},
	methods: {
		numberInput: function(e) {
			$(".map-remake").hide();
			$(".map-list").hide();
		},
		numberPutPut: function(e) {
			console.log(e);
			$(".map-remake").show();
			$(".map-list").show();
		},
		numberInputOnckic: function(e) {
			$(".map-alerts-remake").hide();
			$(".map-alerts").hide();
			$(".map-alerts").addClass("map-alerts-back");
		},
		numberInputOnckicShow: function(e) {
			$(".map-alerts-remake").show();
			$(".map-alerts").show();
		},
		onclucUrls: function(e) {
			location.href = data_movies.docUrl;
		},
		tapUrlTenXun: function(e) {
			var title = data_movies.docName;
			var addr = data_movies.address;
			var coord = data_movies.lngs + "," + data_movies.lasts;
			location.href = "http://apis.map.qq.com/uri/v1/marker?marker=coord:" + coord + "&title=" + title + "&addr=" +
				addr + "&referer=yellowpage";
		},
		tapUrlbaiDu: function(e) {
			var title = data_movies.docName;
			var addr = data_movies.address;
			var coord = data_movies.lngs + "," + data_movies.lasts;
			location.href = "http://api.map.baidu.com/marker?location=" + coord + "&title=" + title + "&content=" + addr +
				"&output=html&src=webapp.baidu.openAPIdemo";
		},
		tapUrlGaode: function(e) {
			var title = data_movies.docName;
			var addr = data_movies.address;
			var coord = data_movies.lasts + "," + data_movies.lngs;
			location.href = "http://uri.amap.com/marker?position=" + coord + "&name=" + title + "&content=" + addr +
				"&src=yellowpage&coordinate=gaode&callnative=1";
		},
		onclucTableLeft: function(e) {
			$(".mover-index-left").addClass("mover-index-on");
			$(".mover-index-right").removeClass("mover-index-on");
		},
		onclucTableRight: function(e) {
			$(".mover-index-right").addClass("mover-index-on");
			$(".mover-index-left").removeClass("mover-index-on");
		},
	}
});

// 分类点击事件
$(document).on("click", ".mover-index-left", function() {
	var thiz = $(this);
	var typeId = thiz.attr("typeId");
	$.each($(".mover-index-left"), function(index, values) {
		var idnexLeft = $(".mover-index-left").eq(index);
		idnexLeft.removeClass("mover-index-on");
	});
	thiz.addClass("mover-index-on");
	console.log(typeId);
	data_movies.typeId = typeId;
	mapurlsCtiy();
	console.log(map);
	// map.reset();
	// map.clearOverlays(); //清除图层覆盖物
	for (var i = 0; i < maksList.length; i++) {
		var makes = maksList[i]._markers;
			map.removeOverlay(makes);
		for (var j = 0; j < makes.length; j++) {
			console.log(makes[j]);
			maksList[i].clearMarkers(makes[j]);
		}
	}
});


$(document).on("click", ".clicks", function() {
	//执行代码
	// getMak_Dian();
	thiz = $(this);
	var ids = thiz.attr("ids");
	console.log(ids);
	data_movies.moviesList = ids;

	var mapUrls = urlVal + "webpage/api/getCaseInfoById.jsp?caseId=" + data_movies.moviesList;
	console.log(mapUrls);
	$.ajax({
		type: "GET",
		url: mapUrls,
		data: {},
		dataType: "json",
		// async: false,
		success: function(datas) {
			// 			datas = {
			// 				"docId": "1111",
			// 				"docName": "测试案例",
			// 				"docImg": "http://www.baidu.com/img/acs.jpg",
			// 				"docUrl": "http://www.baidu.com/img/acs.jpg",
			// 				"docType": "改造案例",
			// 				"address": "南京市建邺区汉中门大街123号",
			// 				"docLocation": "78.11123,186.1232"
			// 			}
			console.log(datas);
			data_movies.docName = datas.docName;
			data_movies.docUrl = datas.docUrl;
			data_movies.docTypeName = datas.docTypeName;
			data_movies.address = datas.address;
			data_movies.docImg = datas.docImg;
			$(".map-remake").show();
			$(".map-list").show();

			var docName = thiz.attr("docName");
			var docUrl = thiz.attr("docUrl");
			var docType = thiz.attr("docType");
			var address = thiz.attr("address");
			var lasts = thiz.attr("lasts");
			var lngs = thiz.attr("lngs");

			data_movies.docName = docName;
			data_movies.lasts = lasts;
			data_movies.lngs = lngs;
		},
		err: function(data) {
			console.log(data);
		}

	});



});
