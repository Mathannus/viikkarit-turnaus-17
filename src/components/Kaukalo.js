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
   this.name = props.name || props.params.name;
   this.title = props.title || this.name;
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
      <div className="col-xs-12 col-sm-6">
        <div className="Kaukalo">
          <h3> {this.title} </h3>
            <h3>Etukenttä : <Link to={"/lohko/"+this.getLohkoId('etukentta')}>{this.getLohkoNimi('etukentta')}</Link></h3>
            <OtteluTaulukko admin={this.admin} name={this.name} kentta="etukentta" ottelut={this.state.ottelut.etukentta}/>
            <div className='kaukalo-split-border'></div>
            <h3>Takakenttä : <Link to={"/lohko/"+this.getLohkoId('takakentta')}>{this.getLohkoNimi('takakentta')}</Link></h3>
            <OtteluTaulukko admin={this.admin} name={this.name} kentta="takakentta" ottelut={this.state.ottelut.takakentta}/>
        </div>
      </div>
    )
  }
}

export default Kaukalo;
