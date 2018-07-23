import React from 'react';
import _ from 'lodash';
import Crowdsale from '../../components/crowdsale/Crowdsale';

import List from '@material-ui/core/List';

import '../../App.css';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FETCH_CROWDSALES_FAILED, FETCH_CROWDSALES_STARTED, FETCH_CROWDSALES_SUCCEEDED, NEW_CROWDSALE_CREATED } from '../../actions/crowdsaleActions';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

class Crowdsales extends React.Component {
  render() {
    const { crowdsales, query, fetching, sortBy } = this.props;
    const activeCrowdsales = crowdsales.active_crowdsales;

    // if (!query && !fetching) {
    //   return null;
    // }

    if (fetching) {
      return (<p> Searching for crowdsales like {query}...</p>);
    }

    return (
      <List className="root">
        {
          sortBy === "POPULAR"
          ?
          activeCrowdsales.map((item, key) => (
            <Crowdsale item={item} key={key} />
          ))
          :
          _.sortBy(activeCrowdsales, ['posted_date']).map((item, key) => (
            <Crowdsale item={item} key={key} />
          ))
        }
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    crowdsales: state.crowdsales,
    query: state.query,
    fetching: state.fetching
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Crowdsales));
