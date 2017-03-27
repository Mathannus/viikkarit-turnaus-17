import Auth from './Auth';
import jQuery from 'jquery';

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
    console.log(url);
    jQuery.getJSON(url).done(cbSuccess);
  }

}

export default OtteluApi;
