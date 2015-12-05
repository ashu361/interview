var Application = React.createClass({
	displayName: "Application",

	render: function () {
		var application = this.props.application;

		var createdDate = new Date(application.created.toString());
		return React.createElement(
			"tr",
			{ className: "odd", onClick: function () {
					ReactDOM.render(React.createElement(QuestionForm, { interview_url: apiEndpoint + "/loan_interview", response_url: apiEndpoint + "/loan_interview_response", application_id: application.id, anchor_id: application.anchor_id }), document.getElementById('container'));
				} },
			React.createElement(
				"td",
				null,
				application.borrowerName
			),
			React.createElement(
				"td",
				null,
				application.source
			),
			React.createElement(
				"td",
				null,
				application.amount
			),
			React.createElement(
				"td",
				null,
				(application.duration ? application.duration : '') + ' Months'
			),
			React.createElement(
				"td",
				null,
				createdDate.toString()
			),
			React.createElement(
				"td",
				null,
				application.hasResponse.toString()
			)
		);
	}
});