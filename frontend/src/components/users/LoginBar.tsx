import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './Logout';
import LoginButton from './Login';
import './login.scss';

const LoginBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <>
        <div className="navGrid">
          <p className="user">
            {isAuthenticated && user ? (
              <>
                <LogoutButton />
                {user.email}
              </>
            ) : (
              <LoginButton />
            )}
          </p>
          <h3 className="title">Movie Rater</h3>
        </div>
      </>
    </div>
  );
};

export default LoginBar;
