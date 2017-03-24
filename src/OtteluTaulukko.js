import React, { Component } from 'react';
import LohkoJako from './lohkojako.json';
import OtteluTulosInput from './OtteluTulosInput';
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

    this.serverUrl = process.env.REACT_APP_API_SERVER_HOST;

    this.state= {otteluohjelma: []};

    this.changeTulos = this.changeTulos.bind(this);
    this.onTulosUpdateSave = this.onTulosUpdateSave.bind(this);
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


  printTulos(tulos) {
    return (!Array.isArray(tulos) || tulos.length < 2) ?
      " - " :
      tulos[0] + " - " + tulos[1];
  }

  onTulosUpdateSave(ottelu) {
    console.log("OtteluTaulukko.onTulosUpdateSave triggered",ottelu);

    jQuery.ajax({
      url: this.serverUrl + '/ottelu/' + ottelu.id,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ tulosKoti: ottelu.tulos[0], tulosVieras: ottelu.tulos[1]}),
      beforeSend: function(request) {
        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('jwtToken'));
      }
    }).done((data) => {
      console.log("got data from server",data);
    });
  }

  componentDidMount() {

    let {name,kentta} = this.props
    //TODO: Where to configure the server location?
    jQuery.getJSON(this.serverUrl+'/ottelut/'+name+'/'+kentta).done((data) => {
      this.setState({otteluohjelma: data});
    });
  }

  generateHeaders() {
    return COLUMNS.map((colData) => {
      return <th key={colData.key}> {colData.label} </th>
    })
  }

  generateBody() {
    let {admin} = this.props;
    return this.state.otteluohjelma.map((dataRow,index) => {
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
    if(jQuery.isEmptyObject(this.state.otteluohjelma)) {
      return "";
    }

    let lohkoId = this.state.otteluohjelma[0].lohko,
      lohkoNimi = LohkoJako[lohkoId].nimi || "";

    return lohkoNimi;
  }

  render() {

    let {kentta} = this.props;
    if(jQuery.isEmptyObject(this.state.otteluohjelma)) {
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
