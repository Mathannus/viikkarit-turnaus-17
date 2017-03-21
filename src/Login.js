import React, {Component} from 'react';
import {Redirect} from 'react-router';
import jQuery from 'jquery';


class Kaukalot extends Component {

  constructor(props) {
    super(props);

    this.serverUrl = props.serverUrl || 'http://localhost/tulospalvelu';
    this.state = {
      name: "",
      password: "",
      redirectToReferrer: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  onInputChange(evt) {
    const target = evt.target,
      value = target.value,
      name = target.name;

      this.setState({[name]: value});
  }

  doLogin() {
    const serverUrl = this.serverUrl,
    name = this.state.name,
    password = this.state.password;
    jQuery.ajax({
      url: serverUrl + '/login',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'text',
      data: JSON.stringify({ name: name , password: password } ),
    }).done((data) => {
//      console.log("Got data from server",data);
        localStorage.setItem('jwtToken',data);
        this.setState({redirectToReferrer: true});
      });

  }

  render = () => {

    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;

    console.log("redirectToReferrer:",redirectToReferrer);
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }


    return (
    <div className="Login">
      <input name="name" onChange={this.onInputChange} value={this.state.name} type="text" />
      <input name="password" onChange={this.onInputChange} value={this.state.password} type="password" />
      <button className="btn-login" onClick={this.doLogin}>Kirjaudu sisään</button>
    </div>
  )}
}

export default Kaukalot;
