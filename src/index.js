import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Kaukalo from './Kaukalo';
import Lohkot from './Lohkot';
import { Router, Route, hashHistory } from 'react-router'
import './css/index.css';

ReactDOM.render((
  <Router history={hashHistory}>
   <Route path="/" component={App}/>
   <Route path="/kaukalo" component={Kaukalo}/>
   <Route path="/lohkot" component={Lohkot}/>
 </Router>
 ),
  document.getElementById('root')
);
