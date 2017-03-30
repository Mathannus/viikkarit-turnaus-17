import React,{Component} from 'react';
import LohkoTaulukko from './LohkoTaulukko';
import OtteluTaulukko from './OtteluTaulukko';
import OtteluApi from '../OtteluApi';
import {joukkueApi} from '../JoukkueApi';


class Lohko extends Component {

  constructor(props) {
    super(props);
    this.state = {ottelut: []};
  }

componentDidMount() {
  OtteluApi.getOttelut(['pelatut','lohko',this.props.tunniste], (ottelut) => {
    this.setState({ottelut: ottelut});
  });

}

getKentta() {
  return this.state.ottelut.length > 0 ? this.state.ottelut[0].kentta : "";
}

render() {
    const lohkoId = this.props.tunniste.toUpperCase(),
          joukkueet = joukkueApi.getJoukkueet(lohkoId).map((joukkue) => {
            joukkue.pisteet = joukkueApi.calculateJoukkuePisteet(joukkue.tunniste, this.state.ottelut);
            joukkue.ranking = joukkueApi.calculateJoukkueRankings(joukkue.tunniste, this.state.ottelut);
            return joukkue;
          }).sort((a,b) => {
            let sortIndex = 0;
            if(a.ranking === 0) {
              sortIndex = 1;
            } else  {
                sortIndex = a.ranking - b.ranking;
            }
            console.log(a,b,sortIndex);
            return sortIndex;
          });

    return (
      <div className="Lohko">
        <LohkoTaulukko name={"Lohko "+lohkoId} joukkueet={joukkueet}/>
        <h3>Pelatut ottelut:</h3>
        <OtteluTaulukko kentta={this.getKentta()} ottelut={this.state.ottelut}/>
      </div>

    );
}

}

export default Lohko
