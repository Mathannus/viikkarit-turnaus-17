import React,{Component} from 'react';
import './css/OtteluTulosInput.css';

class OtteluTulosInput extends Component {

  constructor(props) {
    super(props);

    this.state = {ottelu: props.ottelu};
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


  render() {
    return(
      <div>
        <input className="input-tulos-koti" onChange={this.changeTulos}/>
        -
        <input className="input-tulos-vieras" onChange={this.changeTulos}/>
        <button className="btn-tallenna-tulos" onClick={this.saveOtteluTulos}>Tallenna</button>
      </div>
    )
  }
}

export default OtteluTulosInput;
