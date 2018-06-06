import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'
import { Web3Provider } from 'react-web3';


// Layouts
import App from './App'
import Home from './layouts/home/Home'
import About from './layouts/about/About'
import Dashboard from './layouts/dashboard/Dashboard'
import Profile from './user/layouts/profile/Profile'
import DiscoverArtists from './layouts/discover/DiscoverArtists';
import Funding from './layouts/funding/Funding';

// Redux Store
import store from './store'

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
          <Route path="/collaborate"/>
          <Route path="/find-bounties"/>
          <Route path="/recording-space"/>
          <Route path="/dj_offering_example"/>
          <Route path="/classical_offering_examplee"/>
          <Route path="/hipcountry_offering_example"/>
        </Route>
      </Router>
    </Provider>
),
  document.getElementById('root')
)
