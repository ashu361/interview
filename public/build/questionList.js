var QuestionList = React.createClass({
  displayName: 'QuestionList',

  render: function () {
    var handleChange = this.handleChange;
    var handleApplicationChange = this.handleApplicationChange;
    var props = this.props;
    var state = this.state;
    var handleRadioChange = this.handleRadioChange;
    var handleEnterPressed = this.handleEnterPressed;
    var appQuestionNodes = [];
    var newApplicationQuestions = this.props.new_application_interview;
    var applicationCreated = this.props.applicationCreated;

    var appQuestionNodes = newApplicationQuestions.map(function (question) {
      var model = question.model,
          question_id = question.id;
      return React.createElement(Question, { key: 'app' + question_id, question: question, value: props.application_response[model] ? props.application_response[model] : '', onChange: handleApplicationChange, disabled: applicationCreated, onEnterPressed: handleEnterPressed, onRadioChange: handleChange });
    });

    var activeQuestions = flatInterview(props.interview, state.response);
    var questionNodes = activeQuestions.map(function (question) {
      var question_id = question.id;
      return React.createElement(Question, { key: question_id, question: question, value: props.response[question_id] ? props.response[question_id] : '', onChange: handleChange, onRadioChange: handleRadioChange, onEnterPressed: handleEnterPressed });
    });
    return React.createElement(
      'ol',
      { id: 'questionare', className: 'fs-fields' },
      appQuestionNodes.concat(questionNodes)
    );
  },
  getInitialState: function () {
    return { response: this.props.response, application_response: this.props.applicationResponse };
  },
  componentWillReceiveProps: function (props) {
    this.setState({ response: props.response, application_response: props.application_response });
  },
  handleChange: function (id, value) {
    this.state.response[id] = value, this.props.onChange(id, value);
  },
  handleApplicationChange: function (model, value) {
    this.state.application_response[model] = value, this.props.onApplicationChange(model, value);
  },

  handleRadioChange: function (id, value) {
    this.state.response[id] = value;
    this.props.onRadioChange(id, value);
  },
  handleEnterPressed: function () {
    this.props.onEnterPressed();
  }
});