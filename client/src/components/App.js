import React, { Component } from 'react';
import Kaukalot from './Kaukalot';
import Lohkot from './Lohkot';
import Joukkue from './Joukkue';
import './css/App.css';


class App extends Component {

  constructor(props) {
      super(props);
      this.viewName = props.view;
      this.joukkueTunnus = props.joukkueTunnus || 'Viik R';
      this.state = {
        admin: props.admin || false
      };
  }

  getNextComponent(viewName = '') {
    let nextComponent = null;
    switch(viewName) {
      case 'joukkue':
        nextComponent = <Joukkue tunnus={this.joukkueTunnus}/>
        break;
      case 'lohkot':
          nextComponent = <Lohkot />
          break;
      case 'kaukalot':
      default:
        nextComponent = <Kaukalot admin={this.state.admin}/>
    }

    return nextComponent;
  }


  componentDidMount() {
    const nextComponent = this.getNextComponent(this.viewName);
    this.setState({nextComponent : nextComponent});
  }


  render() {
    let component = this.getNextComponent(this.viewName);
    return (
        <div>
          {component}
        </div>
    );
  }
}

export default App;
