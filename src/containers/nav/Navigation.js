import React, { Component } from 'react';
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'

// UI Components
import LoginButtonContainer from '../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../user/ui/logoutbutton/LogoutButtonContainer'
import About from '../../components/about/About';

import './Nav.css'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import getWeb3 from '../../util/getWeb3';

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navItems: {
    display: 'flexGrow',
    alignItems: 'spaceBetween',
    justifyContent: 'center'
  }
};

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
      <AppBar position="static" className="navbar" collapseOnSelect>
        <Toolbar>
          <IconButton className="nav-menu" color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <div className="navItems">
            <Typography variant="title" color="inherit" className="navBrand">
              <Link to="/" className="navItem">CODA</Link>
            </Typography>
            <Typography>
              <span ref="metamaskStatus">Metamask Status</span>
            </Typography>

            <NavLink to="/discover-artists" className="navItem">
              Discover Artists
            </NavLink>
            <NavLink to="/get-funded" className="navItem">
              Get Funded
            </NavLink>
            <NavLink to="/find-bounties" className="navItem">
              Find Bounties
            </NavLink>

            <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Navigation);
