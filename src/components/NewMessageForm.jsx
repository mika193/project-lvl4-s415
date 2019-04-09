import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import cookies from 'js-cookie';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { currentMessage, currentChanelID } = state;
  return { currentMessage, currentChanelID };
};

const actionCreators = {
  updateNewMessageText: actions.updateNewMessageText,
};

const userContext = React.createContext(cookies.get('user'));

class MessagesBlock extends React.Component {
  onMessageTyping = ({ target: { value } }) => {
    const { updateNewMessageText } = this.props;
    updateNewMessageText({ text: value });
  }

  sendMessage = (e) => {
    e.preventDefault();
    const sendData = async () => {
      const user = this.context;
      console.log(user);
      const { currentChannelId, currentMessage } = this.props;
      const data = {
        data: {
          attributes: { author: user, content: currentMessage },
        },
      };
      try {
        axios.post(`http://localhost:4000/api/v1/channels/${currentChannelId}/messages`, data);
        /* const { attributes: message } = request.data.data;
        this.setState({ messages: [...messages, message], currentMessage: '' }); */
      } catch (err) {
        console.log(err);
        sendData();
      }
    };
    sendData();
  }

  render() {
    const { currentMessage } = this.props;

    return (
      <form className="pt-3 d-flex" onSubmit={this.sendMessage}>
        <input
          type="text"
          name="message"
          className="form-control"
          id="message"
          placeholder="Message #general"
          onChange={this.onMessageTyping}
          value={currentMessage}
        />
        <button className="btn btn-primary ml-1" type="submit">Отправить</button>
      </form>
    );
  }
}

MessagesBlock.contextType = userContext;
export default connect(mapStateToProps, actionCreators)(MessagesBlock);
