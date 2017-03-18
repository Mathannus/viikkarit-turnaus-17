import React, { Component } from 'react';
import Kaukalot from './Kaukalot';
import Lohkot from './Lohkot';
import jQuery from 'jquery';

//import OtteluOhjelma from './otteluohjelma.json';
//import logo from './logo.svg';
import './css/App.css';

//const appViews = ['kaukalot', 'joukkue', 'lohkot'];

class App extends Component {

  constructor(props) {
      super(props);

      this.viewName = props.view;

      this.state = {
        otteluohjelma: {},
        admin: props.admin || false
      };
  }

  getNextComponent(viewName = '') {
    let nextComponent = null;
    switch(viewName) {
      case 'viikkarit-h':
        nextComponent = <div className="Content"><h1>Viikkarit Hettarit</h1></div>
        break;
      case 'lohkot':
          nextComponent = <Lohkot />
          break;
      case 'kaukalot':
      default:
      console.log('Creating kaukalo with otteluohjelma',this.state.otteluohjelma);
      nextComponent =
      <Kaukalot ottelut={this.state.otteluohjelma}/>

    }

    return nextComponent;
  }

  componentDidMount() {
    jQuery.getJSON('http://localhost/tulospalvelu/ottelut').done((data) => {
      console.log("got data from server",data);
      this.setState({otteluohjelma: data});
    });


    const nextComponent = this.getNextComponent(this.viewName);
    this.setState({nextComponent : nextComponent});
  }


  render() {
    console.log("App.render");
    let component = this.getNextComponent(this.viewName);
    return (
        <div>
          {component}
        </div>
    );
  }
}

export default App;
