import React, { Component } from 'react';
import Logo from './Logo';
import OtteluTaulukko from './OtteluTaulukko';
import {JoukkueApi} from '../JoukkueApi';
import {fetchGameData, fetchTeamData} from '../actions'
import {connect} from 'react-redux';

//import './css/Joukkue.css';

class Joukkue extends Component {

  constructor(props) {
    super(props);
    this.joukkueTunnus = decodeURI(props.tunnus);
    console.log(this.joukkueTunnus);
//    const joukkue = joukkueApi.getJoukkue(this.joukkueTunnus);

//    this.state = {joukkue: joukkue, ottelut: []};
  }


  componentDidMount() {
//    console.log(this.state.joukkue.tunniste);
    this.props.fetchTeam(this.joukkueTunnus);
    this.props.fetchAllTeams();
    this.props.fetchGames(['pelatut','joukkue',this.joukkueTunnus]);
/*
this.props.fetchGames(['pelatut','lohko', this.state.joukkue.lohko]);
    OtteluApi.getOttelut(['pelatut','lohko', this.state.joukkue.lohko],(data) => {
      console.log(data, ' is array ', Array.isArray(data));
      this.setState({ottelut: [...data]});
    });
*/
  }

  getJoukkueOttelut() {
    const jTunniste = this.props.joukkue.tunniste;
    const teamGames = this.props.ottelut.filter((ottelu) => (ottelu.koti === jTunniste || ottelu.vieras === jTunniste));

    return teamGames;
  }

  getTehdytMaalit(){
    const jTunniste = this.props.joukkue.tunniste;

    const tehdyt = this.getJoukkueOttelut().reduce((acc,ottelu) =>{
      acc += (ottelu.koti === jTunniste) ? ottelu.tulos[0] : ottelu.tulos[1];
      return acc;
    },0);
    return tehdyt;
  }

  getPaastetytMaalit() {
    const jTunniste = this.props.joukkue.tunniste;
    const maalit = this.getJoukkueOttelut().reduce((acc,ottelu) =>{
      acc += (ottelu.koti === jTunniste) ? ottelu.tulos[1] : ottelu.tulos[0];
      return acc;
    },0);
    return maalit;

  }

  render() {
    let {joukkue, joukkueet, ottelut} = this.props;

    console.log("Joukkue.render", this.props);

    if(!joukkue || !ottelut) {
      return null;
    }

    let joukkueApi = new JoukkueApi(joukkueet);

    let pisteet = joukkueApi.calculateJoukkuePisteet(joukkue.tunniste, ottelut);
    console.log("Points",pisteet);

//    let ranking ="-";
    let ranking = joukkueApi.calculateJoukkueRankings(joukkue.tunniste, ottelut);
    console.log("Ranking",ranking);

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
            <dd>{pisteet}</dd>
            <dt>ranking</dt>
            <dd>{ranking}</dd>
            <dt>Tehdyt maalit</dt>
            <dd>{this.getTehdytMaalit() || '-'}</dd>
            <dt>Päästetyt maalit</dt>
            <dd>{this.getPaastetytMaalit() || '-'}</dd>
          </dl>
        </div>
        <div className="col-xs-12 col-sm-6">
          <h3>Pelatut ottelut: </h3>
          <OtteluTaulukko ottelut={this.props.ottelut} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    joukkueet: state.teams.joukkueet,
    joukkue: state.teams.joukkue,
    ottelut: state.games.ottelut
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeam: (teamId) => dispatch(fetchTeamData(['joukkue',teamId])),
    fetchAllTeams: () => dispatch(fetchTeamData()),
    fetchGames: (params) => dispatch(fetchGameData(params))
  }

}


export default connect(mapStateToProps,mapDispatchToProps) (Joukkue);
