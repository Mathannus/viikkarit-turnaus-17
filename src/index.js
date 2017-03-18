import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Main from './Main';
import Kaukalot from './Kaukalot';
import Lohkot from './Lohkot';
import Joukkue from './Joukkue';
import OtteluOhjelma from './otteluohjelma.json';
import jQuery from 'jquery';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './css/index.css';

window.$ = window.jQuery = jQuery;


ReactDOM.render((
  <Router history={browserHistory}>
   <Route component={Main} >
    <IndexRoute component={App}/>
     <Route path="/" component={App}/>
     <Route path="/kaukalo/:name" component={
       (props) => <Kaukalot name={props.params.name} ottelut={OtteluOhjelma}/>
     }/>
     <Route path="/lohkot" component={Lohkot}/>
     <Route path="/joukkue/:tunnus" component={Joukkue}/>
     <Route path="/admin/kaukalo/:name" component={<App admin={true} view="kaukalot" />} />
     </Route>
 </Router>
 ),
  document.getElementById('root')
);
