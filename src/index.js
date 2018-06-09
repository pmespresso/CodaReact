import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'
import { Web3Provider } from 'react-web3';


// Layouts
import App from './App'
import Home from './containers/home/Home'
import About from './containers/about/About'
import Dashboard from './containers/dashboard/Dashboard'
import Profile from './containers/user//Profile'
import DiscoverArtists from './containers/discover/DiscoverArtists';
import Funding from './containers/funding/Funding';

import KANYE_OFFERING_EXAMPLE from './containers/discover/KANYEOFFERINGEXAMPLE';

// Redux Store
import store from './store'
//
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="/how-it-works" component={About} />
          <Route path="/discover-artists" component={DiscoverArtists}/>
          <Route path="/get-funded" component={Funding}/>
          <Route path="/kanye_offering_example" component={KANYE_OFFERING_EXAMPLE}/>
          <Route path="/find-bounties"/>
        </Route>
      </Router>
    </Provider>
),
  document.getElementById('root')
)
