import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { checkingFinish, startChecking } from '../actions/auth';
import { startLoadingFeed, startLoadingFollowers } from '../actions/tweets';

import { LoginRegister } from '../components/auth/LoginRegister';
import { Feed } from '../components/dashboard/Feed';
import { TopNavbar } from '../components/nav/TopNavbar';
import { ProfileView } from '../components/profile/ProfileView';
import { Loader, LoaderContainer } from '../styles/reusableStyles';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(startChecking());
      dispatch(startLoadingFollowers());
      dispatch(startLoadingFeed());
    } else dispatch(checkingFinish());
  }, [dispatch]);

  const { uid, checking } = useSelector((state) => state.auth);
  if (checking) {
    return (
      <LoaderContainer>
        <Loader></Loader>
      </LoaderContainer>
    );
  }

  return (
    <Router>
      <div>
        <TopNavbar />
        <Switch>
          <PublicRoute
            path="/login"
            isAuthenticated={!!uid}
            component={LoginRegister}
          />
          <PrivateRoute
            exact
            path="/"
            isAuthenticated={!!uid}
            component={Feed}
          />
          <PrivateRoute
            path="/user/:userId"
            isAuthenticated={!!uid}
            component={ProfileView}
          />
        </Switch>
      </div>
    </Router>
  );
};
