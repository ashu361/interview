var Login = React.createClass({
  getInitialState: function() {
    return {email: '', password: ''};
  },
  
  handleEmail: function(event) {
    this.state.email = event.target.value
  },
  handlePassword: function(event) {
    this.state.password = event.target.value
  },
  handleFormSubmit : function(e) {
    e.preventDefault();
   // console.log('Loging');
    var login_data = {
      'email' : this.state.email,
      'password': this.state.password
    }
    $.ajax({
      url: login_url,
      contentType: "application/json; charset=utf-8",
      cache: false,
      type: 'POST',
      data: JSON.stringify(login_data),
      success: function (result) {
       // console.log(JSON.stringify(result));
        currentUser = result.data.user; 
        window.localStorage.setItem('indifi.token', result.data.token);
        window.localStorage.setItem('user', JSON.stringify(currentUser));
        ReactDOM.render(
        <Home/>,
        document.getElementById('container')
        );
        /*ReactDOM.render(
        <QuestionForm url="http://localhost:3002/interview/"pollInterval={10000} />,
        document.getElementById('container')
        );*/
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('Login error');
    }.bind(this)   
  });
  },
  render: function() {
    return (
     <div layout="row" layout-align="center center"> 
    <div flex="30" className="form-container mobile-view-centered content-margin">
    <div layout-align="start start" className="title" layout-fill>
      <h2 className="cursor-pointer">Login</h2>
    </div>
    <form id="loginForm" onSubmit={this.handleFormSubmit}>
        <div className="form-element invalid"  flex>
           <div className="placeholder">Email *</div>
           <input type="email" className="input" value={this.props.email} required name="email" onChange={this.handleEmail}></input>
        </div>
        <div className="form-element invalid"  flex>
           <div className="placeholder">Password *</div>
           <input type="password" className="input" value={this.props.password} required name="password" onChange={this.handlePassword}></input>
        </div>
        <button className="fs-submit" onClick={this.handleFormSubmit}>Login</button>    
    </form>
    
  </div>
</div> 
      )
  }
  
});