import React, {Component} from 'react';
import Kaukalo from './Kaukalo';


class Kaukalot extends Component {

  constructor(props) {
    super(props);

    console.log("Kaukalot.constructor",props.ottelut["kaukalo1"]);

  }
  render = () => {
    const ottelut_kaukalo1 = this.props.ottelut ? this.props.ottelut["kaukalo1"] : {};
    const ottelut_kaukalo2 = this.props.ottelut ? this.props.ottelut["kaukalo2"] : {};
    console.log("Kaukalot.render",ottelut_kaukalo1, ottelut_kaukalo2);

    return (
    <div className="Content">
      <Kaukalo
        title="Kaukalo 1"
        name="kaukalo1"
        ottelut={ottelut_kaukalo1}
        admin={this.props.admin || false}
      ></Kaukalo>
      <Kaukalo
        title="Kaukalo 2"
        name="kaukalo2"
        ottelut={ottelut_kaukalo2}
        admin={this.props.admin || false}
      ></Kaukalo>
    </div>
  )}
}

export default Kaukalot;
