var filterState = false,
    currentUser = filters = {
	searchString: null,
	receivedPeriodOptions: ['From the beginning of time', 'Today', 'Yesterday', 'Last 7 Days', 'This Month', 'Last Month'],
	selectedReceivedPeriod: null,
	citySearchText: 'A',
	anchors: ['All', 'Ola', 'Tbo', 'Shopclues', 'Peelworks'],
	anchorsSelected: ['All'],
	startDate: null,
	endDate: null
},
    showClearFilterButton = false,
    topLevelViews = ['All', 'Mine'],
    selectedTopLevelViewIndex = 0,
    pipeline = [],
    applications = [],
    selectedPipelineIndex = 0,
    currentlyOpenedIndex = null,
    seletedApplications = [],
    lastPage = 0;
var config = {
	'pipeline_meta': {
		'loanofficer': [{ 'name': 'new', "displayName": 'New Applications', 'count': null }, { 'name': 'pending_approval', "displayName": 'Pending Approval', 'count': null }, { 'name': 'pending_documentation', "displayName": 'Pending Documentation', 'count': null }, { 'name': 'ready_for_disbursal', "displayName": 'Ready For Disbursal', 'count': null }, { 'name': 'fully_funded', "displayName": 'Fully Funded', 'count': null }, { 'name': 'rejected', "displayName": 'Rejected', 'count': null }],
		'lender': [{ 'name': 'open', "displayName": 'Open', 'count': null }, { 'name': 'pending_documentation', "displayName": 'Pending Documentation', 'count': null }, { 'name': 'ready_for_disbursal', "displayName": 'Ready For Disbursal', 'count': null }, { 'name': 'fully_funded', "displayName": 'Fully Funded', 'count': null }, { 'name': 'rejected', "displayName": 'Rejected', 'count': null }, { 'name': 'withdrawn', "displayName": 'Withdrawn', 'count': null }, { 'name': 'closed', "displayName": 'Closed', 'count': null }]
	}
};

function fetchPipelineData() {
	var viewName = topLevelViews[selectedTopLevelViewIndex];
	var pipeline = [];
	var application_summary_params = {
		params: {
			all: viewName === "Mine" ? 0 : 1,
			search_key: filters.searchString,
			city: filters.citySearchText,
			startDate: filters.startDate,
			endDate: filters.endDate,
			anchors: JSON.stringify(filters.anchorsSelected)
		}
	};
	var query_data = {
		all: viewName === "Mine" ? 0 : 1,
		search_key: filters.searchString,
		city: filters.citySearchText,
		startDate: filters.startDate,
		endDate: filters.endDate,
		anchors: JSON.stringify(filters.anchorsSelected)
	};
	$.ajax({
		url: applications_summary_url,
		type: 'GET',
		headers: { 'Authorization': 'Bearer ' + localStorage.getItem('indifi.token') },
		data: query_data,
		success: function (result) {
			console.log(JSON.stringify(result));

			var stateMap = {};
			var totalCount = 0;
			result.data.forEach(function (item) {
				stateMap[item.state] = item;
				totalCount = totalCount + parseInt(item.count);
			});
			var currentUser = JSON.parse(localStorage.getItem('user'));
			console.log('LOG ' + JSON.stringify(currentUser));
			config.pipeline_meta[currentUser.role].forEach(function (item, index) {
				var stage = jQuery.extend(true, {}, item);
				if (stateMap[item.name]) {
					stage.count = stateMap[item.name].count;
					pipeline.push(stage);
				}
			});
			console.log(JSON.stringify(pipeline));
		},
		error: function (xhr, status, err) {
			console.log('err' + JSON.stringify(err));
		}
	});

	/*var promise = $http.get(appConfig.urls.applicationsSummary, {
 	params: {
 		all: (viewName === "Mine" ? 0 : 1),
 		search_key: filters.searchString,
 		city: filters.citySearchText,
 		startDate: filters.startDate,
 		endDate: filters.endDate,
 		anchors: JSON.stringify(filters.anchorsSelected)
 	}
 })
 promise
 .then(function(result) {
 	var stateMap = {};
 	var totalCount = 0;
 	result.data.forEach(function(item){
 		stateMap[item.state] = item;
 		totalCount = totalCount+ parseInt(item.count);
 	});
 		config.pipeline_meta[currentUser.role].forEach(function(item, index){
 		var stage = angular.copy(item);
 		if(stateMap[item.name]){
 			stage.count = stateMap[item.name].count;     
 			pipeline.push(stage);	
 		}
 		
 	});
 	console.log(JSON.stringify(pipeline));
 })
 return promise;*/
}

fetchPipelineData();