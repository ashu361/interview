var QuestionForm = React.createClass({
  loadNewApplicationInterviewFromServer: function() {
    $.ajax({
      url: this.props.interview_url + '/anchor/'+ this.props.anchor_id +'/type/new_application',
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({new_application_interview: data.data.interview});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  saveBeforeNextQuestion: function  () {
    var no_application_questions = this.state.new_application_interview.length;
    if (no_application_questions > (currentNumber + 1)) {
      //console.log('Dont save');
      return;
    } else if ((no_application_questions == (currentNumber + 1)) && !this.state.applicationCreated) {
      this.createNewApplication();
      this.setState({applicationCreated: true});

    } else {
      this.handleFormSubmit();
    }
  },
  loadInterviewFromServer: function() {
        $.ajax({
      url: this.props.interview_url + '/anchor/'+ this.props.anchor_id +'/type/genric',
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({interview_id : data.data.interview_id})
        this.setState({interview: data.data.interview});
        if (this.state.application_id) {
          this.loadResponseByApplicationId(this.state.application_id);
        } else {
        addStyle();
        }
        var saveBeforeNextQuestion = this.saveBeforeNextQuestion;
        var no_application_questions = this.state.new_application_interview.length;
        $("#continue-button").bind("click", function () {
            saveBeforeNextQuestion();
        });
        document.addEventListener( 'keyup', function( ev ) {
          if( ev.target.tagName.toLowerCase() !== 'textarea' ) {
            var keyCode = ev.keyCode || ev.which;
            if( keyCode === 13 ) {
              ev.preventDefault();
              saveBeforeNextQuestion();
            }
          }
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  /*loadResponseFromServer: function() {
    $.ajax({
      url: this.props.url +'/response/'+ this.props.response_id,
      dataType: 'json',
      cache: false,
      type:'GET',
      success: function(data) {
        this.setState({response: data.data.response});
        addStyle();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },*/
  loadResponseByApplicationId: function(application_id) {
      $.ajax({
      url: this.props.response_url +'/application/' + application_id,
      dataType: 'json',
      cache: false,
      type:'GET',
      success: function(data) {
        if(data.data && data.data.response)
        this.setState({response: data.data.response, response_id: data.data.id});
        addStyle();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  
  createNewApplication : function() {
    if (this.props.anchor.name == 'Shopclues' | this.props.anchor.name == 'TBO' ) {
      this.createShopCluesTboApplication();
    } else {
      this.createDefaultNewApplication();
    }
  },
  createShopCluesTboApplication : function() {
    
    var application_response = this.state.application_response; 
    var business_entity_data = 
    { 'name': application_response['name'],
      'primary_contact': {
        'first_name': application_response['primary_contact.first_name'],
        'last_name': application_response['primary_contact.last_name'],
        'phone1': application_response['primary_contact.phone1'],
        'email': application_response['primary_contact.email']
        
      },
      'primary_address': {
        'city': application_response['primary_address.city']
      },
      'details': {
        'merchant_id': application_response['merchant_id']
      }
    }
    $.ajax({
      url:  business_entity_url.replace(':type', 'business'),
      contentType: "application/json; charset=utf-8",
      type:  'POST', 
      data: JSON.stringify(business_entity_data),
      success: function(business_entity) {
       var application = {
              'state': 'new',
              'amount':application_response['amount'] ,
              'duration': null,
              'interestRate': null,
              'borrower_id': business_entity.data.id,
              'anchorId': this.props.anchor.id ? this.props.anchor.id : null
        }
      $.ajax({
      url: applications_url ,
      contentType: "application/json; charset=utf-8",
      type: 'POST', 
      data: JSON.stringify(application),
      success: function(data) {
        
        this.setState({application_id:data.data.id });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  createDefaultNewApplication: function() {
   
    var application_response = this.state.application_response; 
    var business_entity_data = 
    { 'name': application_response['name'],
      'kyc': {
              'pan_id': application_response['kyc.pan_id']
      },
      'primary_contact': {
        'first_name': application_response['primary_contact.first_name'],
        'last_name': application_response['primary_contact.last_name'],
        'phone1': application_response['primary_contact.phone1'],
        'email': application_response['primary_contact.email']
        
      },
      'details': {
        'industry': application_response['details.industry']
      }
    }
    $.ajax({
      url:  business_entity_url.replace(':type', 'business'),
      contentType: "application/json; charset=utf-8",
      type:  'POST', 
      data: JSON.stringify(business_entity_data),
      success: function(business_entity) {
       var application = {
              'state': 'new',
              'amount':application_response['amount'] ,
              'duration': null,
              'interestRate': null,
              'borrower_id': business_entity.data.id,
              'anchorId': this.props.anchor.id ? this.props.anchor.id : null
        }
      $.ajax({
      url: applications_url ,
      contentType: "application/json; charset=utf-8",
      type: 'POST', 
      data: JSON.stringify(application),
      success: function(data) {
        
        this.setState({application_id:data.data.id });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }, 

  handleFormSubmit: function(e) {
    var response_data = {
      response: this.state.response, 
      application_id: this.state.application_id ? this.state.application_id : null,
      interview_id: this.state.interview_id
    }
    if (e !== undefined) {
      e.preventDefault();
    }
    var url =  this.props.response_url  +'/' + (this.state.response_id ? this.state.response_id : '' )
    
    $.ajax({
      url: url ,
      contentType: "application/json; charset=utf-8",
      type: this.state.response_id ? 'PUT' : 'POST', 
      data: JSON.stringify(response_data),
      success: function(data) {
        this.setState({response: data.data.response});
        this.setState({response_id:data.data.id})
       
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleSendClicked: function(e) {
    e.preventDefault();
    this.handleFormSubmit();
    ReactDOM.render(<div> Form Submitted </div>, document.getElementById('container'))
  },
  handleChange: function(id, value) {
    this.state.response[id] = value;
  }, 
  handleApplicationChange: function(model, value) {
    this.state.application_response[model] = value
  },
  handleRadioChange: function(id, value) {
    this.state.response[id] = value;
    this.handleFormSubmit();
  },
  handleEnterPressed: function(e) {
   // console.log('total' + this.state.new_application_interview.length);
   // console.log('onEnterPressed' + currentNumber);
  },
  getInitialState: function() {
    return {
      interview: [],
      response: {}, 
      application_response: {},
      id : this.props.id,
      new_application_interview: [], 
      applicationCreated: false, 
      application_id:this.props.application_id
    };
  },
  componentDidMount: function() {
   if(!this.state.application_id) { 
   this.loadNewApplicationInterviewFromServer();
   } 
   this.loadInterviewFromServer();
   /* if (this.props.response_id) {
      this.loadResponseFromServer();
    }*/
    //setInterval(this.handleFormSubmit, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="fs-form-wrap" id="fs-form-wrap">
        <div className="fs-title">
          <h1>OLA Partner Interview</h1>
        </div>
      <form id="myform" className="fs-form fs-form-full" autoComplete="off" >
        <QuestionList new_application_interview={this.state.new_application_interview} interview={this.state.interview}
        response={this.state.response} application_response={this.state.application_response} 
        applicationCreated={this.state.applicationCreated} onChange={this.handleChange}
        onApplicationChange={this.handleApplicationChange}  onRadioChange={this.handleRadioChange} 
        onEnterPressed={this.handleEnterPressed}/>
        <button className="fs-submit" onClick={this.handleSendClicked}>Send Information</button>
      </form>
    </div>  
  );
  }
});

/*ReactDOM.render(
  <QuestionForm url="http://localhost:3002/interview/"pollInterval={10000} />,
  document.getElementById('container')
);*/
