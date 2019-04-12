import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';
import { addChannelUrl } from '../routes';

const mapStateToProps = state => state;

const actionCreators = {
  addChannelFormClose: actions.addChannelFormClose,
};

@reduxForm({
  form: 'newChannel',
})
@connect(mapStateToProps, actionCreators)
class AddChannelForm extends React.Component {
  addChannel = async (values) => {
    const { reset, addChannelFormClose } = this.props;
    const { channel } = values;
    const data = {
      data: {
        attributes: { name: channel },
      },
    };

    try {
      await axios.post(addChannelUrl(), data);
      reset();
      addChannelFormClose();
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
  }

  closeForm = (e) => {
    e.preventDefault();
    const { addChannelFormClose } = this.props;
    addChannelFormClose();
  }

  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <form className="pt-3 d-flex flex-column position-relative pt-4" onSubmit={handleSubmit(this.addChannel)}>
        {error && <div className="ml-3 position-absolute send-error-message text-danger">Channel not added, please try again</div>}
        <Field
          type="text"
          name="channel"
          className="form-control col-12 mb-2"
          component="input"
          placeholder="Enter new channel name..."
        />
        <div className="col-12 pl-0 pr-0 d-flex justify-content-between">
          <button className="btn btn-secondary col-5" type="button" onClick={this.closeForm}>Cancel</button>
          <button className="btn btn-primary col-6" disabled={submitting} type="submit">
            {submitting ? 'Adding.....' : 'Add channel'}
          </button>
        </div>
      </form>
    );
  }
}

export default AddChannelForm;
