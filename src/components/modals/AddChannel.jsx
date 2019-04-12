import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../../actions';
import { addChannelUrl } from '../../routes';

const mapStateToProps = state => state;

const actionCreators = {
  closeModal: actions.closeModal,
};

@reduxForm({
  form: 'newChannel',
})
@connect(mapStateToProps, actionCreators)
class AddChannel extends React.Component {
  closeWindow = (e) => {
    e.preventDefault();
    const { closeModal } = this.props;
    closeModal();
  }

  addChannel = async (values) => {
    const { reset, closeModal } = this.props;
    const { channel } = values;
    const data = {
      data: {
        attributes: { name: channel },
      },
    };

    try {
      await axios.post(addChannelUrl(), data);
      reset();
      closeModal();
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
  }

  render() {
    const {
      closeModal, handleSubmit, submitting, error,
    } = this.props;

    return (
      <>
        <Modal.Header>
          <Modal.Title>Add channel</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(this.addChannel)}>
          <Modal.Body>
            {error && <div className="ml-3 position-absolute send-error-message text-danger">Channel not added, please try again</div>}
            <Field
              type="text"
              name="channel"
              className="form-control col-12 mb-2"
              component="input"
              placeholder="Enter new channel name..."
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" disabled={submitting} type="submit">
              {submitting ? 'Adding.....' : 'Add channel'}
            </Button>
          </Modal.Footer>
        </form>
      </>
    );
  }
}

export default AddChannel;
