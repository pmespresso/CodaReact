import React, { Component } from 'react';

import { Button, Carousel, Panel, FormGroup, Image, Col, Grid, FormControl, HelpBlock } from 'react-bootstrap';

import './Home.css';

import icon_discover from './discover.png';
import icon_invest from './invest.png';
import icon_empower from './empower.png';

import { fetchCrowdsales } from './actions/homeActions';
import { connect } from 'react-redux';

import { Crowdsales } from '../../components/crowdsale/Crowdsales';

import { CrowdsalesList } from '../../components/CrowdsalesList';

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
      ],
      productionAssistanceOptions: [
        {
          title: 'Producers',
          img: './producer.jpg'
        },
        {
          title: 'Female Singers',
          img: './f_singer.jpg'
        },
        {
          title: 'Male Singers',
          img: './m_singer.jpg'
        },
        {
          title: 'Mixing Engineers',
          img: './mixing_eng.jpg'
        },
        {
          title: 'Songwriters',
          img: './songwriters.jpg'
        },
        {
          title: 'Beatmakers',
          img: './beatmakers.jpg'
        }
      ]
    }
  }

  componentDidMount() {
    // fetch data from mongodb

    //1 Fetch artistsWithOfferings object from mongodb, gridfs

    // 2 Parse and set state with values
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

      <main className="container home">
        <section className="row">
        <div className="section-header">
          <h2> What is Coda? </h2>
          <h4>A Proposal For A New Record Label Structure</h4>
          <p>Facilitating artist equity (token) issuance in exchange for financing and crowdsourced production services. </p>
        </div>
          <section id="what">

            <div className="cards-list">
              <Panel className="card" >
                <img src={icon_discover} className="card-icon"/>
                <Panel.Body>Discover Independent Musicians</Panel.Body>
              </Panel>
              <Panel className="card">
                <img src={icon_invest}  className="card-icon"/>
                <Panel.Body>Invest & Collaborate</Panel.Body>
              </Panel>
              <Panel className="card">
                <img src={icon_empower} className="card-icon"/>
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



          </section>
        </section>


        <section className="row">
          <section id="production-help">
            <h2 className="section-header"> Need Assistance with Production? </h2>
          </section>

          <Grid className="cards-list" style={{display: 'flex', justifyContent: 'center'}}>
            {
              this.state.productionAssistanceOptions.map((option, key) => {
                return (
                  <Col md={4} key={key} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Image src={option.img} style={{maxWidth: '100%', zIndex: -100, position: 'absolute'}} />
                    <h1 style={{color: 'white', zIndex: 100}}>{option.title}</h1>
                  </Col>
                )
              })
            }
          </Grid>

        </section>
      </main>
    </div>
    )
  }
}


export default Home;
