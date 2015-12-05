var Question = React.createClass({
  getInitialState: function() {
    return {value: this.props.value};
  },
  // To make value a state property
  componentWillReceiveProps: function(props) {
    this.setState({ value : props.value});
    if (this.props.question.model) {
      this.props.onChange(this.props.question.model, props.value);
    } else {
      this.props.onChange(this.props.question.id, props.value);
    }
    
  },
  handleChange: function(event) {
    this.value = event.target.value
    this.setState({value: event.target.value});
    if (this.props.question.model) {
      this.props.onChange(this.props.question.model, event.target.value);
    } else {
      this.props.onChange(this.props.question.id, event.target.value);
    }
  },
 handleRadioChange: function(event) {
    this.value = event.target.value
    this.setState({value: event.target.value});
    this.props.onRadioChange(this.props.question.id, event.target.value);
  },
  handleKeyDown : function(e) {
    if (e.keyCode == 13) {
      console.log('currentNumber before handleEnterPressed ' + currentNumber);
      this.props.onEnterPressed();
    }
  } ,
  render: function() {
    var question = this.props.question, val =this.props.val;
    var type = question.type, 
    label = question.label,
    required = !!question.required,
    description = question.description, 
    id = question.id, 

    descriptionHTML = null,
    labelHTML = <label className="fs-field-label fs-anim-upper" htmlFor={'q'+ id}>{label}</label>;
    if (question.description) {
        descriptionHTML = <label className="fs-field-description fs-anim-upper" htmlFor={'q' + id}>{question.description}</label>;
    }
    if (question.type == 'String') {
     return (
        <li>
        {labelHTML}

        <br/>
        {descriptionHTML}
        <input className="fs-anim-lower" id={'q'+id} name={'q'+id} type="text" value={this.state.value}  onChange={this.handleChange} required={required} disabled={this.props.disabled}  />
        </li>
        )
    } if (question.type == 'Email') {
     return (
        <li>
        {labelHTML}
        <br/>
        {descriptionHTML}
        <input className="fs-anim-lower" id={'q'+id} name={'q'+id} type="email" value={this.state.value}  onChange={this.handleChange} required={required} disabled={this.props.disabled} />
        </li>
        )
    } else if (question.type == 'Enum') {
        var optionsHTML = [];
        for (var i in question.Enum) {
          var key = question.Enum[i].key, 
              label = question.Enum[i].label,
              checked = (key === this.state.value) ? "checked" : "";
          optionsHTML.push(<span key={'q' + id + key}><input  id={'q' + id + key} name={'q' + id} type="radio" value={key} onClick={this.handleRadioChange} checked={checked} disabled={this.props.disabled}/><label htmlFor={'q' + id + key} className={i == 0 ? "radio-conversion": "radio-social"} >{label}</label></span>)
        }
        return (
         <li>
         {labelHTML}
         <br/>
         {descriptionHTML}
         <div className="fs-radio-group fs-radio-custom clearfix fs-anim-lower">
         {optionsHTML}
         </div>
         </li>
         )
    } else if (question.type == 'Number') {
        return (
        <li>
        {labelHTML}
        <br/>
        {descriptionHTML}
        <input className="fs-anim-lower" id={'q'+id} name={'q'+id} type="number" value={this.state.value}  onChange={this.handleChange} required={required} disabled={this.props.disabled} />
        </li>
        )
  } else {
    return (<div></div>);
  }
  

  }
});