import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import UserContext from '../context';
import { getCurrentChannelName } from '../selectors';
import { addMessageUrl } from '../routes';

const mapStateToProps = (state) => {
  const { currentMessage, currentChannelId } = state;
  const channelName = getCurrentChannelName(state);
  return { currentMessage, currentChannelId, channelName };
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
  componentDidMount() {
    this.focusField();
  }

  componentDidUpdate() {
    this.focusField();
  }

  focusField = () => {
    const field = this.input.getRenderedComponent();
    field.focus();
  }

  sendMessage = async (values) => {
    const user = this.context;
    const { reset, currentChannelId } = this.props;
    const { message } = values;
    const data = {
      data: {
        attributes: { author: user, content: message },
      },
    };

    try {
      await axios.post(addMessageUrl(currentChannelId), data);
      reset();
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
  };

  render() {
    const {
      handleSubmit, submitting, error, channelName,
    } = this.props;
    return (
      <form className="pt-3 d-flex position-relative pt-4" onSubmit={handleSubmit(this.sendMessage)}>
        {error && <div className="ml-3 position-absolute send-error-message text-danger">The message was not sent, please try again</div>}
        <Field
          type="text"
          name="message"
          className="form-control col-10"
          component="input"
          placeholder={`Message #${channelName}`}
          ref={(input) => { (this.input = input); }}
          forwardRef
        />
        <button className="btn btn-primary ml-1 col-2" disabled={submitting} type="submit">
          {submitting ? 'Sending.....' : 'Send message'}
        </button>
      </form>
    );
  }
}

export default MessagesBlock;
