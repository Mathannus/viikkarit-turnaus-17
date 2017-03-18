import React, { Component } from 'react';
import Logo from './Logo';
import Joukkueet from './joukkueet.json';

//import './css/Joukkue.css';

class Joukkue extends Component {

  constructor(props) {
    super(props);
    this.joukkueTunnus = props.tunnus || props.params.tunnus;
    console.log(this.joukkueTunnus);
    this.joukkue = Joukkueet.joukkueet.find(joukkue => joukkue.tunniste.toLowerCase() === this.joukkueTunnus.toLowerCase());

  }



  render() {
    return (
      <div className="Joukkue">
        <h3><Logo joukkue={this.joukkue}/> {this.joukkue.nimi} </h3>
        <dl>
          <dt>tunniste</dt>
          <dd>{this.joukkue.tunniste}</dd>
          <dt>lohko</dt>
          <dd>{this.joukkue.lohko}</dd>
          <dt>pisteet</dt>
          <dd>{this.joukkue.pisteet || '-'}</dd>
          <dt>ranking</dt>
          <dd>{this.joukkue.ranking || '-'}</dd>
        </dl>
      </div>
    )
  }
}

export default Joukkue;
