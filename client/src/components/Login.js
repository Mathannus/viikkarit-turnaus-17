import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Auth from '../Auth'


class Login extends Component {

  constructor(props) {
    super(props);

//    this.serverUrl = props.serverUrl || 'http://localhost/tulospalvelu';
    this.serverUrl = process.env.REACT_APP_API_SERVER_HOST;
    console.log(this.serverUrl);
    this.state = {
      name: "",
      password: "",
      redirectToReferrer: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.authenticationSuccessful = this.authenticationSuccessful.bind(this);
  }

  onInputChange(evt) {
    const target = evt.target,
      value = target.value,
      name = target.name;

      this.setState({[name]: value});
  }

  authenticationSuccessful() {
    this.setState({redirectToReferrer: true});
  }

  authenticationFailed(message) {
    alert(message);
  }

  doLogin() {
    const name = this.state.name,
    password = this.state.password;
    Auth.authenticate(name,password,this.authenticationSuccessful, this.authenticationFailed);
  }

  render = () => {

    console.log(this.props);
    const { from } = this.props.location || { from: { pathname: '/admin/ottelut' } }
    const { redirectToReferrer } = this.state;

//    console.log("redirectToReferrer:",redirectToReferrer);
    console.log(from);
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }


    return (
      <div className="Login">
        <h3>Please login: </h3>
        <input name="name" onChange={this.onInputChange} value={this.state.name} type="text" />
        <input name="password" onChange={this.onInputChange} value={this.state.password} type="password" />
        <button className="btn-login" onClick={this.doLogin}>Kirjaudu sisään</button>
      </div>
    )
  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
/*
    if (nextProps.signin.email !== undefined) {
      SignInStorage.storeSignin(nextProps.signin.credentials);
      this.context.router.push(this.props.nextPathname);
    }
*/
  }
}
  Login.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

export default Login;
