var Login = React.createClass({
  displayName: 'Login',

  getInitialState: function () {
    return { email: '', password: '' };
  },

  handleEmail: function (event) {
    this.state.email = event.target.value;
  },
  handlePassword: function (event) {
    this.state.password = event.target.value;
  },
  handleFormSubmit: function (e) {
    e.preventDefault();
    // console.log('Loging');
    var login_data = {
      'email': this.state.email,
      'password': this.state.password
    };
    $.ajax({
      url: login_url,
      contentType: "application/json; charset=utf-8",
      cache: false,
      type: 'POST',
      data: JSON.stringify(login_data),
      success: (function (result) {
        // console.log(JSON.stringify(result));
        currentUser = result.data.user;
        window.localStorage.setItem('indifi.token', result.data.token);
        window.localStorage.setItem('user', JSON.stringify(currentUser));
        ReactDOM.render(React.createElement(Home, null), document.getElementById('container'));
        /*ReactDOM.render(
        <QuestionForm url="http://localhost:3002/interview/"pollInterval={10000} />,
        document.getElementById('container')
        );*/
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error('Login error');
      }).bind(this)
    });
  },
  render: function () {
    return React.createElement(
      'div',
      { layout: 'row', 'layout-align': 'center center' },
      React.createElement(
        'div',
        { flex: '30', className: 'form-container mobile-view-centered content-margin' },
        React.createElement(
          'div',
          { 'layout-align': 'start start', className: 'title', 'layout-fill': true },
          React.createElement(
            'h2',
            { className: 'cursor-pointer' },
            'Login'
          )
        ),
        React.createElement(
          'form',
          { id: 'loginForm', onSubmit: this.handleFormSubmit },
          React.createElement(
            'div',
            { className: 'form-element invalid', flex: true },
            React.createElement(
              'div',
              { className: 'placeholder' },
              'Email *'
            ),
            React.createElement('input', { type: 'email', className: 'input', value: this.props.email, required: true, name: 'email', onChange: this.handleEmail })
          ),
          React.createElement(
            'div',
            { className: 'form-element invalid', flex: true },
            React.createElement(
              'div',
              { className: 'placeholder' },
              'Password *'
            ),
            React.createElement('input', { type: 'password', className: 'input', value: this.props.password, required: true, name: 'password', onChange: this.handlePassword })
          ),
          React.createElement(
            'button',
            { className: 'fs-submit', onClick: this.handleFormSubmit },
            'Login'
          )
        )
      )
    );
  }

});