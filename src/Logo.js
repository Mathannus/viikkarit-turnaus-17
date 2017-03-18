import React, { Component } from 'react';

class Logo extends Component {

constructor(props) {
  super(props);
  this.joukkue = props.joukkue;
}

render() {
    return (
      <img
        src={this.joukkue.logo}
        alt={this.joukkue.nimi+' Logo'}
        className="img-logo"
      />
    )
}
}

export default Logo;
