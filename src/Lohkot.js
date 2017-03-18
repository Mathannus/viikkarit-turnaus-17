import React, { Component } from 'react';
import './css/Lohkot.css';
import Joukkueet from './joukkueet.json';
import Lohko from './Lohko';

class Lohkot extends Component {


  constructor(props) {
    super(props);

    this.tunnisteet = Joukkueet['tunnisteet'];
    this.joukkueet = Joukkueet['joukkueet']
  }

  getJoukkeet(lohko) {
    return this.joukkueet.filter(joukkue => joukkue.lohko === lohko);
  }

  render() {
    return (
      <div className="Lohkot">
      <h3>Lohkot</h3>
      <div className="Lohkot-taulut">
        <Lohko name="Lohko A" joukkueet={this.getJoukkeet("A")} />
        <Lohko name="Lohko B" joukkueet={this.getJoukkeet("B")} />
        <Lohko name="Lohko C" joukkueet={this.getJoukkeet("C")} />
        <Lohko name="Lohko D" joukkueet={this.getJoukkeet("D")} />
      </div>
      </div>
    )
  }
}

export default Lohkot;
