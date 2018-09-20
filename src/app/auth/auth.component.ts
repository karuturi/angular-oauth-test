import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  YOUR_CLIENT_ID = '279037393847-nudponfsv0bh9fgujk61a5bova6o8si7.apps.googleusercontent.com';
  YOUR_REDIRECT_URI = 'http://localhost:4200/';
  fragmentString = location.hash.substring(1);

  // // Parse query string to see if page request is coming from OAuth 2.0 server.
  // var params = {};
  // var regex = /([^&=]+)=([^&]*)/g, m;
  // while (m = regex.exec(fragmentString)) {
  //   params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  // }
  // if (Object.keys(params).length > 0) {
  //   localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
  //   if (params['state'] && params['state'] == 'try_sample_request') {
  //     // trySampleRequest();
  //   }
  // }

  public oauth2SignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': this.YOUR_CLIENT_ID,
                  'redirect_uri': this.YOUR_REDIRECT_URI,
                  'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                  'state': 'try_sample_request',
                  'include_granted_scopes': 'true',
                  'response_type': 'token'};

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
      // If there's an access token, try an API request.
    // Otherwise, start OAuth 2.0 flow.
    trySampleRequest() {
      var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
      if (params && params['access_token']) {
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET',
            'https://www.googleapis.com/drive/v3/about?fields=user&' +
            'access_token=' + params['access_token']);
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response);
          } else if (xhr.readyState === 4 && xhr.status === 401) {
            // Token invalid, so prompt for user permission.
            that.oauth2SignIn();
          }
        };
        xhr.send(null);
      } else {
        this.oauth2SignIn();
      }
    }
}


/*
http://localhost:4200/#state=try_sample_request&access_token=ya29.GlseBmtlfT3WbcU4f3wmk5g_Hpfh8qx8lmqkEozh6k7m2qA50PzMfM-WWku8pIGxbg-SuUnmjpGg3yCq3qWuWSx8MRREo_kL9yPnK7mEpydI-xCd_N-Pjw69ZdMl&token_type=Bearer&expires_in=3600&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/drive.metadata.readonly+https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/plus.me
*/