import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { withAuth } from '../Auth';

class SigninCallback extends Component {
  render() {
    var location = this.props.auth.signinCallback();
    if (location) {
      var pathname = location;
      if (location.pathname) {
        pathname = location.pathname;
      }
      return <Redirect to={pathname}/>
    }

    return (
      <div className="signinCallback">
        <h1>Signin</h1>
      </div>
    );
  }
}

export default withAuth(SigninCallback);
