import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import UserTab from './components/UserTab';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user" component={UserTab} />
      </Switch>
    </Router>
  );
}

export default AppRouter;