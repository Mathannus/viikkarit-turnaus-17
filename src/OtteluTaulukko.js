import React, { Component } from 'react';
import LohkoJako from './lohkojako.json';
import OtteluTulosInput from './OtteluTulosInput';
import OtteluApi from './OtteluApi'
import jQuery from 'jquery';
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
            var cells = dataRow.jaakunnostus ? [<td key="1">{dataRow.aika}</td>,<td key="2" className="jaakunnostus" colSpan="2"> Jään kunnostus </td>] :
              dataRow.palkintojen_jako ? [<td key="1">{dataRow.aika}</td>,<td key="2" className="palkintojenjako" colSpan="2"> Palkintojen jako </td>] :
              COLUMNS.map((colData, index)  => {
                // colData.key might be "firstName"
                return admin && colData.key === 'tulos' ?
                <td key={index}><OtteluTulosInput onTulosUpdateSave={this.onTulosUpdateSave} ottelu={dataRow} /></td> :
                colData.key === 'tulos' ? <td key={index}>{this.printTulos(dataRow[colData.key])}</td>:
                 <td key={index} className={"td-" + colData.key}>{dataRow[colData.key]}</td>;
            });
            return <tr key={index}>{cells}</tr>;
        });
  }

  getLohkoNimi() {
    //Short circuit if there are no games
    if(jQuery.isEmptyObject(this.props.ottelut)) {
      return "";
    }

    let lohkoId = this.props.ottelut[0].lohko,
      lohkoNimi = LohkoJako[lohkoId].nimi || "";

    return lohkoNimi;
  }

  render() {

    let {kentta} = this.props;
    if(jQuery.isEmptyObject(this.props.ottelut)) {
      return null;
    }

    const tableHeaders = this.generateHeaders(),
          tableBody = this.generateBody();

    const lohko = this.getLohkoNimi();
    return (
      <div className="ottelu-taulukko">
      <h3>{kentta === 'etukentta' ? 'Etukenttä':'Takakenttä'} : {lohko}</h3>
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
