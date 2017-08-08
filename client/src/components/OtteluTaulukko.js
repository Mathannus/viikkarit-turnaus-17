import React, { Component } from 'react';
import { connect } from 'react-redux'
import OtteluTulosInput from './OtteluTulosInput';
import OtteluApi from '../OtteluApi'
import jQuery from 'jquery';
//import {JoukkueApi} from '../JoukkueApi';
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

    this.state= {updatedOttelut: new Set()};
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
      console.log("got data from server",data, ottelu);
      this.setState({updatedOttelut: this.state.updatedOttelut.add(ottelu.id)});
      setTimeout(() => {
        const ottelut = this.state.updatedOttelut;
        ottelut.delete(ottelu.id);
        this.setState({updatedOttelut: ottelut});
      },1000);
    });
  }

  isOtteluUpdated(ottelu) {
    return this.state.updatedOttelut.has(ottelu.id);
  }

  generateHeaders() {
    return COLUMNS.map((colData) => {
      return <th key={colData.key}> {colData.label} </th>
    })
  }

  getJoukkue(tunniste) {
//    console.log(tunniste,this.props.joukkueet);
    const joukkueet = this.props.joukkueet.slice(0);
    return joukkueet.find((joukkue) =>{
      return joukkue.tunniste === tunniste;
    }) || {nimi:tunniste};
  }

  getTableCellValue(key, data) {
    var cellValue = '';
    switch (key) {
      case 'tulos':
        cellValue = this.printTulos(data[key])
        break;
      case 'koti':
      case 'vieras':
        cellValue = this.getJoukkue(data[key]).nimi
        break;
      default:
        cellValue = data[key]
    }

    return cellValue;
  }
  generateBody() {
    let {admin,joukkueet} = this.props;
    console.log(joukkueet);
//    let joukkueApi = new JoukkueApi(joukkueet);

    return this.props.ottelut.map((dataRow,index) => {
            // handle the column data within each row
            var cells = dataRow.jaakunnostus ? [<td key="1">{dataRow.aika}</td>,<td key="2" className="jaakunnostus" colSpan="3"> Jään kunnostus </td>] :
              dataRow.palkintojen_jako ? [<td key="1">{dataRow.aika}</td>,<td key="2" className="palkintojenjako" colSpan="3"> Palkintojen jako </td>] :
              COLUMNS.map((colData, index)  => {
                // colData.key might be "firstName"
                return admin && colData.key === 'tulos' ?
                <td key={index}><OtteluTulosInput ottelu={dataRow} /></td> :
                <td key={index} className={"td-" + colData.key}>{this.getTableCellValue(colData.key, dataRow)}</td>;
            });
            return <tr className={this.isOtteluUpdated(dataRow)? 'ottelu-updated' : 'ottelu'} key={index}>{cells}</tr>;
        });
  }
  render() {
    if(jQuery.isEmptyObject(this.props.ottelut)) {
      console.log("No games - no render");
      return null;
    }
    console.log("OtteluTaulukko.render()", this.props);

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

const mapStateToProps = (state) => {
  return {
    joukkueet: state.teams.joukkueet
  }
}

export default connect(mapStateToProps) (OtteluTaulukko);
