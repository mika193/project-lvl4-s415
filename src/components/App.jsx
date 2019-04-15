import React from 'react';
import Channels from './Channels';
import MessagesBlock from './MessagesBlock';
import NewMessageForm from './NewMessageForm';
import NetworkStatusMessage from './NetworkStatusMessage';

const App = () => (
  <div className="d-flex h-100">
    <Channels />
    <div className="col-9 flex-grow-1 d-flex flex-column h-100">
      <MessagesBlock />
      <NewMessageForm />
      <NetworkStatusMessage />
    </div>
  </div>
);

export default App;
