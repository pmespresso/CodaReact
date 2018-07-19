import React, { Component } from 'react';
import _ from 'lodash';

import { Grid, Button, CardHeader, Card, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import TokenInputs from './components/TokenInputs';
import CrowdsaleInputs from './components/CrowdsaleInputs';
import Wallet from '../../containers/wallet/Wallet';

import { connect } from 'react-redux';

import CodaMusicTokensRegistry from '../../../build/contracts/CodaMusicTokensRegistry.json';

import CodaMusicCrowdsalesRegistry from '../../../build/contracts/CodaMusicCrowdsalesRegistry.json';

import TruffleContract from 'truffle-contract';

import getWeb3 from '../../util/getWeb3';

import '../../App.css';

class Funding extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      contracts: {},
      account: '0x0',
      userTokenAddresses: [],
      userTokenBalances: [],
      userTokenSymbols: [],
      userWalletBalance: '',
      tokens: [],
      crowdsales: [],
      web3Provider: null,
      zipTokensAndUserTokenBalances: {},
      stage: 'token'
    }

    this.handleCreateToken = this.handleCreateToken.bind(this);
    this.handleCrowdsaleConfig = this.handleCrowdsaleConfig.bind(this);
    this.deployCrowdsale = this.deployCrowdsale.bind(this);
    this.backToTokenConfig = this.backToTokenConfig.bind(this);
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
      this.instantiateContract();
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  componentDidMount = () => {
  }

  instantiateContract = () => {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const codaMusicTokensRegistry = TruffleContract(CodaMusicTokensRegistry);
    codaMusicTokensRegistry.setProvider(this.state.web3.currentProvider);

    this.setState({
      contracts: {
        codaMusicTokensRegistry: codaMusicTokensRegistry
      }
    });

    var account = this.state.web3.eth.accounts[0];
    this.state.web3.defaultAccount = account;

    this.setState({
      account: account
    });

    const codaMusicCrowdsalesRegistry = TruffleContract(CodaMusicCrowdsalesRegistry);
    codaMusicCrowdsalesRegistry.setProvider(this.state.web3.currentProvider);

    var contractsState = {...this.state.contracts, codaMusicCrowdsalesRegistry}
    this.setState({
      contracts: contractsState
    });

    this.getBalances();
  }

  getBalances = () => {
        console.log('Getting balances...');

        var account = this.state.web3.eth.accounts[0];

        this.setState({
          userWalletAddress: account
        });

        var _this = this;

        this.state.web3.eth.getBalance(account, function(res) {
          _this.setState({
            userWalletBalance: res
          })
        });

        /*** Migrating to Redux ***/
        // dispatch({
        //   type: 'ADD_NEW_CROWDSALE'
        // })


        var promises = [];
        var tokens_promises = [];
        var balances_promises = [];
        var registryInstance;

        this.state.contracts.codaMusicTokensRegistry.deployed().then(function(instance) {
          registryInstance = instance;
          return registryInstance.getTokensLengthForUser(account);
        }).then(function(length) { // get the number of tokens owned by this account
            for (var i = 0; i < length; i++) {
              promises.push(registryInstance.getTokenAtIndex(account, i))
            }

            return Promise.all(promises);
        }).then(function(tokens) { // for each of those tokens, get the Token struct
          _.forEach(tokens, (token) => {
            tokens_promises.push({
              name: token[0],
              symbol: token[1],
              owner: token[2],
              token_address: token[3],
              total_supply: token[4]
            });
          });

          return Promise.all(tokens_promises);
        }).then(function(tokens) { // set state
          _this.setState({
            tokens: tokens
          })
        }).then(function() { // get balances of each token
          _.forEach(_this.state.tokens, (token_struct) => {
            balances_promises.push(registryInstance.balanceOf(token_struct.token_address, token_struct.owner))
          });
          return Promise.all(balances_promises);
        }).then(function(balances) { //set setState
          // _.map(balances, (b) => {
          //   return b.toNumber();
          // });
          _this.setState({
            userTokenBalances: balances
          });

          return _.zipWith(_this.state.tokens, _this.state.userTokenBalances, function(tokens, balance) {
            return [tokens.symbol, balance.toNumber()]
          })
        }).then(function(_zipTokensAndUserTokenBalances) {
          _this.setState({
            zipTokensAndUserTokenBalances: _zipTokensAndUserTokenBalances
          });
        });
    }


    handleCreateToken = () => {
      var _this = this;

      var title = this.refs.SetProjectTitle.value;
      var artist_name = this.refs.SetArtistName.value;
      var artist_wallet = this.refs.SetArtistWallet.value;
      var symbol = this.refs.SetTokenSymbol.value;
      var supply = parseFloat(this.refs.SetTokenSupply.value);

      //dev
      // title = 'TEST';
      // artist_name = 'CHANCE';
      // artist_wallet = this.state.account;
      // symbol = 'CHNG';
      // supply = 1000032010;


      // require(title !== 'undefined' && artist_name !== 'undefined' && artist_wallet !== 'undefined' && symbol !== 'undefined' && supply !== 'undefined');

      _this.state.contracts.codaMusicTokensRegistry.deployed().then(function(instance) {
        instance.deployToken(title, symbol, 18, supply, {from: _this.state.account, to: instance.address}).then(function(result) {
          console.log('result -> ', result);

          alert("Deploy Successful");

          return instance.TokenDeployed().watch(function(err, res) {
            if (err) { console.log(err) }
            var name = res.args.name;
            var symbol = res.args.symbol;

            _this.getBalances();
          });
        });
      });
    }

    deployCrowdsale = () => {
      var goal = parseInt(this.refs.SetGoal.value);
      var duration = parseInt(this.refs.SetDuration.value);
      var min = parseInt(this.refs.MinimumThreshold.value);

      var account = this.state.web3.eth.accounts[0];
      var crowdsaleWallet = this.refs.SetCrowdSaleWallet.value;

      var crowdsaleToken = this.refs.SetCrowdSaleToken.value;
      var rate = parseInt(this.refs.SetTokenPrice.value);

      var _this = this;

      _this.state.contracts.codaMusicCrowdsalesRegistry.deployed().then(function(instance) {
        instance.deployCrowdsale(rate, crowdsaleWallet, crowdsaleToken, {from: _this.state.account, to: instance.address}).then(function(result) {
          console.log('result -> ', result);

          alert("Deploy Successful");

          return instance.CrowdsaleDeployed().watch(function(err, res) {
            if (err) { console.log(err) }

            console.log('event res => ', res);
            _this.updateCrowdsalesInfo();
          });
        });
      });
    }

    updateCrowdsalesInfo = () => {
      var account = this.state.web3.eth.accounts[0];
      var crowdsaleWallet = account;

      var _this = this;

      var promises = [];
      var crowdsales_promises = [];
      var registryInstance;

      this.state.contracts.codaMusicCrowdsalesRegistry.deployed().then(function(instance) {
          // load crowdsales
          registryInstance = instance;
          return instance.getCrowdsalesLengthForUser(account);
      }).then(function(length) {
        for (var i = 0 ; i < length.toNumber(); i++) {
          promises.push(registryInstance.getCrowdsaleAtIndex(account, i));
        }
        return Promise.all(promises);
      }).then(function(crowdsales) {

        _.forEach(crowdsales, (crowdsale) => {
          crowdsales_promises.push({
            crowdsale_address: crowdsale[0],
            owner_address: crowdsale[1],
            token_address: crowdsale[2],
            rate: crowdsale[3].toNumber()
          })
        });

        return Promise.all(crowdsales_promises);
      }).then(function(crowdsales) {
        _this.setState({
          crowdsales: crowdsales
        })
      })
    }

    handleInputChange = (name) => ({ target: { value } }) => {
      this.setState({
        [name]: value
      });
    }

    handleCrowdsaleConfig = () => {
      this.setState({
        stage: 'crowdsale'
      });

      this.updateCrowdsalesInfo();
    }

    backToTokenConfig = () => {
      this.setState({
        stage: 'token'
      })
    }

  render() {
    return (
      <Grid container spacing={16} justify='center'>
        <Grid item md={5} className="launchConfig">
        {
          this.state.stage === 'token'
          ?
          <TokenInputs handleCreateToken={this.handleCreateToken} handleCrowdsaleConfig={this.handleCrowdsaleConfig} />
          :
          <CrowdsaleInputs handleCreateToken={this.handleCreateToken} handleCrowdsaleConfig={this.handleCrowdsaleConfig} />
        }
        </Grid>

        <Grid item md={5} className="wallet">
          <Wallet />
        </Grid>
    </Grid>
    )
  }
}

export default connect()(Funding);


// <ul id="userTokenSymbols" ref="userTokenSymbols">
//   {
//     this.state.tokens.map((token, key) => {
//       return (
//         <li key={key}> {token.symbol} </li>
//       )
//     })
//   }
// </ul>
// <ul id="userTokenBalances">
//
// {
//   this.state.userTokenBalances.map((balance, key) => {
//     return (
//       <li key={key}> {balance.toNumber()} </li>
//     )
//   })
// }
//
// </ul>
