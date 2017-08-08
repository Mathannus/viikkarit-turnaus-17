import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchTeamData} from '../actions'
import LohkoTaulukko from './LohkoTaulukko';
import './css/Lohkot.css';

class Lohkot extends Component {

  componentDidMount() {
    this.props.fetchTeams();
  }

  getJoukkeet(lohko) {
    return this.props.joukkueet.filter(joukkue => joukkue.lohko === lohko);
  }

  getLohkot() {
    return this.props.joukkueet.reduce((acc,curr) => {
      if(!acc.find((lohko) => (lohko === curr.lohko))) acc.push(curr.lohko);
      return acc;
    }, []).sort();
  }

  render() {
    if(! this.props.joukkueet) return null;

    const lohkot = this.getLohkot();

    return (
      <div className="Content row">
        <div className="Lohkot col-xs-12">
          <h3>Lohkot</h3>
          <div className="Lohkot-taulut">

            {
              lohkot.map((lohko) => (
                <LohkoTaulukko name={'Lohko ' +lohko} joukkueet={this.getJoukkeet(lohko)} />
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    joukkueet: state.teams.joukkueet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTeams: () => dispatch(fetchTeamData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lohkot);
