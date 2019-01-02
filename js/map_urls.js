/**
 * 
 * 
var mapUrl_bd ="http://api.map.baidu.com/marker?location=34.271454,108.958486&title="+inform.orgName+"&content="+inform.orgAddress+"&output=html&src=yellowpage";
$("#mapBg .mapTab .mapBtn_b").attr("href",mapUrl_bd);
 */
var urlVal = "http://wx.guqiang.cn/cms/";

/**
 * 获取 每个类型
 */
function getMak_TypeLeixing() {
	var mapUrls = urlVal + "webpage/api/getDocTypes.jsp";
	$.ajax({
		type: "GET",
		url: mapUrls,
		data: {},
		dataType: "json",
		success: function(datas) {
			console.log(datas);
			data_movies.moviesType = type_cove(datas);
		},
		err: function(data) {
			console.log(data);
		}

	});
}
// 
function type_cove(datas){
	var htmls = [];
	htmls.push({
		"typeId":0,
		"typeName":"全部",
		"clazz": "mover-index-left mover-index-on",
	})
	$.each(datas,function(index,values){
		htmls.push({
			"typeId":values.typeId,
			"typeName":values.typeName,
			"clazz": "mover-index-left",
		})
	})
	return htmls;
}



/**
 * 获取 每个点数据
 */
function getMak_Dian() {
	var mapUrls = urlVal + "webpage/api/getCaseInfoById.jsp?caseId=" + data_movies.moviesList;
	$.ajax({
		type: "GET",
		url: mapUrls,
		data: {},
		dataType: "json",
		async: false,
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
			data_movies.docName = datas.docName;
			data_movies.docUrl = datas.docUrl;
			data_movies.docType = datas.docType;
			data_movies.address = datas.address;
			data_movies.docImg = datas.docImg;
		},
		err: function(data) {
			console.log(data);
		}

	});
}


/**
 * 获取 每个区的
 */
function mapurls(urlAdress) {
	var mapUrls = "http://api.map.baidu.com/geocoder/v2/?address=" + urlAdress +
		"&output=json&ak=HQhKmm5BgoxOKkZaxIplU8nI5KVx4ZuR&callback=showLocation";
	console.log(mapUrls)
	$.ajax({
		type: "GET",
		url: mapUrls,
		data: {},
		dataType: "jsonp",
		async: false,
		success: function(datas) {
			console.log(datas.result.location.lat);
			console.log(datas.result.location.lng);
			getCitLas();
		},
		err: function(data) {
			console.log(data);
		}

	});
}

/**
 * 获取 根据南京获取数据
 */
function mapurlsCtiy(city) {
	// 	var datasJson = {
	// 		"cityName": "南京",
	// 		"district": [{
	// 				"districtName": "建邺区",
	// 				"caseNums": "22",
	// 				"caseDocs": [{
	// 						"docId": "1111",
	// 						"docName": "测试案例",
	// 						"docUrl": "http://img95.58pic.com/photo/00046/6718.jpg_wh860.jpg!/fw/650",
	// 						"docType": "改造案例",
	// 						"address": "南京市建邺区汉中门大街123号",
	// 						"docLocation": "32.033925,118.733145"
	// 					},
	// 					{
	// 						"docId": "1222",
	// 						"docName": "测试案例",
	// 						"docUrl": "http://img95.58pic.com/photo/00046/6718.jpg_wh860.jpg!/fw/650",
	// 						"docType": "改造案例",
	// 						"address": "南京市建邺区汉中门大街123号",
	// 						"docLocation": "32.026455,118.702387"
	// 					},
	// 					{
	// 						"docId": "1333",
	// 						"docName": "测试案例",
	// 						"docUrl": "http://img95.58pic.com/photo/00046/6718.jpg_wh860.jpg!/fw/650",
	// 						"docType": "改造案例",
	// 						"address": "南京市建邺区汉中门大街123号",
	// 						"docLocation": "32.007841,118.729839"
	// 					}
	// 				]
	// 			},
	// 			{
	// 				"districtName": "秦淮区",
	// 				"caseNums": "22",
	// 				"caseDocs": [{
	// 						"docId": "2111",
	// 						"docName": "测试案例",
	// 						"docUrl": "http://img95.58pic.com/photo/00046/6718.jpg_wh860.jpg!/fw/650",
	// 						"docType": "改造案例",
	// 						"address": "南京市建邺区汉中门大街123号",
	// 						"docLocation": "32.0711, 118.85952"
	// 					},
	// 					{
	// 						"docId": "2222",
	// 						"docName": "测试案例",
	// 						"docUrl": "http://img95.58pic.com/photo/00046/6718.jpg_wh860.jpg!/fw/650",
	// 						"docType": "改造案例",
	// 						"address": "南京市建邺区汉中门大街123号",
	// 						"docLocation": "32.078849,118.870837"
	// 					},
	// 					{
	// 						"docId": "2333",
	// 						"docName": "测试案例",
	// 						"docUrl": "http://img95.58pic.com/photo/00046/6718.jpg_wh860.jpg!/fw/650",
	// 						"docType": "改造案例",
	// 						"address": "南京市建邺区汉中门大街123号",
	// 						"docLocation": "32.083805,118.801775"
	// 					}
	// 				]
	// 			}
	// 
	// 		]
	// 	}
	console.log(city);
	var urls = urlVal + "webpage/api/getCasesByCity.jsp";
	$.ajax({
		type: "POST",
		url: urls,
		data: {
			"cityName": data_movies.city,
			"typeId":data_movies.typeId,
		},
		dataType: "json",
		// async:false,
		success: function(datas) {
			console.log(datas);
			getCitLas(datas);
		},
		err: function(data) {
			console.log(data);
		}

	});
}


