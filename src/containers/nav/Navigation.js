import React, { Component } from 'react';
import { Link } from 'react-router'

// UI Components
import { withStyles } from '@material-ui/core/styles';
import { Grid, MenuIcon, IconButton, Button, Typography, Toolbar, AppBar } from '@material-ui/core';

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import getWeb3 from '../../util/getWeb3';

import styles from './styles';

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
        // Instantiate contract once web3 provided.
        this.checkMetamask();
      });
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  checkMetamask = () => {
    if (this.state.web3 !== null) {
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
          <Typography variant="title" color="inherit" className="navBrand">
            <Link to="/" className="navBarLogo">CODA</Link>
          </Typography>

          <Grid container justify='center' spacing={24}>
            <Grid item>
              <Typography className="navItem" variant="title"><span ref="metamaskStatus">Metamask Status</span></Typography>
            </Grid>
            <Grid item>
              <Typography className="navItem" variant="title"><span ref="metamaskWalletAddress">Searching for wallet...</span></Typography>
            </Grid>
          </Grid>

          <Grid container justify='flex-end' spacing={40}>
            <Grid item>
              <NavLink to="/get-funded" className="navItem">
                <Typography variant="title">
                  Get Funded
                </Typography>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/find-bounties" className="navItem">
                <Typography variant="title">
                  Find Bounties
                </Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Navigation);
