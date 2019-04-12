import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import App from './components/App';
import * as actions from './actions';

const initApp = ({ channels, messages, currentChannelId }) => {
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  const socket = io();

  socket.on('connect', () => {
    store.dispatch(actions.setSocketConnectionStatus({ status: 'connected' }));
  });

  socket.on('disconnect', (reason) => {
    store.dispatch(actions.setSocketConnectionStatus({ status: 'disconnected' }));
    if (reason === 'io server disconnect') {
      socket.connect();
    }
  });

  socket.on('newMessage', (message) => {
    store.dispatch(actions.addMessage({ message: message.data.attributes }));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(actions.addChannel({ channel: channel.data.attributes }));
    store.dispatch(actions.setCurentChannelId({ id: channel.data.attributes.id }));
  });

  socket.on('removeChannel', (data) => {
    store.dispatch(actions.setCurentChannelId({ id: 1 }));
    store.dispatch(actions.removeChannel({ id: data.data.id }));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(actions.renameChannel({ channel: channel.data.attributes }));
  });

  messages.forEach(message => store.dispatch(actions.addMessage({ message })));
  channels.forEach(channel => store.dispatch(actions.addChannel({ channel })));
  store.dispatch(actions.setCurentChannelId({ id: currentChannelId }));

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};

export default initApp;
