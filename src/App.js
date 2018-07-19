import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './containers/user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './containers/user/ui/logoutbutton/LogoutButtonContainer'
import Navigation from './containers/nav/Navigation';

import { BrowserRouter as Router, Route } from "react-router-dom";

// contract stuff
import CodaMusicTokensRegistry from '../build/contracts/CodaMusicTokensRegistry.json'
import getWeb3 from './util/getWeb3';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//router history
// import createBrowserHistory from 'history/createBrowserHistory'
// const customHistory = createBrowserHistory()

// redux
import { Provider } from 'react-redux';
import store from './store';


// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import codaTheme from './config/theme';

const theme = createMuiTheme(codaTheme)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
              <Router>
                <Navigation />
              </Router>
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
