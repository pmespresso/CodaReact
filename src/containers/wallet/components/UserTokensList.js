import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core/';

import { connect } from 'react-redux';

const styles = {
  userTokenOverview: {
    display: 'flex'
  },
  userTokenSymbols: {
    listStyleType: 'none'
  }
}

class UserTokensList extends React.PureComponent {
  render () {
    const { userTokenSymbols, userTokenAddresses, userTokenBalances } = this.props;

    return (
      <div>
        <Typography variant="headline">Your Tokens: </Typography>

        <UserTokenSymbols userTokenSymbols={userTokenSymbols} />
        <UserTokenAddresses userTokenAddresses={userTokenAddresses} />
        <UserTokenBalances userTokenBalances={userTokenBalances} />
      </div>
    )
  }
}

const UserTokenSymbols = ({userTokenSymbols}) => (
    <ul id="userTokenSymbols">
    {
      userTokenSymbols
      ?
      userTokenSymbols.map((token, key) => {
        return (
          <li key={key}> {token.symbol} </li>
        )
      })
      :
      null
    }
    </ul>
);

const UserTokenAddresses = (props) => (
    <ul id="userTokenAddresses">
    {
      props.userTokenAddresses
      ?
      props.userTokenAddresses.map((token, key) => {
        return (
          <li key={key}> {token.token_address} </li>
        )
      })
      :
      null
    }
    </ul>
);

const UserTokenBalances = (props) => (
    <ul id="userTokenBalances">
    {
      props.userTokenBalances
      ?
      props.userTokenBalances.map((balance, key) => {
        return (
          <li key={key}> {balance.toNumber()} </li>
        )
      })
      :
      null
    }
    </ul>
);

export default withStyles(styles)(UserTokensList);
