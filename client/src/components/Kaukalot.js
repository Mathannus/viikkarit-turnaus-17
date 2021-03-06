import React, {Component} from 'react';
import Kaukalo from './Kaukalo';


class Kaukalot extends Component {
  render = () => {
    return (
    <div className="Content row">
      <div className="col-xs-12">
        <Kaukalo
          title="Kaukalo 1"
          name="kaukalo1"
          admin={this.props.admin || false}
        />
      </div>
      <div className="col-xs-12">
        <Kaukalo
          title="Kaukalo 2"
          name="kaukalo2"
          admin={this.props.admin || false}
        />
      </div>
    </div>
  )}
}

export default Kaukalot;
