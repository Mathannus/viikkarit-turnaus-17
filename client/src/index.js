import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './Auth';
import App from './components/App';
import Joukkue from './components/Joukkue';
import Kaukalo from './components/Kaukalo';
import Login from './components/Login';
import Lohko from './components/Lohko';
import Lohkot from './components/Lohkot';
import LoppuTulokset from './components/LoppuTulokset';
import Main from './components/Main';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import './index.css';

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
  (
  <Router>
    <div className="container-fluid">
    <Main/>
     <Route exact path="/" component={App}/>
     <Route path="/kaukalo/:name" render={
       props => (<Kaukalo name={props.match.params.name}/>)
     }/>
     <Route path="/lohkot" component={Lohkot}/>
     <Route path="/lopputulokset" component={LoppuTulokset}/>
     <Route path="/lohko/:tunniste" render={ props => (<Lohko tunniste={props.match.params.tunniste} />)}/>
     <Route path="/joukkue/:tunnus" render={ props => (<Joukkue tunnus={props.match.params.tunnus}/>)}/>
     <Route path="/admin/login" component={(props) =><Login auth={Auth}/>}/>
     <PrivateRoute path="/admin/ottelut" component={Admin}/>
  </div>
 </Router>
 )
 ,
  document.getElementById('root')
);
