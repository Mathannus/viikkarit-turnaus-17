import React,{Component} from 'react'
import {connect} from 'react-redux'
import LohkoTaulukko from './LohkoTaulukko'
import OtteluTaulukko from './OtteluTaulukko'
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
    const lohkoId = this.props.tunniste.toUpperCase(),
          joukkueet = this.props.joukkueet ? this.props.joukkueet.sort((a,b) => {
            return a.ranking === 0 ? 1 : a.ranking - b.ranking;
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
  console.log("mapStateToProps",state);
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
