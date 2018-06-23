import React from 'react';
import { Panel, Button, Link } from 'react-bootstrap';

class CrowdsalesList extends React.Component {
  render() {
    return (
      <div className="cards-list">
        {
            this.props.artistsWithOfferings.map((item, key) => {
                return (
                  <Panel key={key} className="card" style={{height: '50rem'}}>
                    <Panel.Body>
                      <Panel.Title><h2>{item.title}</h2></Panel.Title>
                      <img src={item.img} className="artist-card-img" role="presentation"/>

                      <div>
                        {item.caption}
                        <Button className="pull-right" bsStyle="success" bsSize="sm"><Link to={item.offeringLink} style={{color: 'white'}}>View Offering</Link></Button>
                      </div>
                    </Panel.Body>
                  </Panel>
                )
            })
        }
      </div>
    )
  }
}

export default CrowdsalesList;
