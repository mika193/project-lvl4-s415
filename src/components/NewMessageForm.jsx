import React from 'react';
import axios from 'axios';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { contextDecorator } from '../context';
import { getCurrentChannelName } from '../selectors';
import { addMessageUrl } from '../routes';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { currentMessage, currentChannelId } = state;
  const channelName = getCurrentChannelName(state);
  return { currentMessage, currentChannelId, channelName };
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newMessage',
})
@contextDecorator
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
    const { reset, currentChannelId, user } = this.props;
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
      <form className="pt-4 d-flex position-relative pt-4" onSubmit={handleSubmit(this.sendMessage)}>
        {error && <div className="ml-3 popover text-danger p-1 mw-100">The message was not sent, please try again</div>}
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