/**
 * 获取 区 和 点
 */
var maksList = [];
function getCitLas(xy1) {
	// 	var datasJson = {
	// 		"cityName": "南京",
	// 		"district": [{
	// 			"districtName": "建邺区",
	// 			"caseNums": "22",
	// 			"caseDocs": [{
	// 				"docId": "1111",
	// 				"docName": "测试案例",
	// 				"docUrl": "http://img95.58pic.com/photo/00046/6718.jpg_wh860.jpg!/fw/650",
	// 				"docType": "改造案例",
	// 				"address": "南京市建邺区汉中门大街123号",
	// 				"docLocation": "78.11123,186.1232"
	// 			}]
	// 		}]
	// 	}
	var districtList = xy1.district;
	// 遍历循环 带出 区数据
	
	$.each(districtList, function(index, values) {
		// console.log(values);
		var caseDocsList = values.caseDocs;
		var xDocsMak = [];
		var markers1 = [];
		var pt = null;
		$.each(caseDocsList, function(indexDocs, valuesDocs) {
			// console.log(valuesDocs);
			var docLocation = valuesDocs.docLocation;
			var docLocationList = docLocation.split(",");
// 			console.log(docLocationList[0]);
// 			console.log(docLocationList[1]);
			pt = new BMap.Point(docLocationList[0], docLocationList[1]);
			pt['ids'] = valuesDocs.docId;
			pt['docName'] = valuesDocs.docName;
			pt['docUrl'] = valuesDocs.docUrl;
			pt['docType'] = valuesDocs.docType;
			pt['address'] = valuesDocs.address;
			pt['docColor'] = valuesDocs.docColor;
			pt['lasts'] = docLocationList[0]; // 118.801775
			pt['lngs'] = docLocationList[1]; // 32.083805
			markers1.push(new BMap.Marker(pt));
		});
		//最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
		var markerClusterer1 = new BMapLib.MarkerClusterer(map, {
			markers: markers1,
			girdSize: 10,
			names: values.districtName,
			styles: [{
				url: './img/blue.png',
				size: new BMap.Size(92, 92),
				backgroundColor: '#4783E7'
			}],
		});
		markerClusterer1.setMaxZoom(13);
		markerClusterer1.setGridSize(2000);
		maksList.push(markerClusterer1);
	})


	/////////////////////////////////////



	// 	var xy = [{
	// 			'x': 118.811908,
	// 			'y': 32.044821
	// 		}, {
	// 			'x': 118.797391,
	// 			'y': 32.049841
	// 		},
	// 		// 118.862197,31.942974
	// 
	// 	];
	// 	var markers = [];
	// 	var pt1 = null;
	// 	for (var i in xy) {
	// 		pt1 = new BMap.Point(xy[i].x, xy[i].y);
	// 		pt1['ids'] = "clic-" + i + ""
	// 		markers.push(new BMap.Marker(pt1));
	// 	}
	// 	//最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
	// 	var markerClusterer = new BMapLib.MarkerClusterer(map, {
	// 		markers: markers,
	// 		girdSize: 100,
	// 		names: "玄武",
	// 		styles: [{
	// 			url: './img/blue.png',
	// 			size: new BMap.Size(92, 92),
	// 			backgroundColor: '#4783E7'
	// 		}],
	// 	});
	// 	markerClusterer.setMaxZoom(13);
	// 	markerClusterer.setGridSize(1000);

}
