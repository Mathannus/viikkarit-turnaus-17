import React, { Component } from 'react';
import OtteluTaulukko from './OtteluTaulukko';
import './css/Kaukalo.css';

class Kaukalo extends Component {

 constructor(props) {
   super(props);
   this.name = props.name || props.params.name;
   this.title = props.title || this.name;
   this.ottelut = props.ottelut || {};
   this.admin = props.admin || false;
 }

  render() {
    const ottelut1 = this.props.ottelut ? this.props.ottelut["etukentta"] : {};
    const ottelut2 = this.props.ottelut ? this.props.ottelut["takakentta"] : {};

    return (
      <div className="Kaukalo">
        <h3> {this.title} </h3>
        { this.ottelut &&
        <OtteluTaulukko admin={this.admin} name={this.name} kentta="etukentta" ottelut={ottelut1}/>
        }
        <div className='kaukalo-split-border'></div>
        { this.ottelut &&
        <OtteluTaulukko admin={this.admin} name={this.name} kentta="takakentta" ottelut={ottelut2}/>
        }

      </div>
    )
  }
}

export default Kaukalo;
