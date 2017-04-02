import React, { Component } from 'react';
import Logo from './Logo';
import OtteluApi from '../OtteluApi';
import OtteluTaulukko from './OtteluTaulukko';
import {joukkueApi} from '../JoukkueApi';
//import './css/Joukkue.css';

class Joukkue extends Component {

  constructor(props) {
    super(props);
    this.joukkueTunnus = decodeURI(props.tunnus);
    console.log(this.joukkueTunnus);
    const joukkue = joukkueApi.getJoukkue(this.joukkueTunnus);

    this.state = {joukkue: joukkue, ottelut: []};
  }


  componentDidMount() {
    console.log(this.state.joukkue.tunniste);
    OtteluApi.getOttelut(['pelatut','lohko', this.state.joukkue.lohko],(data) => {
      console.log(data, ' is array ', Array.isArray(data));
      this.setState({ottelut: [...data]});
    });
  }

  getJoukkueOttelut() {
    const jTunniste = this.state.joukkue.tunniste;
    return this.state.ottelut.filter((ottelu) => (ottelu.koti === jTunniste || ottelu.vieras === jTunniste));
  }

  getTehdytMaalit(){
    const jTunniste = this.state.joukkue.tunniste;
    const tehdyt = this.getJoukkueOttelut().reduce((acc,ottelu) =>{
      acc += (ottelu.koti === jTunniste) ? ottelu.tulos[0] : ottelu.tulos[1];
      return acc;
    },0);
    return tehdyt;
  }

  getPaastetytMaalit() {
    const jTunniste = this.state.joukkue.tunniste;
    const maalit = this.getJoukkueOttelut().reduce((acc,ottelu) =>{
      acc += (ottelu.koti === jTunniste) ? ottelu.tulos[1] : ottelu.tulos[0];
      return acc;
    },0);
    return maalit;

  }

  render() {
    const joukkue = this.state.joukkue;
    return (
      <div className="Joukkue">
        <div className="col-xs-12 col-sm-6">
          <h3><Logo joukkue={joukkue}/> {joukkue.nimi} </h3>
          <dl className="dl-horizontal">
            <dt>tunniste</dt>
            <dd>{joukkue.tunniste}</dd>
            <dt>lohko</dt>
            <dd>{joukkue.lohko}</dd>
            <dt>pisteet</dt>
            <dd>{joukkueApi.calculateJoukkuePisteet(joukkue.tunniste, this.state.ottelut) || '-'}</dd>
            <dt>ranking</dt>
            <dd>{joukkueApi.calculateJoukkueRankings(joukkue.tunniste, this.state.ottelut) || '-'}</dd>
            <dt>Tehdyt maalit</dt>
            <dd>{this.getTehdytMaalit() || '-'}</dd>
            <dt>Päästetyt maalit</dt>
            <dd>{this.getPaastetytMaalit() || '-'}</dd>
          </dl>
        </div>
        <div className="col-xs-12 col-sm-6">
          <h3>Pelatut ottelut: </h3>
          <OtteluTaulukko ottelut={this.getJoukkueOttelut()} />
        </div>
      </div>
    )
  }
}

export default Joukkue;
