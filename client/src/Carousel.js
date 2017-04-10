import {Component} from 'react';


class Carousel extends Component {

  constructor(props) {
    super(props);

    const components = props.components || [];

    this.state = {
      viewIndex: 0,
      toggleCarousel: false,
    };

  }

  startCarousel() {
    const intervalId = setInterval(this.rotate.bind(this), 5000);
    this.setState({intervalId : intervalId});
  }

  stopCarousel() {
    clearInterval(this.state.intervalId);
  }

  rotate() {
    let viewIndex = this.state.viewIndex;
    viewIndex = (viewIndex + 1) % this.components.length;
    const nextComponent = this.components[viewIndex];
    this.setState({viewIndex: viewIndex, nextComponent: nextComponent});
  }

  toggleCarousel(e) {
      e.preventDefault();
      this.state.toggleCarousel ? this.stopCarousel() : this.startCarousel();
      this.setState({toggleCarousel: !this.state.toggleCarousel});
  }

  componentWillUnmount() {
    this.stopCarousel();
  }

  componentDidMount() {
    const nextComponent = this.components[this.state.viewIndex];
    this.setState({nextComponent : nextComponent});

    if(this.state.toggleCarousel) {
      this.startCarousel();
    }
  }

  render() {
    return (

      <div className="carousel" >
        {this.state.nextComponent}
        <a href="#" onClick={this.toggleCarousel} id="carousel-link">{this.state.toggleCarousel ? "Stop": "Start"} carousel</a>
      </div>
    );
  }

}

export default Carousel;
