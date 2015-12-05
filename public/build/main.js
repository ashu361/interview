var apiEndpoint = 'http://localhost:3002';
var anchor_id = "ce093ba0-d413-4a75-ae2c-f9e9b102741d";
var business_entity_url = apiEndpoint + '/business_entity/:type';
var applications_url = apiEndpoint + '/applications';
var login_url = apiEndpoint + '/auth/login';
var applications_summary_url = apiEndpoint + '/applications/summary';
var anchors_url = apiEndpoint + '/anchors';

/*ReactDOM.render(
  <QuestionForm url="http://localhost:3002/interview/"pollInterval={10000} />,
  document.getElementById('container')
);*/

ReactDOM.render(React.createElement(Login, null), document.getElementById('container'));