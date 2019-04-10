import React from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import { getCurrentChannelMessages } from '../selectors';
import ScrollBottom from './ScrollBottom';

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
      <div className="flex-grow-1 jumbotron pt-3 pb-3 pr-2 overflow-auto position-relative mh-100">
        <h3 className="mb-3 position-absolute channel-name">{`#${activeChannel}`}</h3>
        <ScrollBottom>
          {messages.map(message => (
            <div key={uniqueId()}>
              <h6>{message.author}</h6>
              <p>{message.content}</p>
            </div>
          ))}
        </ScrollBottom>
      </div>
    );
  }
}
export default MessagesBlock;
