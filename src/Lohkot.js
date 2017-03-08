import React, { Component } from 'react';
import './css/Lohkot.css';
import LohkoJako from './lohkojako.json';
import Lohko from './Lohko';

class Lohkot extends Component {

  render() {
    return (
      <div className="Lohkot">
      <h3>Lohkot</h3>
      <div className="Lohkot-taulut">
        <Lohko name="Lohko A" joukkueet={LohkoJako["lohko-a"]} />
        <Lohko name="Lohko B" joukkueet={LohkoJako["lohko-b"]} />
        <Lohko name="Lohko C" joukkueet={LohkoJako["lohko-c"]} />
        <Lohko name="Lohko D" joukkueet={LohkoJako["lohko-d"]} />
      </div>
      </div>
    )
  }
}

export default Lohkot;
