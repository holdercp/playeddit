import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthed from '../auth';

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const redirect = () => <Redirect to="/" />;

  // Renders either the component passed in as a render function
  // Or if a render prop was passed in, it just passes it along
  const component = Component ? props => <Component {...props} /> : render;

  return <Route {...rest} render={isAuthed() ? component : redirect} />;
};

export default PrivateRoute;
