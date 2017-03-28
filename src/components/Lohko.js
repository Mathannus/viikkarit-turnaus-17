import React,{Component} from 'react';
import LohkoTaulukko from './LohkoTaulukko';
import OtteluTaulukko from './OtteluTaulukko';
import OtteluApi from '../OtteluApi';
import Joukkueet from '../joukkueet.json';


class Lohko extends Component {

  constructor(props) {
    super(props);
    this.state = {ottelut: []};
  }

getJoukkeet(lohko) {
    return Joukkueet['joukkueet'].filter(joukkue => joukkue.lohko === lohko);
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
  console.log(this.props);
    const lohkoId = this.props.tunniste.toUpperCase(),
          joukkueet = this.getJoukkeet(lohkoId);

    console.log('joukkueet: ',joukkueet);

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
