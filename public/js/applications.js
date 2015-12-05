var Applications = React.createClass({

	render: function () {
		var anchors = this.props.anchors;
		var applicationsWithInterview = this.props.applicationsWithInterview;
		var applicationNodes = this.props.applications.map(function(application) {
		var application = setAnchorId(application, anchors);
			application.hasResponse = false;
			if (applicationsWithInterview[application.id]) {
				application.hasResponse = true;
			}
        return <Application key={application.id} application={application} ></Application>
      	
    });
		return (
				<table width="100%" cellspacing="0" cellpadding="0">
				  <thead>
				    <th>Borrower Name</th>
				    <th>Source</th>
				    <th>Loan Amount</th>
				    <th>Duration</th>
				    <th>Received</th>
				    <th>Response Exists</th>
				  </thead>
				  <tbody>
				    {applicationNodes}
				  </tbody>
				</table>
			);
	}

});

function setAnchorId(application, anchors) {
	for (var i in anchors) {
		if (anchors[i].name == application.source) {
			application.anchor_id = anchors[i].id;
			break;
		} 
	}
	return application;
}

