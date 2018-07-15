import React, { Component } from 'react';
import _ from 'lodash';
import PageHeader from '../page_header/PageHeader';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../../App.css';

class Crowdsale extends React.PureComponent {
  render () {
    const { item, key, styles } = this.props;

    return (
        <div key={key} className={styles.card}>
          <div className="card-body">
            <div className="card-title">{item.title}</div>
            <Image src={item.img} className="artist-card-img"/>

            <div>
              {item.caption}
              <Button className="pull-right offeringBtn" bsStyle="success" bsSize="sm">View Offering</Button>
            </div>
          </div>
        </div>
    )
  }
}



export default Crowdsale;
