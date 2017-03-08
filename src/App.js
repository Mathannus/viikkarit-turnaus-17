import React, { Component } from 'react';
import Kaukalo from './Kaukalo';
import Lohkot from './Lohkot';
//import logo from './logo.svg';
import logo from './Viikingit_merkki_teksti_rgb_90.png';
import './css/App.css';

class App extends Component {

  constructor(props) {
      super(props);
      let viewIndex = 0;
      this.views = ['kaukalot', 'viikkarit-h', 'lohkot'];
      const nextComponent = this.getNextComponent();
      this.state = {
        viewIndex: viewIndex,
        nextComponent: nextComponent,
        toggleCarousel: false
      };

      this.toggleCarousel = this.toggleCarousel.bind(this);
  }

  rotate() {
    let viewIndex = this.state.viewIndex;
    viewIndex = (viewIndex + 1) % this.views.length;
    const nextComponent = this.getNextComponent(viewIndex);
    this.setState({viewIndex: viewIndex, nextComponent: nextComponent});
  }

  getNextComponent(viewIndex) {
    const nextView = this.views[viewIndex];
    let nextComponent = null;
    switch(nextView) {
      case 'viikkarit-h':
        nextComponent = <div className="Content"><h1>Viikkarit Hettarit</h1></div>
        break;
      case 'lohkot':
          nextComponent = <Lohkot />
          break;
      case 'kaukalot':
      default:
      nextComponent =
        <div className="Content">
            <Kaukalo title="Kaukalo 1" name="kaukalo1"></Kaukalo>
            <Kaukalo title="Kaukalo 2" name="kaukalo2"></Kaukalo>
        </div>

    }

    return nextComponent;
  }

  componentDidMount() {
    this.rotate();
    if(this.state.toggleCarousel) {
      this.startCarousel();      
    }
  }

  startCarousel() {
    const intervalId = setInterval(this.rotate.bind(this), 5000);
    this.setState({intervalId : intervalId});
  }

  stopCarousel() {
    clearInterval(this.state.intervalId);

  }
  componentWillUnmount() {
    this.stopCarousel();
  }

  toggleCarousel(e) {
      e.preventDefault();
      this.state.toggleCarousel ? this.stopCarousel() : this.startCarousel();
      this.setState({toggleCarousel: !this.state.toggleCarousel});
  }

  render() {
    const nextComponent = this.state.nextComponent;

    return (
      <div className="App">
        <div className="App-header">
          <a href="#" onClick={this.toggleCarousel} id="carousel-link">{this.state.toggleCarousel ? "Stop": "Start"} carousel</a>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Kotiturnaus 2.4.2017</h2>
        </div>
          {nextComponent}
      </div>
    );
  }
}

export default App;
