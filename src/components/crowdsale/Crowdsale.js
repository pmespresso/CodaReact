import React, { Component } from 'react';
import _ from 'lodash';
import PageHeader from '../page_header/PageHeader';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';

import '../../App.css';

const styles = {
  card: {
    maxWidth: 345,
    display: 'flex column'
  },
  crowdsaleMedia: {
    paddingTop: '56.25%', // 16:9
  },
};

class Crowdsale extends React.PureComponent {
  render () {
    const { item, key } = this.props;

    return (
      <Grid item>
        <Card key={key} className="card crowdsale">
          <img src={item.img} className="media crowdsaleMedia" height={300}/>

          <CardContent className="crowdsale-body">
            <Typography variant="title" className="crowdsale-title">{item.title}</Typography>
            <Typography variant="caption" className="crowdsale-caption"> {item.caption} </Typography>
            <CardActions>
              <Button className="crowdsale-button">View Offering</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export default withStyles(styles)(Crowdsale);
