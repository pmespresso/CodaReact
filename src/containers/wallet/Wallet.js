import React from 'react';
import { Grid, Button, CardHeader, Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import UserTokensList from './components/UserTokensList';
import UserCrowdsalesList from './components/UserCrowdsalesList';

const styles = './styles';

class Wallet extends React.Component {
  render() {
    const { userWalletAddress, tokens, crowdsales } = this.props;

    return (
      <Card className="walletWrapper">
        <CardContent>
          <Typography variant="display3">Your Wallet</Typography>
          <Typography variant="headline">Address: <span id="userWalletAddress" ref="userWalletAddress">{userWalletAddress}</span></Typography>

          <UserTokensList />
          <UserCrowdsalesList />
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect()(withStyles(styles)(Wallet));
