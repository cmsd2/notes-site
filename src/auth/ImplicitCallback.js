import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default class ImplicitCallback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: null,
      error: null
    };

    render() {
      if (this.state.authenticated === null) {
        return null;
      }

      const referrerKey = 'secureRouterReferrerPath';
      const pathname = localStorage.getItem(referrerKey) || '/';
      localStorage.removeItem(referrerKey);

      return this.state.authenticated ?
        <Redirect to={{ pathname }}/> :
        <p>{this.state.error}</p>;
    }
}
