import React, { Component } from 'react';
import './css/OtteluTaulukko.css';
import Otteluohjelma from './otteluohjelma.json';

class OtteluTaulukko extends Component {

  constructor(props) {
    super(props);
    this.cols = [
        {key:"aika", label: "Aika"},
        {key:"koti", label: "Koti"},
        {key:"vieras", label: "Vieras"},
        {key:"tulos", label: "Tulos"}
    ];
  }

  generateHeaders() {
    return this.cols.map((colData) => {
      return <th key={colData.key}> {colData.label} </th>
    })
  }

  generateBody() {
    const otteluohjelma = Otteluohjelma[this.props.name];

    return otteluohjelma.map((dataRow,index) => {

            // handle the column data within each row
            var cells = dataRow.jaakunnostus ? [<td key={index}>{dataRow.aika}</td>,<td className="jaakunnostus" colSpan="2"> Jään kunnostus </td>] :
              dataRow.palkintojenjako ? [<td key={index}>{dataRow.aika}</td>,<td className="palkintojenjako" colSpan="2"> Palkintojen jako </td>] :
              this.cols.map((colData, index)  => {
                // colData.key might be "firstName"
                return <td key={index}> {dataRow[colData.key]} </td>;
            });
            return <tr key={dataRow.id}> {cells} </tr>;
        });
  }


  render() {

    const tableHeaders = this.generateHeaders(),
          tableBody = this.generateBody();


    return (
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
    )
  }

}

export default OtteluTaulukko;
