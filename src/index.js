import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Kaukalot from './Kaukalot';
import Login from './Login';
import Lohkot from './Lohkot';
import Main from './Main';
import OtteluOhjelma from './otteluohjelma.json';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './css/index.css';


function isLoggedIn() {
  return localStorage.getItem('jwtToken') !== null;
}

function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({
      pathname: '/admin/login'
    })
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
   <Route component={Main} >
    <IndexRoute component={App}/>
     <Route path="/" component={App}/>
     <Route path="/kaukalo/:name" component={
       (props) => <Kaukalot name={props.params.name} ottelut={OtteluOhjelma}/>
     }/>
     <Route path="/lohkot" component={Lohkot}/>
     <Route path="/joukkue/:tunnus" component={(props) => <App view="joukkue" joukkueTunnus={props.params.tunnus} />}/>
     <Route path="/admin/login" component={Login}/>
     <Route path="/admin/ottelut" component={(props) => <App admin={true} view="kaukalot" />} onEnter={requireAuth}/>
     </Route>
 </Router>
 ),
  document.getElementById('root')
);
