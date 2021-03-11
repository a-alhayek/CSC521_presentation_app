import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { username } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        username && username.charAt(0) === 's' ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
