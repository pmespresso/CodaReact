import React, { Component } from 'react';
import _ from 'lodash';
import PageHeader from '../../components/page_header/PageHeader';
import { Link } from 'react-router'

import { Button, Panel } from 'react-bootstrap';

class DiscoverArtists extends Component {

  constructor() {
    super();

    this.state = {
      artistsWithOfferings: [
        {
          title: "Yeezus",
          caption: "Kanye West's new album needs some more funding. Ye is mad at The Man. Ye don't want The Man's money. Ye want your help.",
          img: './kanye.jpeg',
          offeringLink: '/kanye_offering_example'
        },
        {
          title: 'Hip Country',
          caption: 'Hip Hop meets country and blended into an summer banger for your trip to Mexico.',
          img: './banjo.jpg',
          offeringLink: '/hipcountry_offering_example'
        },
        {
          title: 'DJ Snake',
          caption: 'William Sami Etienne Grigahcine, known professionally as DJ Snake, is a French DJ and record producer from Paris.',
          img: './dj.jpg',
          offeringLink: '/dj_offering_example'
        },
        {
          title: 'Classical Ballad With a Twist',
          caption: 'An indie band of classical musicians take a new twist because f*** the rules, be creative',
          img: './violin.jpg',
          offeringLink: '/classical_offering_example'
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
                      <Panel key={key} className="card" style={{height: '50rem'}}>
                        <Panel.Body>
                          <Panel.Title><h2>{item.title}</h2></Panel.Title>
                          <img src={item.img} className="artist-card-img"/>

                          <div>
                            {item.caption}
                            <Button className="pull-right" bsStyle="success" bsSize="sm"><Link to={item.offeringLink} style={{color: 'white'}}>View Offering</Link></Button>
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
