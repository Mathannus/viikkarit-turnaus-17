import React, {Component} from 'react';
import logo from './Viikingit_merkki_teksti_rgb_90.png';


class Main extends Component {

  render() {
    console.log('main.render');
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Kotiturnaus 2.4.2017</h2>
        </div>
          {this.props.children}
      </div>
    );
  }
}


export default Main;
