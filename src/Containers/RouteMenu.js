import React from 'react';
import { Route, Switch , Redirect} from 'react-router-dom';
import GiphyPage from './GiphyPage';
import FavoritePage from './FavoritePage';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';

function Routes() {
  return (
    <div style={{ width: '100%' }}>
      <Switch>
        <Route exact path="/home" component={GiphyPage} />
        <Route exact path="/favorite" component={FavoritePage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/search" component={SearchPage} />
        <Redirect from="/*" exact to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
