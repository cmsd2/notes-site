import React, { Component } from "react";
import config from './config';
import IdTokenVerifier from 'idtoken-verifier';

const verifier = new IdTokenVerifier({
  issuer: '',
  audience: ''
});

export class Token {
  constructor(id_token_str) {
    if (id_token_str) {
      var id_token = verifier.decode(id_token_str);

      this.id_token = id_token_str;
      this.claims = id_token.payload;
    }
  }

  static load(token) {
    return new Token(token.id_token);
  }

  isValid() {
    return !!this.claims
      && this.isValidExp()
      && this.isValidNbf();
  }

  isValidExp() {
    if (!this.claims) {
      return false;
    } else if (this.claims.exp) {
      var now = new Date().getTime();
      return now <= (this.claims.exp * 1000);
    } else {
      return true;
    }
  }

  isValidNbf() {
    if (!this.claims) {
      return false;
    } else if (this.claims.nbf) {
      var now = new Date().getTime();
      return now >= (this.claims.nbf * 1000)
    } else {
      return true;
    }
  }
}

export class Session {
  constructor(token) {
    this.token = token;
  }

  isAuthenticated() {
    return this.token && this.token.isValid();
  }

  id_token() {
    return this.token && this.token.id_token;
  }

  save() {
    localStorage.setItem('session', JSON.stringify(this));
  }

  static clear() {
    localStorage.removeItem('session');
  }

  static load() {
    var session = localStorage.getItem('session');
    if (session) {
      session = JSON.parse(session);
    }
    var token;
    if (session && session.token) {
      token = Token.load(session.token);
    }
    return new Session(token);
  }

}

export class Auth {
  constructor(props) {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.signinCallback = this.signinCallback.bind(this);
    this.signoutCallback = this.signoutCallback.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  isAuthenticated() {
    if (!this.session) {
      this.loadSession();
    }

    return this.session && this.session.isAuthenticated();
  }

  id_token() {
    return this.session && this.session.id_token();
  }

  login(_event, returnUrl) {
    console.log("login", returnUrl);
    const oauth = config.auth.oauth;
    var url = 'https://'
          + oauth.domain
          + '/login?redirect_uri='
          + encodeURIComponent(this.domain() + oauth.redirectSignIn)
          + '&response_type='
          + oauth.responseType
          + '&client_id='
          + config.auth.userPoolWebClientId;
    this.navigateTo(url, returnUrl);
  }

  parseParams(url) {
    url = url || window.location.href;
    var vars = {};
    var parts = url.slice(url.indexOf('#') + 1).split('&');
    for(var i = 0; i < parts.length; i++) {
      var part = parts[i].split('=');
      if (part.length > 1) {
        vars[part[0]] = part[1];
      } else {
        vars[part[0]] = null;
      }
    }
    return vars;
  }

  signinCallback() {
    var params = this.parseParams();
    var token = new Token(params.id_token);
    var session = new Session(token);
    this.saveSession(session);
    var next = this.loadRedirect() || '/';
    console.log("redirecting to ", next);
    return next;
  }

  signoutCallback() {
    this.clearSession();
    var next = this.loadRedirect() || '/';
    console.log("redirecting to ", next);
    return next;
  }

  saveSession(session) {
    this.session = session;
    this.session.save();
  }

  loadSession() {
    this.session = Session.load();
    return this.session;
  }

  clearSession() {
    Session.clear();
    this.session = null;
  }

  domain() {
    return window.location.origin;
  }

  logout() {
    console.log("logout");
    const oauth = config.auth.oauth;
    var url = 'https://'
          + oauth.domain
          + '/logout'
          + '?logout_uri='
          + encodeURIComponent(this.domain() + oauth.redirectSignOut)
          + '&client_id='
          + config.auth.userPoolWebClientId;
    this.navigateTo(url);
  }

  register() {
    console.log("register");
    const oauth = config.auth.oauth;
    var url = 'https://'
          + oauth.domain
          + '/signup?redirect_uri='
          + encodeURIComponent(this.domain() + oauth.redirectSignIn)
          + '&response_type='
          + oauth.responseType
          + '&client_id='
          + config.auth.userPoolWebClientId;
    this.navigateTo(url);
  }

  navigateTo(url, from) {
    console.log("navigating to", url);
    if (from === undefined) {
      from = window.location.pathname;
    }
    this.saveRedirect({pathname: from});
    window.location.assign(url);
  }

  saveRedirect(location) {
    console.log("save redirect to ", location);
    if (location) {
      localStorage.setItem("redirect", JSON.stringify(location));
    }
  }

  loadRedirect() {
    var redirect = localStorage.getItem("redirect");
    localStorage.removeItem("redirect");
    if (redirect) {
      redirect = JSON.parse(redirect);
    }
    console.log("loaded redirect to ", redirect);
    return redirect;
  }

}

export const AuthProvider = React.createContext(new Auth());

export class Secure extends Component {
  render() {
    return this.props.render({
      auth: this.context.auth
    });
  }
}

export function withAuth(Component) {
  const C = props => (
    <AuthProvider.Consumer>
      {auth => <Component {...props} auth={auth}/> }
    </AuthProvider.Consumer>
  );

  return C;
}




