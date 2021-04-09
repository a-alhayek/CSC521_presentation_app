import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../studentComponents/auth/auth';
import CustomAppBar from '../admin_bar/AdminBar';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { username, role } = useAuth();
  const isAdmin = role === 'admin';

  return (
    <Route
      {...rest}
      render={props =>
        username && isAdmin ? (
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

export default AdminRoute;
