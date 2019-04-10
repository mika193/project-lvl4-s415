import React from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import { getCurrentChannelMessages } from '../selectors';

const mapStateToProps = (state) => {
  const { currentChannelId, channels: { byId: allChannels } } = state;
  const messages = getCurrentChannelMessages(state);
  const activeChannel = allChannels[currentChannelId].name;
  return { messages, activeChannel };
};

@connect(mapStateToProps)
class MessagesBlock extends React.Component {
  render() {
    const { messages, activeChannel } = this.props;
    return (
      <div className="flex-grow-1 jumbotron pt-4 overflow-auto position-relative h-100">
        <h3 className="mb-3 position-absolute channel-name">{`#${activeChannel}`}</h3>
        {messages.map(message => (
          <div key={uniqueId()}>
            <h6>{message.author}</h6>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default MessagesBlock;
