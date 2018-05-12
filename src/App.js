import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { withAuth } from './Auth.js';
import Routes from "./Routes.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) {
      return null;
    }

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Notes</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
        { this.props.auth.isAuthenticated() && 
            <NavItem onClick={this.props.auth.logout}>
              Sign out
            </NavItem>
        }
        { this.props.auth.isAuthenticated() ||
            <NavItem onClick={this.props.auth.login}>
              Sign in
            </NavItem>
        }
        { this.props.auth.isAuthenticated() ||
            <NavItem onClick={this.props.auth.register}>
              Register
            </NavItem>
        }
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
    </div>
    );
  }
}

export default withAuth(App);

