import React,{Component} from 'react'
import {connect} from 'react-redux'
import LohkoTaulukko from './LohkoTaulukko'
import OtteluTaulukko from './OtteluTaulukko'
import OtteluApi from '../OtteluApi'
import {JoukkueApi} from '../JoukkueApi'
import {fetchTeamData, fetchGameData} from '../actions'


class Lohko extends Component {

componentDidMount() {
  const {tunniste} = this.props;
  this.props.fetchTeams(tunniste);
  this.props.fetchGames(['pelatut','lohko',tunniste]);
}

getKentta() {
  return this.props.ottelut.length > 0 ? this.props.ottelut[0].kentta : "";
}

render() {

    console.log("Lohko.render()",this.props);
    const joukkueApi = new JoukkueApi(this.props.joukkueet);
    const lohkoId = this.props.tunniste.toUpperCase(),
          joukkueet = this.props.joukkueet ? this.props.joukkueet.map((joukkue) => {
//            joukkue.pisteet = joukkueApi.calculateJoukkuePisteet(joukkue.tunniste, this.props.ottelut);
            joukkue.ranking = joukkueApi.calculateJoukkueRankings(joukkue.tunniste, this.props.ottelut);
            return joukkue;
          }).sort((a,b) => {
            let sortIndex = 0;
            if(a.ranking === 0) {
              sortIndex = 1;
            } else  {
                sortIndex = a.ranking - b.ranking;
            }
            return sortIndex;
          }) : [];

    return (
      <div className="Lohko">
        <div className="col-xs-12 col-sm-6">
          <LohkoTaulukko name={"Lohko "+lohkoId} joukkueet={joukkueet}/>
        </div>
        <div className="col-xs-12 col-sm-6">
          <h3>Pelatut ottelut:</h3>
              <OtteluTaulukko kentta={this.getKentta()} ottelut={this.props.ottelut}/>
        </div>
      </div>

    );
}

}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    joukkueet: state.teams.joukkueet,
    ottelut: state.games.ottelut
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeams: (lohkoId) => dispatch(fetchTeamData(['lohko',lohkoId])),
    fetchGames: (params) => dispatch(fetchGameData(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Lohko)
