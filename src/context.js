import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';

if (!cookies.get('user')) {
  cookies.set('user', faker.name.findName());
}

const UserContext = React.createContext(cookies.get('user'));

export default UserContext;
