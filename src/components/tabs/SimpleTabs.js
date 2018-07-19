import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import TabContainer from './TabContainer';

const styles = theme => ({
  tabsWrapper: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const popularCrowdsales = this.props.children;

    return (
      <div className="tabsWrapper">
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Popular" />
            <Tab label="Newest" />
          </Tabs>
        </AppBar>

        {value === 0 && <TabContainer>{popularCrowdsales}</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>
    );
  }
}

export default withStyles(styles)(SimpleTabs);
