import React, { Component } from 'react';

import { Carousel, FormGroup, Image, Col, FormControl, HelpBlock } from 'react-bootstrap';

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import icon_discover from './discover.png';
import icon_invest from './invest.png';
import icon_empower from './empower.png';

import { connect } from 'react-redux';

import Crowdsales from '../../containers/crowdsales/Crowdsales';

import { FETCH_CROWDSALES_FAILED, FETCH_CROWDSALES_STARTED, FETCH_CROWDSALES_SUCCEEDED, NEW_CROWDSALE_CREATED } from '../../actions/crowdsaleActions';

const styles = {

}

class Home extends Component {

  constructor() {
    super();

    this.state = {
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

  render() {
    const { crowdsales } = this.props;
    const activeCrowdsales = crowdsales.active_crowdsales;

    function FieldGroup({ id, label, help, ...props }) {
      return (
        <FormGroup controlId={id}>
          <FormControl {...props} />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      );
    }

    return(
      <Grid spacing={32} container justify='center' className="container">
          <Grid xs={7} item id="discoverArtists">
            <h4 className="sectionHeader"> Current Artist Offerings </h4>
            <Crowdsales />
          </Grid>

          <Grid xs={3} item id="production-help">
            <h5 className="section-header"> Find Opportunities to Collaborate </h5>
            <GridList className="cards-list">
              {
                this.state.productionAssistanceOptions.map((option, key) => {
                  return (
                    <GridListTile key={option.title}>
                      <Image src={option.img} style={{maxWidth: '100%', zIndex: -100, position: 'absolute'}} />
                      <h1 style={{color: 'white', zIndex: 100}}>{option.title}</h1>
                    </GridListTile>
                  )
                })
              }
            </GridList>
          </Grid>
    </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    crowdsales: state.crowdsales,
    query: state.query,
    fetching: state.fetching
  }
}


export default connect(mapStateToProps)(Home);

// <div className="section-header">
//   <h2> What is Coda? </h2>
//   <h4>A Proposal For A New Record Label Structure</h4>
//   <p>Facilitating artist equity (token) issuance in exchange for financing and crowdsourced production services. </p>
// </div>
//   <section id="what">
//
//     <div className="cards-list">
//       <Card className="card" >
//         <img src={icon_discover} className="card-icon"/>
//         <CardContent>Discover Independent Musicians</CardContent>
//       </Card>
//       <Card className="card">
//         <img src={icon_invest} className="card-icon"/>
//         <CardContent>Invest & Collaborate</CardContent>
//       </Card>
//       <Card className="card">
//         <img src={icon_empower} className="card-icon"/>
//         <CardContent>Empower Artists </CardContent>
//       </Card>
//     </div>
//   </section>
// </section>
//
// <section className="row">
//   <section id="email">
//     <h2 className="section-header">
//       <b>Be the first</b> to hear about our investment <br/>
//           opportunities when they launch.
//     </h2>
//     <form className="full">
//       <FieldGroup
//           id="formControlsEmail"
//           type="email"
//           label="Email address"
//           placeholder="Enter email"
//         />
//         <Button bsStyle="success" bsSize="large">Add</Button>
//     </form>
//   </section>
