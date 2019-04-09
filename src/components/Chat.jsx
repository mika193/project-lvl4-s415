import React from 'react';
import MessagesBlock from './MessagesBlock';
import NewMessageForm from './NewMessageForm';

const Chat = () => (
  <div className="col-9 flex-grow-1 d-flex flex-column h-100">
    <MessagesBlock />
    <NewMessageForm />
  </div>
);

export default Chat;
