import React, {Component} from 'react';
import {joukkueApi} from '../JoukkueApi';
import OtteluApi from '../OtteluApi';

class LoppuTulokset extends Component {

  constructor(props) {
    super(props);

    this.state = {joukkueet: [], seurat: []};
  }

  componentDidMount() {
//    const joukkueet = joukkueApi.getJoukkueet();
//    this.setState({joukkueet: joukkueet});

    ['A','B','C','D'].map((lohko) =>{
      OtteluApi.getOttelut(['pelatut','lohko',lohko],(data) => {
        const joukkueet = joukkueApi.getJoukkueet(lohko).map((joukkue) => {
          const ranking = joukkueApi.calculateJoukkueRankings(joukkue.tunniste, data);
          const newJoukkue = Object.assign({},joukkue, {ranking: ranking});
          return newJoukkue;
        });

        joukkueet.forEach((joukkue) => {
          const seurat = this.state.seurat;

          const index = seurat.findIndex((seura) => (seura.nimi === joukkue.seura));


          if(index >= 0) {
            const seura = seurat[index];
            seurat[index] = Object.assign({}, seura, {joukkueet: [joukkue, ...seura.joukkueet]});
          } else {
            seurat.push({nimi: joukkue.seura, joukkueet: [joukkue]});
          }
          this.setState({seurat: seurat});
        });
        this.setState({joukkueet: [{lohko: lohko, joukkueet: joukkueet}, ...this.state.joukkueet]});
      });
    });
  }

  calculateSeuraPisteet(joukkueet) {
    const joukkueMaara = joukkueet.length;
    const seuraPisteet = joukkueet.reduce((acc, joukkue,index) =>{
      acc += (index < (joukkueMaara - 1)) ? joukkue.ranking :
        (joukkueMaara === 3) ? joukkue.ranking * 2 :
        joukkue.ranking * 3;

        return acc;
    },0);

    console.log(seuraPisteet);
    return seuraPisteet;
  }


  generateTableBody(){


    return this.state.seurat.map((seura,index) => (
      <tr key={index}>
        <td>{index}</td>
        <td>{seura.nimi}</td>
        <td>{this.calculateSeuraPisteet(seura.joukkueet)}</td>
      </tr>
    ));

/*
    return this.state.joukkueet.map((lohko,index) => {
      console.log(lohko);
        return lohko.joukkueet.map((joukkue, index) =>(
          <tr key={index}>
            <td>{joukkue.ranking}</td>
            <td>{joukkue.pisteet}</td>
            <td>{joukkue.nimi}</td>
            <td>{joukkue.seura}</td>
            <td>{joukkue.lohko}</td>
          </tr>
        ))
    }


    );
    */
  }

  render() {
    console.log(this.state);
    return (
      <div className="loppuTulokset">
        <h3>Lopputulokset: </h3>
        <p>WORK IN PROGRESS. PLEASE COME BACK LATER</p>

        <table className="table">
          <thead>
          <tr>
            <th>Sija</th>
            <th>Seura</th>
            <th>Loppupisteet</th>
          </tr>
          </thead>
          <tbody>
            {this.generateTableBody()}
          </tbody>
        </table>
      </div>
    )
  }
}


export default LoppuTulokset;