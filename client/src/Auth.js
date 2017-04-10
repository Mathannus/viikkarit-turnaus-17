import jQuery from 'jquery';

class Auth {

  static isLoggedIn() {
    return localStorage.getItem('jwtToken') !== null;
  }

  static authenticate(name,password, successCallBack, failCallback) {
      const serverUrl = process.env.REACT_APP_API_SERVER_HOST;

      if(!name || !password) {
        failCallback('Please provide name and password');
        return;
      }

      jQuery.ajax({
        url: serverUrl + '/login',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'text',
        data: JSON.stringify({ name: name , password: password } ),
      }).done((data) => {
          localStorage.setItem('jwtToken',data);
          successCallBack();

        }).fail(function() {
          failCallback("Login failed. Please check your name and password");
        });
  }

  static logout(callback) {
    localStorage.clear('jwtToken');
    callback();
  }

  static getJwtToken() {
      return localStorage.getItem('jwtToken');
  }
}

export default Auth;
