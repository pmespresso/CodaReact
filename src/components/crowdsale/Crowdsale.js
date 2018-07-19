import React, { Component } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';

import '../../App.css';

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
});

// action={
//   <IconButton>
//     <MoreVertIcon />
//   </IconButton>
// }
class Crowdsale extends React.PureComponent {

  render () {
    const { item, key } = this.props;

    return (
      <Grid item key={item.img}>
        <Card style={{position: 'relative', height: 200}}>
          <Grid item style={{padding: 30}}>
            <Typography variant="headline" color="textSecondary"> {item.title} </Typography>
            <Typography variant="subheading" color="textSecondary">Created: {item.posted_date}</Typography>
            <Typography>{item.caption}</Typography>
          </Grid>
          <Button variant="contained" color="secondary" size="medium" style={{position: 'absolute', bottom: 15, right: 25}}> Learn More </Button>
        </Card>
      </Grid>
    )
  }
}

export default withStyles(styles)(Crowdsale);
