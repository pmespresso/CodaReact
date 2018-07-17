import React, { Component } from 'react';
import { Link } from 'react-router'

// UI Components
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import getWeb3 from '../../util/getWeb3';

import { styles } from './styles';

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
      console.log(this.refs.metamaskWalletAddress);
    }
  }

  render() {
    return(
      <AppBar position="static" className="navBar">
        <Toolbar>
          <IconButton className="menuButton" color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className="navBrand">
            <Link to="/" className="navBarLogo">CODA</Link>
          </Typography>
          <Typography variant="headline"><span ref="metamaskStatus">Metamask Status</span></Typography>
          <Typography variant="headline"><span ref="metamaskWalletAddress">Searching for wallet...</span></Typography>

          <div className="pullRight">
            <NavLink to="/get-funded" className="navItem">
              Get Funded
            </NavLink>
            <NavLink to="/find-bounties" className="navItem">
              Find Bounties
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Navigation);
