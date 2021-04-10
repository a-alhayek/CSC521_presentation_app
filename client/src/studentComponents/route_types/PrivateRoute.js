import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import CustomAppBar from '../appbar/AppBar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { username, role } = useAuth();
  const isStudent = role === 'student';

  return (
    <Route
      {...rest}
      render={props =>
        username && isStudent ? (
          <>
            <CustomAppBar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
