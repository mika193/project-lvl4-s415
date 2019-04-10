import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import UserContext from '../context';

const mapStateToProps = (state) => {
  const { currentMessage, currentChannelId } = state;
  return { currentMessage, currentChannelId };
};

const contextType = (target) => {
  // eslint-disable-next-line no-param-reassign
  target.contextType = UserContext;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newMessage',
})
@contextType
class MessagesBlock extends React.Component {
  sendMessage = async (values) => {
    const user = this.context;
    const { reset } = this.props;
    const { message } = values;
    const { currentChannelId } = this.props;
    const { href } = window.location;
    const data = {
      data: {
        attributes: { author: user, content: message },
      },
    };

    try {
      await axios.post(`${href}api/v1/channels/${currentChannelId}/messages`, data);
      reset();
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
  };

  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <form className="pt-3 d-flex position-relative pt-4" onSubmit={handleSubmit(this.sendMessage)}>
        {error && <div className="ml-3 position-absolute send-error-message text-danger">Сообщение не было отправлено, повторите попытку</div>}
        <Field
          type="text"
          name="message"
          className="form-control"
          component="input"
          placeholder="Message #general"
        />
        <button className="btn btn-primary ml-1" disabled={submitting} type="submit">
          {submitting ? 'Отправляется..' : 'Отправить'}
        </button>
      </form>
    );
  }
}

export default MessagesBlock;
