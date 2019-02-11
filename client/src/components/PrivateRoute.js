import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthed from '../auth';

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  // Either render the component wrapped in a function or the render prop directly
  // FIXME: This is realllly hard to read
  const renderThis = Component ? (
    props => (isAuthed() ? <Component {...props} /> : <Redirect to="/" />)
  ) : isAuthed() ? (
    render
  ) : (
    <Redirect to="/" />
  );
  return <Route {...rest} render={renderThis} />;
};

export default PrivateRoute;
