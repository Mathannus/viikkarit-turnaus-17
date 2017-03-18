import React, { Component } from 'react';
import LohkoJako from './lohkojako.json';
import OtteluTulosInput from './OtteluTulosInput';
import jQuery from 'jquery';
import './css/OtteluTaulukko.css';

class OtteluTaulukko extends Component {

  constructor(props) {
    super(props);
    this.cols = [
        {key:"aika", label: "Aika"},
        {key:"koti", label: "Koti"},
        {key:"vieras", label: "Vieras"},
        {key:"tulos", label: "Tulos"}
    ];

    this.name = this.props.name || this.props.params.name;
    this.kentta = this.props.kentta || this.props.params.kentta || 'etukentta';
    this.isAdminMode = props.admin || false;
    this.ottelut = props.ottelut || {};
    console.log('Ottelutaulukko.constructor',this.ottelut);
    this.state= {otteluohjelma: this.ottelut.ottelut};
  }

  changeTulos(e) {
    const newTulos = e.target.value,
          className = e.target.className;

    if(className === "input-tulos-koti") {
      console.log('Change the score of the home team:',newTulos);
    } else {
      console.log('Change the score of the guest team:',newTulos);
    }
  }

  saveOtteluTulos() {
    console.log('Saving the game score');
  }

  generateHeaders() {
    return this.cols.map((colData) => {
      return <th key={colData.key}> {colData.label} </th>
    })
  }
  printTulos(tulos) {
    return (!Array.isArray(tulos) || tulos.length < 2) ?
      " - " :
      tulos[0] + " - " + tulos[1];
  }

  generateBody() {
    return this.props.ottelut.ottelut.map((dataRow,index) => {
            // handle the column data within each row
            var cells = dataRow.jaakunnostus ? [<td key="1">{dataRow.aika}</td>,<td key="2" className="jaakunnostus" colSpan="2"> Jään kunnostus </td>] :
              dataRow.palkintojenjako ? [<td key="1">{dataRow.aika}</td>,<td key="2" className="palkintojenjako" colSpan="2"> Palkintojen jako </td>] :
              this.cols.map((colData, index)  => {
                // colData.key might be "firstName"
                return this.isAdminMode && colData.key === 'tulos' ?
                <td key={index}><OtteluTulosInput ottelu={dataRow} /></td> :
                colData.key === 'tulos' ? <td key={index}>{this.printTulos(dataRow[colData.key])}</td>:
                 <td key={index} className={"td-" + colData.key}>{dataRow[colData.key]}</td>;
            });
            return <tr key={index}>{cells}</tr>;
        });
  }


  render() {

    if(jQuery.isEmptyObject(this.props.ottelut)) {
      console.log("OtteluTaulukko.render: No games. Short circuiting")
      return null;
    }
    console.log("OtteluTaulukko.render",this.props.ottelut);

    const tableHeaders = this.generateHeaders(),
          tableBody = this.generateBody();




    const lohko = jQuery.isEmptyObject(this.props.ottelut) ? "" :
      LohkoJako[this.props.ottelut.lohko].nimi;
    return (
      <div className="ottelu-taulukko">
      <h3>{this.kentta === 'etukentta' ? 'Etukenttä':'Takakenttä'} : {lohko}</h3>
      <table>
        <thead>
          <tr>
            {tableHeaders}
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

export default OtteluTaulukko;
