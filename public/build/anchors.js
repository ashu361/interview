var Anchors = React.createClass({
	displayName: "Anchors",

	render: function () {
		var anchorNodes = this.props.anchors.map(function (anchor) {

			return React.createElement(Anchor, { key: anchor.id, anchor: anchor });
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
					"Anchor Name"
				)
			),
			React.createElement(
				"tbody",
				null,
				anchorNodes
			)
		);
	}

});

var Anchor = React.createClass({
	displayName: "Anchor",

	render: function () {
		var anchor = this.props.anchor;
		return React.createElement(
			"tr",
			{ className: "odd", onClick: function () {
					ReactDOM.render(React.createElement(QuestionForm, { interview_url: apiEndpoint + "/loan_interview", response_url: apiEndpoint + "/loan_interview_response", anchor: anchor, anchor_id: anchor.id }), document.getElementById('container'));
				} },
			React.createElement(
				"td",
				null,
				anchor.name
			)
		);
	}
});