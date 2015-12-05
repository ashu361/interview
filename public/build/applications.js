var Applications = React.createClass({
	displayName: "Applications",

	render: function () {
		var anchors = this.props.anchors;
		var applicationsWithInterview = this.props.applicationsWithInterview;
		var applicationNodes = this.props.applications.map(function (application) {
			var application = setAnchorId(application, anchors);
			application.hasResponse = false;
			if (applicationsWithInterview[application.id]) {
				application.hasResponse = true;
			}
			return React.createElement(Application, { key: application.id, application: application });
		});
		return React.createElement(
			"table",
			{ width: "100%", cellspacing: "0", cellpadding: "0" },
			React.createElement(
				"thead",
				null,
				React.createElement(
					"th",
					null,
					"Borrower Name"
				),
				React.createElement(
					"th",
					null,
					"Source"
				),
				React.createElement(
					"th",
					null,
					"Loan Amount"
				),
				React.createElement(
					"th",
					null,
					"Duration"
				),
				React.createElement(
					"th",
					null,
					"Received"
				),
				React.createElement(
					"th",
					null,
					"Response Exists"
				)
			),
			React.createElement(
				"tbody",
				null,
				applicationNodes
			)
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