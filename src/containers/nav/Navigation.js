import React, { Component } from 'react';
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'

// UI Components
import LoginButtonContainer from '../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../user/ui/logoutbutton/LogoutButtonContainer'
import About from '../../components/about/About';

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
              <NavLink to="/discover-artists" className="nav-item">
                Discover Artists
              </NavLink>
              <NavLink to="/get-funded" className="nav-item">
                Get Funded
              </NavLink>
              <NavLink to="/find-bounties" className="nav-item">
                Find Bounties
              </NavLink>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation;
