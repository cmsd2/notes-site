import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { withAuth } from '../Auth';

class SignoutCallback extends Component {
  render() {
    console.log("signout callback");
    var location = this.props.auth.signoutCallback();
    if (location) {
      var pathname = location;
      if (location.pathname) {
        pathname = location.pathname;
      }
      return <Redirect to={pathname}/>
    }

    return (
      <div className="signoutCallback">
        <h1>Signout</h1>
      </div>
    );
  }
}

export default withAuth(SignoutCallback);
