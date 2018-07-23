import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import GridListTileBar from '@material-ui/core/GridListTileBar'

import SimpleTabs from '../tabs/SimpleTabs';

import { connect } from 'react-redux';
import Crowdsales from '../../containers/crowdsales/Crowdsales';
import { FETCH_CROWDSALES_FAILED, FETCH_CROWDSALES_STARTED, FETCH_CROWDSALES_SUCCEEDED, NEW_CROWDSALE_CREATED } from '../../actions/crowdsaleActions';

const styles = {
  body: {
    marginTop: 90
  }
}

// @withStyles
class Home extends Component {

  constructor() {
    super();

    this.state = {
      value: 0,
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

    return(
      <Grid spacing={32} container justify='center' className="body" style={{marginTop: 50, padding: 0}}>
        <Grid xs={12} md={6} lg={6} item>
            <SimpleTabs>
              <Crowdsales />
            </SimpleTabs>
        </Grid>

        <Grid xs={12} md={4} lg={4} item id="production-help">
          <FindCollaborators productionAssistanceOptions={this.state.productionAssistanceOptions}/>
        </Grid>
    </Grid>
    )
  }
}

const FindCollaborators = ({productionAssistanceOptions}) => (
  <div>
    <Typography variant="headline" color="inherit" style={{marginBottom: 25}}> Find Opportunities to Collaborate </Typography>
    <GridList cellHeight={140} cols={2} className="gridsList">
      {
        productionAssistanceOptions.map((option, key) => {
          return (
              <GridListTile key={option.title} cols={1}>
                <img src={option.img} style={{ width: '100%'}} />
                  <GridListTileBar
                    title={option.title}
                  />
              </GridListTile>
          )
        })
      }
    </GridList>
  </div>
)

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
