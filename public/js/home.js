var Home = React.createClass({
  getInitialState: function() {
    return {
    newApplication: false, 
    existingApplication: false,	
    filterState :false, 
	currentUser : JSON.parse(localStorage.getItem('user')),
	filters : {
		searchString: null,
		receivedPeriodOptions: ['From the beginning of time', 'Today', 'Yesterday', 'Last 7 Days', 'This Month', 'Last Month'],
		selectedReceivedPeriod: null,
		citySearchText: null,
		anchors: ['All', 'Ola', 'Tbo', 'Shopclues', 'Peelworks'],
		anchorsSelected: ['All'],
		startDate: null,
		endDate: null
	},
	showClearFilterButton : false,
	topLevelViews : ['All', 'Mine'],
	selectedTopLevelViewIndex : 0,
	pipeline : [],
	applications : [],
	selectedPipelineIndex : 0,
	currentlyOpenedIndex : null,
	seletedApplications :[],
	lastPage : 0,
	config : {
		'pipeline_meta': {
			'loanofficer': [
				{'name': 'new', "displayName": 'New Applications', 'count': null},
				{'name': 'pending_approval', "displayName": 'Pending Approval', 'count': null},
				{'name': 'pending_documentation', "displayName": 'Pending Documentation', 'count': null},
				{'name': 'ready_for_disbursal', "displayName": 'Ready For Disbursal', 'count': null},
				{'name': 'fully_funded', "displayName": 'Fully Funded', 'count': null},
	  {'name': 'rejected', "displayName": 'Rejected', 'count': null}
			],
			'lender': [
				{'name': 'open', "displayName": 'Open', 'count': null},
				{'name': 'pending_documentation', "displayName": 'Pending Documentation', 'count': null},
				{'name': 'ready_for_disbursal', "displayName": 'Ready For Disbursal', 'count': null},
				{'name': 'fully_funded', "displayName": 'Fully Funded', 'count': null},
				{'name': 'rejected', "displayName": 'Rejected', 'count': null},
				{'name': 'withdrawn', "displayName": 'Withdrawn', 'count': null},
				{'name': 'closed', "displayName": 'Closed', 'count': null}
			]   
		}
	}
    };
  },
  
  handleSearchChange: function(event) {
    this.setState({filters : {
		searchString: event.target.value,
		receivedPeriodOptions: ['From the beginning of time', 'Today', 'Yesterday', 'Last 7 Days', 'This Month', 'Last Month'],
		selectedReceivedPeriod: null,
		citySearchText: null,
		anchors: ['All', 'Ola', 'Tbo', 'Shopclues', 'Peelworks'],
		anchorsSelected: ['All'],
		startDate: null,
		endDate: null
	}});
  },
  render: function() {
  	var table = null;
  	var navButtons = null;
  	if (this.state.existingApplication) {
  		table = <Applications applications={this.state.applications} applicationsWithInterview={this.state.applicationsWithInterview} anchors={this.state.anchors}></Applications>
  		navButtons = <span><button className="fs-submit" onClick={this.fetchPrevApplications}>Prev</button>
					<button className="fs-submit" onClick={this.fetchNextApplications}>Next</button></span>
  	}
  	if (this.state.newApplication) {
  		table = <Anchors anchors={this.state.anchors}></Anchors>
  	}
    return (
    		<div className="fs-form-wrap" id="fs-form-wrap">
				<div className="fs-title center-align outer-border">
					<button className="fs-submit" type="submit" onClick= {this.onClickNewApplication}>New Application </button>
					<br/><br/><br/><br/>
					<button className="fs-submit" type="submit" onClick={this.fetchPipelineData}>Existing Application</button>
					<br/><br/>
					<span><input type="text" placeholder="Search application" className="input"
					 value={this.state.filters.searchString} onKeyDown={this.handleSearchKeyDown} 
					 onChange={this.handleSearchChange} />
					<button className="fs-submit" type="submit" onClick={this.fetchPipelineData}>Go</button></span>
					<br/><br/>
					{table}
					{navButtons}
				</div>
			</div>
      )
  }, 

  handleSearchKeyDown: function (e) {
  	if (e.keyCode == 13) {
  		this.fetchPipelineData();
  	}	
  }, 

  fetchPipelineData: function() {
  	if (!this.state.applicationsWithInterview) {
  		this.fetchApplicationsWithInterview();
  	}
  	var state = this.state;
  	var viewName = state.topLevelViews[state.selectedTopLevelViewIndex];
			var query_data = {
					all: (state.viewName === "Mine" ? 0 : 1),
					search_key: state.filters.searchString,
					city: state.filters.citySearchText,
					startDate: state.filters.startDate,
					endDate: state.filters.endDate,
					anchors: JSON.stringify(state.filters.anchorsSelected)
				}
			$.ajax({
				url: applications_summary_url,
				type: 'GET',
				headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('indifi.token') },
				data: query_data,
				success: function (result) {
					//console.log(JSON.stringify(result));
					
					this.state.stateMap = {};
					this.state.totalCount = 0;
					var state = this.state;
					result.data.forEach(function(item){
						state.stateMap[item.state] = item;
						state.totalCount += parseInt(item.count);
					});
					state.totalPages = Math.ceil(state.totalCount/5);
					state.config.pipeline_meta[currentUser.role].forEach(function(item, index){
						var stage = jQuery.extend(true, {}, item);
						if(state.stateMap[item.name]){
							stage.count = state.stateMap[item.name].count;     
							state.pipeline.push(stage);	
						}
					});
					this.fetchApplications();
				}.bind(this),
				error:function (xhr, status, err) {
					console.error('err' + JSON.stringify(err));
				}.bind(this)
			});    
  }, 
  fetchApplications: function(pageNumber) {
  			var start;
			if(pageNumber == undefined){
				this.state.lastPage = 1;
				start = 0;
				this.state.applications = [];
			} else {
				start = pageNumber * 5;
			}

			var stateName = this.state.pipeline[this.state.selectedPipelineIndex] ? this.state.pipeline[this.state.selectedPipelineIndex].name : 'unknown';
			var viewName = this.state.topLevelViews[this.state.selectedTopLevelViewIndex];
			var query_data = {
					offset: start,
					count: 5,
					all: (viewName === "Mine" ? 0 : 1),
					state: stateName === "allActive" ? '' : stateName,
					search_key: this.state.filters.searchString,
					city: this.state.filters.citySearchText,
					startDate: this.state.filters.startDate,
					endDate: this.state.filters.endDate,
					anchors: JSON.stringify(this.state.filters.anchorsSelected)
				};
			$.ajax({
				url: applications_url,
				type: 'GET',
				headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('indifi.token') },
				data: query_data, 
				success: function(data) {
					//console.log(JSON.stringify(data));
					this.setState({applications: data.data, existingApplication: true, newApplication:false});
				}.bind(this), 
				error: function (xhr, status, err) {
					console.log('err' + JSON.stringify(err));
				}.bind(this)
			});
  },
  componentDidMount: function() {
  	//this.fetchPipelineData();
  	//this.fetchApplications();
  	this.fetchAnchors();
  }, 
  fetchNextApplications: function() {
  	var pageNumber = this.state.lastPage + 1;
  	if (pageNumber <= this.state.totalPages  ) {
  	this.fetchApplications(pageNumber -1) ;
  	this.setState({lastPage:this.state.lastPage + 1});
  }
  }, 
  fetchPrevApplications: function() {
  	var pageNumber = this.state.lastPage - 1;
  	if (pageNumber > 0) {
  	this.fetchApplications(pageNumber - 1) ;
  	this.setState({lastPage:this.state.lastPage - 1});
  	} 
  }, 
  fetchAnchors: function() {
  	$.ajax({
		url: anchors_url,
		type: 'GET',
		headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('indifi.token') },
		success: function(data) {
			//console.log(JSON.stringify(data));
			this.setState({anchors: data.data});

		}.bind(this), 
		error: function (xhr, status, err) {
			//console.log('err' + JSON.stringify(err));
		}.bind(this)
	});
  }, 
  onClickNewApplication: function() {
  	this.setState({newApplication: true, existingApplication:false});
  }, 

  fetchApplicationsWithInterview: function () {
  	$.ajax({
				url: apiEndpoint + '/loan_interview_response/application/all',
				type: 'GET',
				headers: { 'Authorization' : 'Bearer ' + localStorage.getItem('indifi.token') },
				success: function(data) {
					var map = {};
					for (var i in data.data) {
						var applicationId = data.data[i].application_id;
						map[applicationId] = true;
					}
					this.setState({applicationsWithInterview: map});
				}.bind(this), 
				error: function (xhr, status, err) {
					console.error('err' + JSON.stringify(err));
				}.bind(this)
			});
  }

});