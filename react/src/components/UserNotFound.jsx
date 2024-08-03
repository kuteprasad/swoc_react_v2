import React from 'react';
import { Link } from 'react-router-dom';

const UserNotFound = () => {
  return (
    <div>
      <h2>404 - User Not Found</h2>
      <p>Sorry, the user you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default UserNotFound;
