import React from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';

const mapStateToProps = (state) => {
  const { messages: { byId, allIds }, currentChanelID, channels: { byId: allChannels } } = state;
  const messages = allIds.map(id => byId[id]);
  const activeChanel = allChannels[currentChanelID].name;
  return { messages, activeChanel };
};

const MessagesBlock = ({ messages, activeChanel }) => (
  <div className="flex-grow-1 jumbotron pt-4">
    <h3 className="mb-3">{`#${activeChanel}`}</h3>
    {messages.map(message => (
      <div key={uniqueId()}>
        <h6>{message.author}</h6>
        <p>{message.content}</p>
      </div>
    ))}
  </div>
);

export default connect(mapStateToProps)(MessagesBlock);
