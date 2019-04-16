
import React from 'react';

export const UserContext = React.createContext();

export const contextDecorator = Component => props => (
  <UserContext.Consumer>
    {user => <Component {...props} user={user} />}
  </UserContext.Consumer>
);
