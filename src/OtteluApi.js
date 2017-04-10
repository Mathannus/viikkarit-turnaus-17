import Auth from './Auth';
import jQuery from 'jquery';
import ottelut from './ottelut.json';

class OtteluApi {

  static saveOtteluTulos(ottelu, cbSuccess, cbFail) {
    const serverUrl = process.env.REACT_APP_API_SERVER_HOST;

    jQuery.ajax({
      url: serverUrl + '/ottelu/' + ottelu.id,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ tulosKoti: ottelu.tulos[0], tulosVieras: ottelu.tulos[1]}),
      beforeSend: function(request) {
        request.setRequestHeader('Authorization', 'Bearer ' + Auth.getJwtToken());
      }
    }).done(cbSuccess).fail(cbFail);
  }

  static getOttelut(params, cbSuccess) {
    const serverUrl = process.env.REACT_APP_API_SERVER_HOST,
          url = serverUrl +"/"+ ["ottelut", ...params].join('/');

//This is a hack for serving the results from a static json file after the tournament has finnished.
    if(serverUrl === 'static') {
      if(params.length > 0) {
        console.log(params[2]);
        const lohko = params[2].toLowerCase();

        let ottelutByLohko = null;
        switch(lohko) {
          case 'a':  ottelutByLohko = ottelut.kaukalo1.takakentta.ottelut; break;
          case 'b':  ottelutByLohko = ottelut.kaukalo1.etukentta.ottelut; break;
          case 'c':  ottelutByLohko = ottelut.kaukalo2.takakentta.ottelut; break;
          case 'd':  ottelutByLohko = ottelut.kaukalo2.etukentta.ottelut; break;
        }
        ottelutByLohko = ottelutByLohko.filter((ottelu) => (!(ottelu.jaakunnostus || ottelu.palkintojen_jako)));
          cbSuccess(ottelutByLohko);
      } else {
      cbSuccess(ottelut);
      }
    } else {
      jQuery.getJSON(url).done(cbSuccess);
    }
  }

}

export default OtteluApi;
