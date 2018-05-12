import { Component } from 'react';
import { withAuth } from '../Auth';
import qs from 'querystring';

export default withAuth(class Login extends Component {
  render() {
    var query = qs.parse(this.props.location.search);
    this.props.auth.login(query.redirect);
  }
});
