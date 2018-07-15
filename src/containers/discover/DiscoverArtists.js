import React from 'react';
import _ from 'lodash';
import PageHeader from '../../components/page_header/PageHeader';
import { Link } from 'react-router'

import { Button, Panel } from 'react-bootstrap';
import Crowdsales from '../crowdsales/Crowdsales';

import '../../App.css';

class DiscoverArtists extends React.Component {
  render() {
    return (
      <div>
        <PageHeader />
        <section className="row">
          <Crowdsales {...this.props} />
        </section>
      </div>
    )
  }
}

export default DiscoverArtists;
