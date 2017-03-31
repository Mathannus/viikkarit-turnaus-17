import React, {Component} from 'react';
import logo from './Viikingit_merkki_teksti_rgb_90.png';
import logoWoodberg from './viikingit_woodberg_turnaus_logo.png';


class Main extends Component {

  render() {
    console.log('main.render');
    return (
      <div className="App">
        <div className="App-header">
        <div className="col-xs-8">
        <img src={logoWoodberg} className="App-logo-woodberg" alt="logo" />
          <h2>2.4.2017</h2>
        </div>
        <div className="col-xs-4 pull-right">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        </div>
          {this.props.children}
      </div>
    );
  }
}


export default Main;
