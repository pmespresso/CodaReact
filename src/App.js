import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'
import Navigation from './layouts/nav/Navigation';
import {Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap';
import About from './layouts/about/About';

import { BrowserRouter as Router, Route } from "react-router-dom";

import CodaMusicTokensRegistry from '../build/contracts/CodaMusicTokensRegistry.json'
import getWeb3 from './util/getWeb3';

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
        </li>
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">Profile</Link>
        </li>
        <LogoutButtonContainer />
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <LoginButtonContainer />
      </span>
    )

    return (
      <div className="App">
        <Router>
          <Navigation />
        </Router>
        {this.props.children}
      </div>
    );
  }
}

export default App;
