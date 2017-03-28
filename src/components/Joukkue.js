import React, { Component } from 'react';
import Logo from './Logo';
import Joukkueet from '../joukkueet.json';
import OtteluApi from '../OtteluApi';
import OtteluTaulukko from './OtteluTaulukko';

//import './css/Joukkue.css';

class Joukkue extends Component {

  constructor(props) {
    super(props);
    this.joukkueTunnus = decodeURI(props.tunnus);
    console.log(this.joukkueTunnus);
    const joukkue = Joukkueet.joukkueet.find(joukkue => joukkue.tunniste.toLowerCase() === this.joukkueTunnus.toLowerCase());

    this.state = {joukkue: joukkue, ottelut: []};
  }


  componentDidMount() {
    console.log(this.state.joukkue.tunniste);
    OtteluApi.getOttelut(['pelatut','joukkue', this.state.joukkue.tunniste],(data) => {
//      console.log(data);
      console.log(data, ' is array ', Array.isArray(data));
      this.setState({ottelut: [...data]});
    });
  }

  calculatePoints() {
    if(this.state.ottelut.length === 0) return "-";
    const points = this.state.ottelut.reduce((acc, ottelu) => {
      console.log(ottelu);
      if(ottelu.koti === this.state.joukkue.tunniste && ottelu.tulos[0] > ottelu.tulos[1]) {
        return acc + 2;
      } else if(ottelu.vieras === this.state.joukkue.tunniste && ottelu.tulos[0] < ottelu.tulos[1]) {
        return acc + 2;
      } else if (ottelu.tulos[0] === ottelu.tulos[1]) {
        return acc + 1;
      }
      return acc + 0;
    },0);

    console.log(points);

    return points;
  }

  render() {
    const joukkue = this.state.joukkue;
    return (
      <div className="Joukkue">
        <h3><Logo joukkue={joukkue}/> {joukkue.nimi} </h3>
        <dl className="dl-horizontal">
          <dt>tunniste</dt>
          <dd>{joukkue.tunniste}</dd>
          <dt>lohko</dt>
          <dd>{joukkue.lohko}</dd>
          <dt>pisteet</dt>
          <dd>{this.calculatePoints() || '-'}</dd>
          <dt>ranking</dt>
          <dd>{joukkue.ranking || '-'}</dd>
        </dl>
        <h3>Pelatut ottelut: </h3>
        <OtteluTaulukko ottelut={this.state.ottelut} />
      </div>
    )
  }
}

export default Joukkue;
