import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth from './Auth';
import Kaukalot from './Kaukalot';
import Login from './Login';
import Lohko from './Lohko';
import Lohkot from './Lohkot';
import Main from './Main';
import OtteluOhjelma from './otteluohjelma.json';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import './css/index.css';

console.log(Auth);
/*
function requireAuth(nextState, replace) {
  if (!Auth.isLoggedIn()) {
    replace({
      pathname: '/admin/login'
    })
  }
}
*/
const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isLoggedIn() ? (
        React.createElement(component, props)
      ) : (
      <Redirect to={{
        pathname: '/admin/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Admin = () => <App admin={true} view="kaukalot" />;

ReactDOM.render(
//  <AuthExample />

  (
//  <Router history={browserHistory}>
  <Router>
    <div>
    <Main/>
     <Route exact path="/" component={App}/>
     <Route path="/kaukalo/:name" component={
       (props) => <Kaukalot name={props.params.name} ottelut={OtteluOhjelma}/>
     }/>
     <Route path="/lohkot" component={Lohkot}/>
     <Route path="/lohko/:tunniste" render={ props => (<Lohko tunniste={props.match.params.tunniste} />)}/>
     <Route path="/joukkue/:tunnus" component={(props) => <App view="joukkue" joukkueTunnus={props.params.tunnus} />}/>
     <Route path="/admin/login" component={(props) =><Login auth={Auth}/>}/>
     <PrivateRoute path="/admin/ottelut" component={Admin}/>
  </div>
 </Router>
 )
 ,
  document.getElementById('root')
);
