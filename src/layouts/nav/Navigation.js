import React, { Component } from 'react';
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'

// UI Components
import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'
import About from '../about/About';

import './Nav.css'
import {Navbar, NavItem, Nav, MenuItem, NavDropdown} from 'react-bootstrap';

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import getWeb3 from '../../util/getWeb3';

class Navigation extends Component {

  constructor() {
    super();
    this.state = {
      web3: null
    }
  }

  componentWillMount = () => {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      }, function() {
        console.log('done setting web3 => ', this.state.web3)
      });
      // Instantiate contract once web3 provided.
      this.checkMetamask();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  checkMetamask = () => {
    if (this.state.web3 !== 'undefined') {
      this.refs.metamaskStatus.style.color = "#32CD32";
    } else {
      this.refs.metamaskStatus.style.color = "red";
    }
  }

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

    return(
      <Navbar className="navbar" collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="nav-item">CODA</Link>
            </Navbar.Brand>
            <span ref="metamaskStatus">Metamask Status</span>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
              <Nav pullRight>

                  <Link to="/discover-artists" className="nav-item">
                    Discover Artists
                  </Link>
                  <Link to="/get-funded" className="nav-item">
                    Get Funded
                  </Link>
                  <Link to="/find-bounties" className="nav-item">
                    Find Bounties
                  </Link>

              </Nav>
          </Navbar.Collapse>

      </Navbar>
    )
  }
}

export default Navigation;

// <Link to="/how-it-works" className="nav-item" activeClassName='hurray'>
//   How It Works
// </Link>

// <Link to="/recording-space" className="nav-item" activeClassName='hurray'>
//   Get Recording Space
// </Link>
