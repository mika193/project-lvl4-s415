import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';
import * as actions from './actions';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


const initApp = ({ channels, messages, currentChannelId }) => {
  if (!cookies.get('user')) {
    cookies.set('user', faker.name.findName());
  }

  const socket = io();
  socket.on('newMessage', (message) => {
    console.log(message.data.attributes);
    store.dispatch(actions.addMessage({ message: message.data.attributes }));
  });

  messages.forEach(message => store.dispatch(actions.addMessage({ message })));
  channels.forEach(channel => store.dispatch(actions.addChannel({ channel })));
  store.dispatch(actions.setCurentChanelId({ currentChannelId }));

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};

export default initApp;
