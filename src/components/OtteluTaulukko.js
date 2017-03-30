import React, { Component } from 'react';
import OtteluTulosInput from './OtteluTulosInput';
import OtteluApi from '../OtteluApi'
import jQuery from 'jquery';
import {joukkueApi} from '../JoukkueApi';
import './css/OtteluTaulukko.css';


const COLUMNS = [
    {key:"aika", label: "Aika"},
    {key:"koti", label: "Koti"},
    {key:"vieras", label: "Vieras"},
    {key:"tulos", label: "Tulos"}
];

class OtteluTaulukko extends Component {

  constructor(props) {
    super(props);

//    this.serverUrl = process.env.REACT_APP_API_SERVER_HOST;
//    this.state= {otteluohjelma: props.ottelut};
    this.onTulosUpdateSave = this.onTulosUpdateSave.bind(this);
  }

  printTulos(tulos) {
    return (!Array.isArray(tulos) || tulos.length < 2) ?
      " " :
      tulos[0] + " - " + tulos[1];
  }

  onTulosUpdateSave(ottelu) {
    console.log("OtteluTaulukko.onTulosUpdateSave triggered",ottelu);

    OtteluApi.saveOtteluTulos(ottelu, (data) => {
      console.log("got data from server",data);
    });
  }

  generateHeaders() {
    return COLUMNS.map((colData) => {
      return <th key={colData.key}> {colData.label} </th>
    })
  }

  generateBody() {
    let {admin} = this.props;
    return this.props.ottelut.map((dataRow,index) => {
            // handle the column data within each row
            var cells = dataRow.jaakunnostus ? [<td key="1">{dataRow.aika}</td>,<td key="2" className="jaakunnostus" colSpan="3"> Jään kunnostus </td>] :
              dataRow.palkintojen_jako ? [<td key="1">{dataRow.aika}</td>,<td key="2" className="palkintojenjako" colSpan="3"> Palkintojen jako </td>] :
              COLUMNS.map((colData, index)  => {
                // colData.key might be "firstName"
                return admin && colData.key === 'tulos' ?
                <td key={index}><OtteluTulosInput onTulosUpdateSave={this.onTulosUpdateSave} ottelu={dataRow} /></td> :
                colData.key === 'tulos' ? <td key={index}>{this.printTulos(dataRow[colData.key])}</td>:
                colData.key === 'koti' ? <td key={index}>{joukkueApi.getJoukkue(dataRow[colData.key]).nimi}</td> :
                colData.key === 'vieras' ? <td key={index}>{joukkueApi.getJoukkue(dataRow[colData.key]).nimi}</td> :
                 <td key={index} className={"td-" + colData.key}>{dataRow[colData.key]}</td>;
            });
            return <tr key={index}>{cells}</tr>;
        });
  }
  render() {

    if(jQuery.isEmptyObject(this.props.ottelut)) {
      return null;
    }

    const tableHeaders = this.generateHeaders(),
          tableBody = this.generateBody();

    return (
      <div className="ottelu-taulukko">
      <table className="table">
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
