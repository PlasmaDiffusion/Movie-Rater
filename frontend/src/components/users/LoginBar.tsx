import React from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import LogoutButton from "./Logout";
import LoginButton from "./Login";

const LoginBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (      
  <div style={{textAlign:"right"}}>
        {isAuthenticated && user ? (
            <>
            <LogoutButton />
            <p>{user.email}</p>
            <p>{user.name}</p></>
        ) : (<LoginButton />) } 
    </div>    

  );
};


export default LoginBar;