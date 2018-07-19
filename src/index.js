import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'
import { Web3Provider } from 'react-web3';


// Layouts
import App from './App'
import Home from './components/home/Home'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './containers/user/Profile'
import Funding from './containers/funding/Funding';
import Wallet from './containers/wallet/Wallet';

// Redux Store
import store from './store';

console.log('initial state => ', store.getState());
//
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="/get-funded" component={Funding}/>
          <Route path="/find-bounties" />
          <Route path="/wallet" component={Wallet} />
        </Route>
      </Router>
    </Provider>
),
  document.getElementById('root')
)
