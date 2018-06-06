import React, { Component } from 'react';
import _ from 'lodash';
import PageHeader from '../page_header/PageHeader';
import { Link } from 'react-router'

import { Button, Panel } from 'react-bootstrap';

class DiscoverArtists extends Component {

  constructor() {
    super();

    this.state = {
      artistsWithOfferings: [
        {
          title: 'DJ Snake',
          caption: 'New EP',
          img: './dj.jpg',
          offeringLink: '/dj_offering_example'
        },
        {
          title: 'Classical Ballad With a Twist',
          caption: 'An indie band of classical musicians take a new twist',
          img: './violin.jpg',
          offeringLink: '/classical_offering_example'
        },
        {
          title: 'Hip Country',
          caption: 'Hip Hop meets country',
          img: './banjo.jpg',
          offeringLink: '/hipcountry_offering_example'
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <PageHeader />
        <section className="row">
          <div className="cards-list">
            {
                this.state.artistsWithOfferings.map((item, key) => {
                    return (
                      <Panel key={key} className="card">
                        <Panel.Body>
                          <Panel.Title>{item.title}</Panel.Title>
                          <img src={item.img} className="artist-card-img"/>

                          <div style={{display: 'flex', justifyContent: 'space-around', padding: 10}}>
                            {item.caption}
                            <Button bsStyle="success" bsSize="sm"><Link to={item.offeringLink} style={{color: 'white'}}>View Offering</Link></Button>
                          </div>
                        </Panel.Body>
                      </Panel>
                    );
                })
            }
          </div>
        </section>
      </div>
    )
  }
}

export default DiscoverArtists;
