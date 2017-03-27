import React, { Component } from 'react';
import OtteluTaulukko from './OtteluTaulukko';
import OtteluApi from './OtteluApi';
import './css/Kaukalo.css';

class Kaukalo extends Component {

 constructor(props) {
   super(props);
   this.name = props.name || props.params.name;
   this.title = props.title || this.name;
   this.ottelut = props.ottelut || {};
   this.admin = props.admin || false;

   this.state = {ottelut_etukentta: [], ottelut_takakentta: []};
 }

  componentDidMount() {
    OtteluApi.getOttelut([], (data) => {
      console.log(data);
      const kaukalo = data[this.name];
      this.setState ({ottelut_etukentta: kaukalo.etukentta.ottelut, ottelut_takakentta: kaukalo.takakentta.ottelut });
    })
  }

  render() {

    return (
      <div className="Kaukalo">
        <h3> {this.title} </h3>
        { this.ottelut &&
        <OtteluTaulukko admin={this.admin} name={this.name} kentta="etukentta" ottelut={this.state.ottelut_etukentta}/>
        }
        <div className='kaukalo-split-border'></div>
        { this.ottelut &&
        <OtteluTaulukko admin={this.admin} name={this.name} kentta="takakentta" ottelut={this.state.ottelut_takakentta}/>
        }

      </div>
    )
  }
}

export default Kaukalo;
