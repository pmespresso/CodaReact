import React, { Component } from 'react';
import _ from 'lodash';
import PageHeader from '../page_header/PageHeader';
import { Button, Panel, Col, Row} from 'react-bootstrap';

import { Link } from 'react-router';

import CodaMusicCrowdsalesRegistry from '../../../build/contracts/CodaMusicCrowdsalesRegistry.json';

import TruffleContract from 'truffle-contract';

var Web3 = require('web3');
var web3 = new Web3();
import getWeb3 from '../../util/getWeb3';

import '../../App.css';

import { connect } from 'react-redux';
import { fetchCrowdsales } from './actions/crowdsaleActions';

class Crowdsales extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {

    }
  }

  componentWillMount() {
    this.props.fetchCrowdsales();
  }

  render() {
    return (
      this.state.crowdsales.map((item, key) => {
          return (
            <Panel key={key} className="card">
              <Panel.Body>
                <Panel.Title>{item.title}</Panel.Title>
                <img src={item.img} className="artist-card-img"/>

                <div>
                  {item.caption}
                  <Button className="pull-right offeringBtn" bsStyle="success" bsSize="sm">View Offering</Button>
                </div>
              </Panel.Body>
            </Panel>
          )
      })
    )
  }
}

const mapStateToProps = state => ({
  crowdsales: state.crowdsales,
});

export default Crowdsales;
