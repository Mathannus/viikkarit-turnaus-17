import React, { Component } from 'react';
import Logo from './Logo';
import './css/Lohkot.css';

class Lohko extends Component {

  constructor(props) {
    super(props);
    this.joukkueet = this.props.joukkueet;
    this.name = this.props.name;
  }

  generateTableBody() {
    return this.joukkueet.map((joukkue, index) => {
//      const joukkue = j.joukkue;
//      console.log(j,joukkue);
      return (
        <tr key={"tr-"+joukkue.tunniste}>
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
        <h3>{this.name}</h3>
        <table className="lohko-table">
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

export default Lohko;
