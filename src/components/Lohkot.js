import React, { Component } from 'react';
import './css/Lohkot.css';
import Joukkueet from '../joukkueet.json';
import LohkoTaulukko from './LohkoTaulukko';

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
        <LohkoTaulukko name="Lohko A" joukkueet={this.getJoukkeet("A")} />
        <LohkoTaulukko name="Lohko B" joukkueet={this.getJoukkeet("B")} />
        <LohkoTaulukko name="Lohko C" joukkueet={this.getJoukkeet("C")} />
        <LohkoTaulukko name="Lohko D" joukkueet={this.getJoukkeet("D")} />
      </div>
      </div>
    )
  }
}

export default Lohkot;
