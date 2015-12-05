var Application = React.createClass({

	render: function () {
		var application = this.props.application;

		var createdDate = new Date(application.created.toString());
		return (
			<tr className="odd" onClick={function() {
				ReactDOM.render(
  				<QuestionForm interview_url={apiEndpoint +"/loan_interview"} response_url={apiEndpoint + "/loan_interview_response"} application_id={application.id} anchor_id={application.anchor_id} />,
  				document.getElementById('container')
				)
			}}>
		      <td>{application.borrowerName}</td>
		      <td>{application.source}</td>
		      <td>{application.amount}</td>
		      <td>{(application.duration ? application.duration: '') + ' Months'}</td>
		      <td>{createdDate.toString()}</td>
		      <td>{application.hasResponse.toString()}</td>
			</tr>	
		);
	}
});