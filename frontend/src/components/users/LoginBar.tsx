import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './Logout';
import LoginButton from './Login';
import './login.scss';

const LoginBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  //Make button zIndex be 1 when highlighting. This is to prevent the login section from popping up after clicking a movie.
  const [buttonPopOut, setButtonPopOut] = useState(false);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div onMouseOver={()=>{setButtonPopOut(true);}} onMouseOut={()=>{setButtonPopOut(false);}}>
      <>
        <div className="navGrid">
          <p className="user" style={{zIndex: buttonPopOut ? 1 : 0}}>
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
