import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import faker from 'faker';
import cookies from 'js-cookie';
import reducers from './reducers';
import App from './components/App';
import * as actions from './actions';
import { UserContext } from './context';


const initApp = ({ channels, messages, currentChannelId }) => {
  /* eslint-disable no-underscore-dangle */
  const defaultChannelId = 1;
  if (!cookies.get('user')) {
    cookies.set('user', faker.name.findName());
  }

  const user = cookies.get('user');

  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
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
    store.dispatch(actions.setCurentChannelId({ id: defaultChannelId }));
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
      <UserContext.Provider value={user}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default initApp;
