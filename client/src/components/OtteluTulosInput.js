import React,{Component} from 'react';
import {updateGame} from '../actions'
import { connect } from 'react-redux'

import './css/OtteluTulosInput.css';

class OtteluTulosInput extends Component {

  constructor(props) {
    super(props);

    const tulosKoti = props.ottelu.tulos[0] || "",
      tulosVieras = props.ottelu.tulos.length === 0 ? "" : props.ottelu.tulos[1];
    this.state = {
      ottelut: [],
      ottelu: props.ottelu,
      tulosKoti: tulosKoti,
      tulosVieras: tulosVieras,
      updated: false,
      buttonDisabled: true
    };

    this.saveOtteluTulos = this.saveOtteluTulos.bind(this);
    this.changeTulos = this.changeTulos.bind(this);
  }

  changeTulos(e) {
    const target = e.target;
    const value = target.value,
          name = target.name;
    var buttonDisabled = this.state.buttonDisabled;

          if(!isNaN(parseInt(value))) {
            buttonDisabled = false;
          }
          this.setState({[name]: value, buttonDisabled});


  }

  saveOtteluTulos(event) {
    const ottelu = this.state.ottelu;
    ottelu.tulos[0] = this.state.tulosKoti;
    ottelu.tulos[1] = this.state.tulosVieras;
    this.props.onTulosUpdateSave(ottelu);
  }


  render() {

    console.log("updated:",this.props.updated);

    return(
      <div className={this.props.updated ? 'tulos-input-updated' : 'tulos-input'}>
        <input type="text" name="tulosKoti" className="input-tulos-koti" onChange={this.changeTulos} value={this.state.tulosKoti}/>
        -
        <input type="text" name="tulosVieras" className="input-tulos-vieras" onChange={this.changeTulos} value={this.state.tulosVieras}/>
        <button className="btn btn-primary btn-tallenna-tulos" disabled={this.state.buttonDisabled ? 'disabled' : ''} onClick={this.saveOtteluTulos}>Tallenna</button>
      </div>
    )
  }
}

const mapStateToProps = (state,ownProps) => {


  console.log(state);
  return {
  ottelut: state.ottelut,
  updated: state.games.otteluId === ownProps.ottelu.id && state.games.otteluUpdated
}}


const mapDispatchToProps = (dispatch) => ({
    onTulosUpdateSave: (ottelu) => {
      console.log("dispatching game:",ottelu)
      dispatch(updateGame(ottelu.id, ottelu.tulos))
    }
})


OtteluTulosInput = connect(mapStateToProps,mapDispatchToProps) (OtteluTulosInput);


export default OtteluTulosInput;
