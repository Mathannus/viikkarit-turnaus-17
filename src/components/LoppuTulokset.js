import React, {Component} from 'react';
import Logo from './Logo';
import {joukkueApi} from '../JoukkueApi';
//import OtteluApi from '../OtteluApi';
import './css/LoppuTulokset.css';


const LOPPUTULOKSET = [
{nimi:'Jokerit',logo: 'Jok S', pisteet:'6',sija: '1'},
{nimi:'Lapuan Virkiä',logo: 'Vir J', pisteet:'10',sija: '3'},
{nimi:'Hämeenlinnan Pallokerho',logo: 'HPK V', pisteet:'10',sija: '2'},

{nimi:'Pelicans',logo: 'Pel T', pisteet:'13',sija: '4'},
{nimi:'Kiekko-Vantaa',logo: 'KiVa H', pisteet:'18',sija: '5'},
{nimi:'Vuosaaren Viikingit' ,logo: 'Viik H',pisteet:'20',sija: '6'},
{nimi:'Imatran Ketterä',logo: 'Ket V', pisteet:'23',sija: '7'},
{nimi:'KJT',logo: 'KJT W', pisteet:'23',sija: '7'}
];

class LoppuTulokset extends Component {

  constructor(props) {
    super(props);

    this.state = {joukkueet: [], seurat: []};
  }
/*
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
*/
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

    return LOPPUTULOKSET.sort((a,b) => (a.pisteet - b.pisteet)).map((seura,index) => (
      <tr key={index}>
        <td>{seura.sija}</td>
        <td><Logo joukkue={joukkueApi.getJoukkue(seura.logo)}/></td>
        <td>{seura.nimi}</td>
        <td>{seura.pisteet}</td>
      </tr>
    ));

    /*

    return this.state.seurat.map((seura,index) => (
      <tr key={index}>
        <td>{index}</td>
        <td>{seura.nimi}</td>
        <td>{this.calculateSeuraPisteet(seura.joukkueet)}</td>
      </tr>
    ));

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

        <table className="table">
          <thead>
          <tr>
            <th>Sija</th>
            <th></th>
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
