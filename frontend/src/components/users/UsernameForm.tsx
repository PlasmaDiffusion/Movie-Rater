import { useMutation, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { addUser, getUser } from '../../queries/queries';

interface Props {
  updateUser: (username: string, id: string) => any;
}

// Using the logged in user's email, this will get a username and id from the database.
// If there is no username in the database, prompt the user to enter a name here.

function UsernameForm({ updateUser }: Props) {
  const { user, isAuthenticated } = useAuth0();

  const [username, setUsername] = useState('');

  const { data } = useQuery(getUser, { variables: { email: user?.email } });

  const [addUserMutation, { data: addResult }] = useMutation(addUser);

  if (data) {
    if (data.user !== null) updateUser(data.user.username, data.user.id);
  }
  if (addResult) {
    if (addResult.addUser !== null) updateUser(addResult.addUser.username, addResult.addUser.id);
  }

  function onSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    if (username !== '') {
      if (window.confirm(`Is the name ${username} okay? You won't be able to change it later.`)) {
        addUserMutation({ variables: { email: user?.email, username } });
      }
    }
  }

  if (addResult) return <></>;
  if (data?.user === null && isAuthenticated)
    return (
      <div className="reviewForm">
        <h1>Enter A Username</h1>
        <form method="POST" onSubmit={(e: any) => onSubmit(e)}>
          <p style={{ textAlign: 'center' }}>
            Please enter a <strong>username</strong> that <i>people will see in your reviews.</i>
          </p>
          <p style={{ textAlign: 'center' }}>Ignore this if you'd prefer to be anonymous.</p>

          <label>Username </label>
          <br></br>

          <input
            name="username"
            type="text"
            placeholder="Your name here..."
            onChange={(e: React.FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
          ></input>

          <br></br>
          <br></br>
          <input type="submit" value={'Submit'} />
        </form>
      </div>
    );
  return <></>;
}

export default UsernameForm;
