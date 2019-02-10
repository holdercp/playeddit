import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthed from '../auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthed() ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
