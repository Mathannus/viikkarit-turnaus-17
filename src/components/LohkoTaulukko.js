import React, { Component } from 'react';
import Logo from './Logo';
import './css/Lohkot.css';

class LohkoTaulukko extends Component {


  constructor(props) {
    super(props);

    this.onTeamSelected = this.onTeamSelected.bind(this);
  }

  onTeamSelected(joukkue) {
    console.log("team row clicked",joukkue);
    console.log(this.context.router);
    this.context.router.history.push('/joukkue/'+joukkue.tunniste);

  }
  generateTableBody() {
    return this.props.joukkueet.map((joukkue, index) => {
      return (
        <tr key={"tr-"+joukkue.tunniste} onClick={() => this.onTeamSelected(joukkue)}>
          <td key={"td-logo-"+index}><Logo joukkue={joukkue}/></td>
          <td key={"td-lyhenne-"+index}>{joukkue.tunniste}</td>
          <td key={"td-nimi-"+index}>{joukkue.nimi}</td>
        </tr>
      );
    });
  }
  render() {
    const tableBody = this.generateTableBody();
    return (
      <div className="Lohko">
        <h3>{this.props.name}</h3>
        <table className="lohko-table table">
        <thead>
        <tr>
          <th>Logo</th>
          <th>Lyhenne</th>
          <th>Nimi</th>
        </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
        </table>
      </div>
    )
  }
}
LohkoTaulukko.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default LohkoTaulukko;
