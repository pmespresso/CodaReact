import React, { Component } from 'react';
import _ from 'lodash';
import PageHeader from '../page_header/PageHeader';
import { Link } from 'react-router'

import { Button, Panel, Image, Modal, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

import CodaMusicTokensRegistry from '../../../build/contracts/CodaMusicTokensRegistry.json';
import CodaMusicCrowdsalesRegistry from '../../../build/contracts/CodaMusicCrowdsalesRegistry.json';

import TruffleContract from 'truffle-contract';
import getWeb3 from '../../util/getWeb3';

export default class KANYEOFFERINGEXAMPLE extends Component {

  constructor() {
    super();

    this.state = {
      show: false
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fundProject = this.fundProject.bind(this);
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

    this.updateCrowdsalesInfo();
  }

  fundProject = (e) => {
    e.preventDefault();

    var crowdsale_address = this.state.crowdsales[0].crowdsale_address;

    var _this = this;
    this.state.contracts.codaMusicCrowdsalesRegistry.deployed().then(function(instance) {

      instance.buy(crowdsale_address, _this.state.account, {from: _this.state.account, to: crowdsale_address, value: 10000, gas: 210000});


      /// SUPER HACK
      setTimeout(  () => {_this.handleShow()}, 8000)
    })
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

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <div>
        <PageHeader />

        <section className="row" style={{color: 'white', display: 'flex', justifyContent: 'space-between'}}>
          <Image src="./kanye.jpeg" style={{width: '100%', margin: 0, padding: 0, position: 'absolute', top: 100, height: 500, zIndex: -100}} />

          <h1> Yeezus </h1>
          <div className="offering-overview" style={{zIndex: 100}}>
            <div className="token-overview" style={{display: 'flex column'}}>
                <div><label>Token Symbol: </label> <p> KANYE </p></div>
                <div><label>Token Supply: </label> <p> 999404040 </p></div>
                <div><label>Token Price: </label> <p> 100 KANYE per ETH </p></div>
                <div><label>Goal: </label> <p> 3000 ETH (~ $2.4 mil)</p></div>
                <div><label>Duration: </label> <p>  </p></div>
                <div><label>Min Threshold: </label> <p> 2500 ETH (~ $2.0 mil) </p></div>
                {
                  this.state.crowdsales
                  ?
                  <div><label>Crowdsale Address: </label><p ref="crowdsale_address_ex">{this.state.crowdsales[0].crowdsale_address}</p></div>
                  :
                  null
                }

            </div>

            <Button className="pull-right" bsSize="lg" bsStyle="success" onClick={this.fundProject}> Fund Project </Button>
          </div>
        </section>

        <br />

        <section className="row">

        </section>

        <Modal show={this.state.show} onHide={this.handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Congratulations!</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <h4>You're now an investor in: KANYE</h4>
           <p>
             Your tokens grant you proportional ownership in the rights to KANYE's creations.
           </p>

           <p> You just bought: 1000 KANYE tokens for 10 ETH</p>
         </Modal.Body>
         <Modal.Footer>
           <Button onClick={this.handleClose}>Close</Button>
         </Modal.Footer>
       </Modal>

      </div>
    )
  }
}
