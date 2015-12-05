var Anchors = React.createClass({

	render: function () {
		var anchorNodes = this.props.anchors.map(function(anchor) {
      
    return (
        <Anchor key={anchor.id} anchor={anchor} ></Anchor>
      	);
    });
		return (
				<table width="100%" cellspacing="0" cellpadding="0">
				  <thead>
				    <th>Anchor Name</th>
				  </thead>
				  <tbody>
				    {anchorNodes}
				  </tbody>
				</table>
			);
	}

});

var Anchor  = React.createClass({

	render: function () {
		var anchor  = this.props.anchor;
		return (
			<tr className="odd" onClick={function() {
				ReactDOM.render(
  				<QuestionForm interview_url={apiEndpoint +"/loan_interview"} response_url={apiEndpoint + "/loan_interview_response"} anchor={anchor} anchor_id = {anchor.id}  />,
  				document.getElementById('container')
				)
			}}>
		      <td>{anchor.name}</td>
		    </tr>	
		);
	}
});