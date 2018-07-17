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
import CssBaseline from '@material-ui/core/CssBaseline';
import {indigo500, indigo700, redA200} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  }
});
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <Router>
              <Navigation />
            </Router>
          </MuiThemeProvider>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

export default App;
