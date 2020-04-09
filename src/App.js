import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './page/Home';
import Movie from './page/Movie';
import Show from './page/Show';

import './App.scss';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/movies/:id" component={Movie} />
        <Route path="/tv_shows/:id" component={Show} />
        <Route path="/" component={Home} />
        <Route path="*" component={Home} />
      </Switch>
    </div>
  </Router>
);

export default App;
