import React, { Component } from 'react';
import _ from 'lodash';
import PageHeader from '../page_header/PageHeader';
import { Button, Panel, Col, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import '../../App.css';

import { connect } from 'react-redux';


const CrowdsalesListofThree = crowdsales => {
  return (
    crowdsales.map((item, key) => {
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
  );
}

export default CrowdsalesListofThree;
