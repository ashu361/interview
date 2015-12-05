var Question = React.createClass({
  displayName: 'Question',

  getInitialState: function () {
    return { value: this.props.value };
  },
  // To make value a state property
  componentWillReceiveProps: function (props) {
    this.setState({ value: props.value });
    if (this.props.question.model) {
      this.props.onChange(this.props.question.model, props.value);
    } else {
      this.props.onChange(this.props.question.id, props.value);
    }
  },
  handleChange: function (event) {
    this.value = event.target.value;
    this.setState({ value: event.target.value });
    if (this.props.question.model) {
      this.props.onChange(this.props.question.model, event.target.value);
    } else {
      this.props.onChange(this.props.question.id, event.target.value);
    }
  },
  handleRadioChange: function (event) {
    this.value = event.target.value;
    this.setState({ value: event.target.value });
    this.props.onRadioChange(this.props.question.id, event.target.value);
  },
  handleKeyDown: function (e) {
    if (e.keyCode == 13) {
      console.log('currentNumber before handleEnterPressed ' + currentNumber);
      this.props.onEnterPressed();
    }
  },
  render: function () {
    var question = this.props.question,
        val = this.props.val;
    var type = question.type,
        label = question.label,
        required = !!question.required,
        description = question.description,
        id = question.id,
        descriptionHTML = null,
        labelHTML = React.createElement(
      'label',
      { className: 'fs-field-label fs-anim-upper', htmlFor: 'q' + id },
      label
    );
    if (question.description) {
      descriptionHTML = React.createElement(
        'label',
        { className: 'fs-field-description fs-anim-upper', htmlFor: 'q' + id },
        question.description
      );
    }
    if (question.type == 'String') {
      return React.createElement(
        'li',
        null,
        labelHTML,
        React.createElement('br', null),
        descriptionHTML,
        React.createElement('input', { className: 'fs-anim-lower', id: 'q' + id, name: 'q' + id, type: 'text', value: this.state.value, onChange: this.handleChange, required: required, disabled: this.props.disabled })
      );
    }if (question.type == 'Email') {
      return React.createElement(
        'li',
        null,
        labelHTML,
        React.createElement('br', null),
        descriptionHTML,
        React.createElement('input', { className: 'fs-anim-lower', id: 'q' + id, name: 'q' + id, type: 'email', value: this.state.value, onChange: this.handleChange, required: required, disabled: this.props.disabled })
      );
    } else if (question.type == 'Enum') {
      var optionsHTML = [];
      for (var i in question.Enum) {
        var key = question.Enum[i].key,
            label = question.Enum[i].label,
            checked = key === this.state.value ? "checked" : "";
        optionsHTML.push(React.createElement(
          'span',
          { key: 'q' + id + key },
          React.createElement('input', { id: 'q' + id + key, name: 'q' + id, type: 'radio', value: key, onClick: this.handleRadioChange, checked: checked, disabled: this.props.disabled }),
          React.createElement(
            'label',
            { htmlFor: 'q' + id + key, className: i == 0 ? "radio-conversion" : "radio-social" },
            label
          )
        ));
      }
      return React.createElement(
        'li',
        null,
        labelHTML,
        React.createElement('br', null),
        descriptionHTML,
        React.createElement(
          'div',
          { className: 'fs-radio-group fs-radio-custom clearfix fs-anim-lower' },
          optionsHTML
        )
      );
    } else if (question.type == 'Number') {
      return React.createElement(
        'li',
        null,
        labelHTML,
        React.createElement('br', null),
        descriptionHTML,
        React.createElement('input', { className: 'fs-anim-lower', id: 'q' + id, name: 'q' + id, type: 'number', value: this.state.value, onChange: this.handleChange, required: required, disabled: this.props.disabled })
      );
    } else {
      return React.createElement('div', null);
    }
  }
});