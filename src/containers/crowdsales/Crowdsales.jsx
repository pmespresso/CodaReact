import React from 'react';
import _ from 'lodash';
import Crowdsale from '../../components/crowdsale/Crowdsale';

import '../../App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FETCH_CROWDSALES_FAILED, FETCH_CROWDSALES_STARTED, FETCH_CROWDSALES_SUCCEEDED, NEW_CROWDSALE_CREATED } from '../../actions/crowdsaleActions';

class Crowdsales extends React.Component {

  render() {
    const { crowdsales, query, fetching } = this.props;
    const activeCrowdsales = crowdsales.active_crowdsales;

    // if (!query && !fetching) {
    //   return null;
    // }
    console.log(crowdsales);

    if (fetching) {
      return (<p> Searching for crowdsales like {query}...</p>);
    }

    return (
      <section className="cards">
        {
          activeCrowdsales.map((item, key) => (
            <Crowdsale item={item} key={key} />
          ))
        }
      </section>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {

    }
  )
}

export default connect(mapStateToProps)(Crowdsales);
