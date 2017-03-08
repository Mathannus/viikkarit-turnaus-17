import React, { Component } from 'react';
import OtteluTaulukko from './OtteluTaulukko';
import './css/Kaukalo.css';

class Kaukalo extends Component {

  render() {
    return (
      <div className="Kaukalo">
        <h3> {this.props.title} </h3>
        <OtteluTaulukko name={this.props.name} />
      </div>
    )
  }
}

export default Kaukalo;
