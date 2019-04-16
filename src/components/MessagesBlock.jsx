import React from 'react';
import { uniqueId } from 'lodash';
import ScrollToBottom from 'react-scroll-to-bottom';
import { getCurrentChannelMessages } from '../selectors';
import connect from '../connect';

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
      <div className="jumbotron pt-3 pb-3 pr-2 h-75 d-flex flex-column">
        <h3 className="mb-3">{`#${activeChannel}`}</h3>
        <ScrollToBottom className="w-auto h-75 flex-grow-1">
          {messages.map(message => (
            <div key={uniqueId()}>
              <h6>{message.author}</h6>
              <p>{message.content}</p>
            </div>
          ))}
        </ScrollToBottom>
      </div>
    );
  }
}
export default MessagesBlock;
