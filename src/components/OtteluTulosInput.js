import React,{Component} from 'react';
import OtteluApi from '../OtteluApi';
import './css/OtteluTulosInput.css';

class OtteluTulosInput extends Component {

  constructor(props) {
    super(props);

    const tulosKoti = props.ottelu.tulos[0] || "",
      tulosVieras = props.ottelu.tulos.length === 0 ? "" : props.ottelu.tulos[1];
    this.state = {
      ottelu: props.ottelu,
      tulosKoti: tulosKoti,
      tulosVieras: tulosVieras,
      updated: false
    };

    this.saveOtteluTulos = this.saveOtteluTulos.bind(this);
    this.changeTulos = this.changeTulos.bind(this);
  }

  changeTulos(e) {
    const target = e.target;
    const value = target.value,
          name = target.name;


    this.setState({[name]: value});

  }

  saveOtteluTulos(event) {
    const ottelu = this.state.ottelu;
    ottelu.tulos[0] = this.state.tulosKoti;
    ottelu.tulos[1] = this.state.tulosVieras;
/*
    OtteluApi.saveOtteluTulos(ottelu, (data) => {
      console.log("got data from server",data);
      this.setState({updated:true});
    });
*/
    this.props.onTulosUpdateSave(ottelu);
  }


  render() {
    return(
      <div className={this.state.updated ? 'tulos-input-updated' : 'tulos-input'}>
        <input type="text" name="tulosKoti" className="input-tulos-koti" onChange={this.changeTulos} value={this.state.tulosKoti}/>
        -
        <input type="text" name="tulosVieras" className="input-tulos-vieras" onChange={this.changeTulos} value={this.state.tulosVieras}/>
        <button className="btn-tallenna-tulos" onClick={this.saveOtteluTulos}>Tallenna</button>
      </div>
    )
  }
}

export default OtteluTulosInput;
