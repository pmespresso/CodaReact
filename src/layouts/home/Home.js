import React, { Component } from 'react';

import { Button, Carousel, Panel, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import './Home.css';

class Home extends Component {

  constructor() {
    super();

    this.state = {
      artistsWithOfferings: [
        {
          title: 'DJ Snake',
          caption: 'New EP',
          img: './dj.jpg',
        },
        {
          title: 'Classical Ballad With a Twist',
          caption: 'An indie band of classical musicians take a new twist',
          img: './violin.jpg'
        },
        {
          title: 'Hip Country',
          caption: 'Hip Hop meets country',
          img: './banjo.jpg'
        }
      ]
    }
  }


  render() {
    function FieldGroup({ id, label, help, ...props }) {
      return (
        <FormGroup controlId={id}>
          <FormControl {...props} />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      );
    }

    return(
      <div>
        <div className="pure-g">
          <Carousel className="carousel">
          {
            this.state.artistsWithOfferings.map((item, key) =>
              <Carousel.Item key={key} >
                <img className="carousel-img" alt="dj" src={item.img} />
                <Carousel.Caption className="carousel-caption">
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                  <Button className="offering-button" bsSize="large">View Offering</Button>
                </Carousel.Caption>
              </Carousel.Item>
            )
          }
          </Carousel>
        </div>

      <main className="container">
        <section className="row">
          <section id="what">
            <h2 className="section-header"> What is Coda? </h2>
            <div className="cards-list">
              <Panel>
                <Panel.Body>Discover Independent Musicians</Panel.Body>
              </Panel>
              <Panel>
                <Panel.Body>Invest & Collaborate</Panel.Body>
              </Panel>
              <Panel>
                <Panel.Body>Empower Artists </Panel.Body>
              </Panel>
            </div>
          </section>
        </section>

        <section className="row">
          <section id="email">
            <h2 className="section-header">
              <b>Be the first</b> to hear about our investment <br/>
                  opportunities when they launch.
            </h2>
            <form className="full">
              <FieldGroup
                  id="formControlsEmail"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
                />
                <Button bsStyle="success" bsSize="large">Add</Button>
            </form>
          </section>
        </section>

        <section className="row">
          <section id="discover-artists">
            <h2 className="section-header"> Discover Artists </h2>
              <div className="cards-list">
              {
                this.state.artistsWithOfferings.slice(0, 3).map((item, key) => {
                    return (
                      <Panel key={key} className="card">
                        <Panel.Body>
                          <Panel.Title>{item.title}</Panel.Title>
                          <img src={item.img} className="artist-card-img"/>

                          <div style={{display: 'flex', justifyContent: 'space-around', padding: 10}}>
                            {item.caption}
                            <Button bsStyle="success" bsSize="sm">View Offering</Button>
                          </div>
                        </Panel.Body>
                      </Panel>
                    )
                })
              }
              </div>

          </section>
        </section>
      </main>
    </div>
    )
  }
}

export default Home;
