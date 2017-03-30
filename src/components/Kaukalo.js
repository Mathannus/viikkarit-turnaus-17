import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import jQuery from 'jquery';
import LohkoJako from '../lohkojako.json';
import OtteluTaulukko from './OtteluTaulukko';
import OtteluApi from '../OtteluApi';
import './css/Kaukalo.css';

class Kaukalo extends Component {

 constructor(props) {
   super(props);
   this.name = props.name;
   this.title = props.title || (props.name === 'kaukalo1' ? 'Kaukalo 1' : 'Kaukalo 2');
   console.log(props.title,this.title);
   this.ottelut = props.ottelut || {};
   this.admin = props.admin || false;

   this.state = {ottelut: {etukentta: [], takakentta: []}};
 }

  componentDidMount() {
    OtteluApi.getOttelut([], (data) => {
      console.log(data);
      const kaukalo = data[this.name];
      this.setState ({ottelut: {etukentta: kaukalo.etukentta.ottelut, takakentta: kaukalo.takakentta.ottelut }});
    })
  }

  getLohkoNimi(kentta) {
    //Short circuit if there are no games
    if(jQuery.isEmptyObject(this.state.ottelut[kentta])) {
      return "";
    }
    const lohkoId = this.getLohkoId(kentta);
    const lohko = LohkoJako["lohko-"+lohkoId];
    let lohkoNimi = lohko.nimi || "";
    return lohkoNimi;
  }
  getLohkoId(kentta) {
    //Short circuit if there are no games
    if(jQuery.isEmptyObject(this.state.ottelut[kentta])) {
      return "";
    }
      let lohkoId = this.state.ottelut[kentta][0].lohko;
      if(lohkoId.startsWith("lohko-")) {
        lohkoId = lohkoId.substr("lohko-".length);
      }


      return lohkoId;
  }


  render() {

    return (
      <div className="Kaukalo row">
        <div className="col-sm-12">
          <h3>{this.title}</h3>
        </div>
        <div className="col-sm-6">
          <h3>Etukenttä : <Link to={"/lohko/"+this.getLohkoId('etukentta')}>{this.getLohkoNimi('etukentta')}</Link></h3>
          <OtteluTaulukko admin={this.admin} name={this.name} kentta="etukentta" ottelut={this.state.ottelut.etukentta}/>
        </div>
        <div className='kaukalo-split-border-vertical'></div>
        <div className="col-sm-6 kaukalo-split-border-vertical">
          <h3>Takakenttä : <Link to={"/lohko/"+this.getLohkoId('takakentta')}>{this.getLohkoNimi('takakentta')}</Link></h3>
          <OtteluTaulukko admin={this.admin} name={this.name} kentta="takakentta" ottelut={this.state.ottelut.takakentta}/>
        </div>
      </div>
    )
  }
}

export default Kaukalo;
