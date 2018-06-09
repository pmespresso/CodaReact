import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './layouts/user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './layouts/user/ui/logoutbutton/LogoutButtonContainer'
import Navigation from './layouts/nav/Navigation';
import {Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap';
import About from './layouts/about/About';

import { BrowserRouter as Router, Route } from "react-router-dom";

// contract stuff
import CodaMusicTokensRegistry from '../build/contracts/CodaMusicTokensRegistry.json'
import getWeb3 from './util/getWeb3';

// redux
import { Provider } from 'react-redux';
import store from './store';


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

      <Provider store={store}>
        <div className="App">
          <Router>
            <Navigation />
          </Router>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

export default App;
