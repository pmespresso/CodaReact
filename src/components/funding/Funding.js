import React, { Component } from 'react';
import _ from 'lodash';
import { Button, Panel, Col, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import CodaMusicTokensRegistry from '../../../build/contracts/CodaMusicTokensRegistry.json';

import CodaMusicCrowdsalesRegistry from '../../../build/contracts/CodaMusicCrowdsalesRegistry.json';

import TruffleContract from 'truffle-contract';

import getWeb3 from '../../util/getWeb3';

// import { fetchCrowdsales } from '../../actions';

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
      zipTokensAndUserTokenBalances: {}
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
    const { dispatch } = this.props;
    // dispatch(fetchCrowdsales())
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
      <div>
        <section className="row">

        {
          this.state.stage === 'crowdsale'
          ?
            <Col md={5}>
              <Panel style={{height: 600, textAlign: 'center'}}>
                <Panel.Title><h2>Launch Your Crowdsale</h2></Panel.Title>
                <Panel.Body style={{display: 'flex column'}}>
                <strong>Token to Sell: </strong><input type="text" className="form-control bottom-margin-20" id="SetCrowdSaleToken" ref="SetCrowdSaleToken" placeholder="e.g. 0x230dsa9191f2190ds414ah3fjdfa12"/>
                <strong>Crowdsale Wallet: </strong><input type="text" className="form-control bottom-margin-20" id="SetCrowdSaleWallet" ref="SetCrowdSaleWallet" placeholder="e.g. 0x230dsa9191f2190ds414ah3fjdfa12"/>

                <strong>Token Price per Unit (in ETH): </strong><input type="text" className="form-control bottom-margin-20" id="SetTokenPrice" ref="SetTokenPrice" placeholder="e.g. 3"/>
                <strong>Total Goal: (ETH)</strong><input type="text" className="form-control bottom-margin-20" id="SetGoal" ref="SetGoal" placeholder="e.g. 400"/>
                <strong>Crowdsale Duration: </strong><input type="text" className="form-control bottom-margin-20" id="SetDuration" ref="SetDuration" placeholder="e.g. 30 days"/>
                <strong>Minimum Threshold: (as a % of Total Goal)</strong><input type="text" className="form-control bottom-margin-20" id="MinimumThreshold" ref="MinimumThreshold" placeholder="e.g. 30% of Total Goal"/>
                </Panel.Body>

                <Panel.Body> If crowdsale address is different from the account address you deployed your tokens from, you'll have to send your tokens to the Crowdsale address manually. </Panel.Body>
              </Panel>
              <Button className="pull-left" id="backToTokenConfig" onClick={this.backToTokenConfig}>Back to Token</Button>
              <Button className="pull-right" id="launchCrowdsale" onClick={this.deployCrowdsale}>Launch Crowdsale</Button>
            </Col>
          :
          <Col md={5}>
            <Panel style={{height: 600, textAlign: 'center'}}>
              <Panel.Title><h2>Create A New Token For Your Album</h2></Panel.Title>
              <Panel.Body style={{display: 'flex column'}}>
                <div><strong>Album or Project Title: </strong><input type="text" className="form-control bottom-margin-20" ref="SetProjectTitle" placeholder="e.g. Radio Nights"/></div>
                <div><strong>Artist or Band Name: </strong><input type="text" className="form-control bottom-margin-20" ref="SetArtistName" placeholder="e.g. Chance the Rapper"/></div>
                <div><strong>Artist Ethereum Wallet: </strong><input type="text" className="form-control bottom-margin-20" ref="SetArtistWallet" placeholder="e.g. 0x16B0dc30B9aD80Fb6fC352496CAaCA64ED082e9c"/></div>
                <div><strong>Set Token Symbol: </strong><input type="text" className="form-control bottom-margin-20" ref="SetTokenSymbol" placeholder="e.g. RDN"/></div>
                <div><strong>Token Supply: </strong><input type="text" className="form-control bottom-margin-20" ref="SetTokenSupply" placeholder="e.g. 200000000"/></div>
                <button onClick={this.handleCreateToken} className="btn btn-lg btn-success pull-right" ref="createNewProjectOfferingButton">Deploy Token</button>
              </Panel.Body>
            </Panel>
            <Button className="pull-right" id="crowdsale_configuration" onClick={this.handleCrowdsaleConfig}>Start Crowdsale Configuration</Button>
          </Col>
        }

            <div className="col-md-5">
              <div className="card card-default">
                <div className="card-heading">
                  <h3 className="card-title">Your Wallet</h3>
                </div>
                <div className="card-body">
                  <p className="bottom-margin-20"><strong>Your Wallet Address: </strong> <span id="userWalletAddress" ref="userWalletAddress">{this.state.userWalletAddress}</span></p> <br/>

                  <div id="userTokenOverview" ref="userTokenOverview" style={{display: 'flex'}}>
                    <strong>Your Tokens: </strong>

                    <ul id="userTokenAddresses" ref="userTokenAddresses" style={{listStyleType: 'none'}}>
                    {
                      this.state.tokens.map((token, key) => {
                        return (
                          <li key={key}> {token.token_address} </li>
                        )
                      })
                    }
                    </ul>
                    <ul id="userTokenSymbols" style={{listStyleType: 'none'}}>
                    {
                      this.state.tokens.map((token, key) => {
                        return (
                          <li key={key}> {token.symbol} </li>
                        )
                      })
                    }
                    </ul>
                    <ul id="userTokenBalances" style={{listStyleType: 'none'}}>
                    {
                      this.state.userTokenBalances.map((balance, key) => {
                        return (
                          <li key={key}> {balance.toNumber()} </li>
                        )
                      })
                    }
                    </ul>

                  </div>
                </div>
              </div>
            </div>
        </section>

        <section className="row">
          <div className="col-md-5">
            <div className="card card-default">
              <div className="card-heading">
                <h3 className="card-title">Crowdsales</h3>
              </div>
              <div className="card-body">
                <div id="userCrowdsaleOverview" ref="userTokenOverview" style={{display: 'flex'}}>
                  <strong>Your Launched Crowdsales: </strong>

                  <ul id="userCrowdsaleAddresses" ref="userCrowdsaleAddresses" style={{listStyleType: 'none'}}>
                  {
                    this.state.crowdsales.map((crowdsale, key) => {
                      return (
                        <li key={key}> Crowdsale: {crowdsale.crowdsale_address} Token: {crowdsale.token_address} </li>
                      )
                    })
                  }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
    )
  }
}

export default Funding;


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
