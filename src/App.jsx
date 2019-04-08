import React from 'react';
import ReactDOM from 'react-dom';
import { uniqueId } from 'lodash';

class App extends React.Component {
  state = {
    currentMessage: '',
    activeChanel: 'general',
    messages: [],
  }

  onMessageTyping = ({ target: { value } }) => {
    this.setState({ currentMessage: value });
  }

  sendMessage = (e) => {
    e.preventDefault();
    const { messages, currentMessage } = this.state;
    this.setState({ messages: [...messages, currentMessage], currentMessage: '' });
  }

  render() {
    const { channels } = this.props;
    const { currentMessage, activeChanel, messages } = this.state;

    return (
      <div className="d-flex h-100">
        <ul className="list-group col-3">
          {channels.map(({ id, name }) => (
            <li className="list-group-item list-group-item-action" key={id}>
              <button type="button" className="btn btn-link">{name}</button>
            </li>
          ))}
        </ul>
        <div className="col-9 flex-grow-1 d-flex flex-column h-100">
          <div className="flex-grow-1 jumbotron pt-4">
            <h3 className="mb-3">{`#${activeChanel}`}</h3>
            {messages.map(message => <p key={uniqueId()}>{message}</p>)}
          </div>
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
        </div>
      </div>
    );
  }
}

export default (channels) => {
  ReactDOM.render(<App channels={channels} />, document.getElementById('chat'));
};
