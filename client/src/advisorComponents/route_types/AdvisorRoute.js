import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../studentComponents/auth/auth';
import CustomAppBar from '../advisor_bar/AdvisorBar';

const AdvisorRoute = ({ component: Component, ...rest }) => {
  const { username, role } = useAuth();
  const isAdvisor = role === 'advisor';

  return (
    <Route
      {...rest}
      render={props =>
        username && isAdvisor ? (
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

export default AdvisorRoute;
