import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './Containers/LoginPage';
import MainPage from './Containers/MainPage';
import RegisterPage from './Containers/RegisterPage';

function Routes() {
  return (
    <div style={{ width: '100%' }}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route component={MainPage} />
      </Switch>
    </div>
  );
}

export default Routes;