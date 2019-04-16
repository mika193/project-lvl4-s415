import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../../connect';
import { getCurrentChannelName } from '../../selectors';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  const channelName = getCurrentChannelName(state);
  return { channelName, currentChannelId };
};

@reduxForm({
  form: 'renameChannel',
})
@connect(mapStateToProps)
class RenameChannel extends React.Component {
  componentDidMount() {
    this.focusField();
  }

  componentDidUpdate() {
    this.focusField();
  }

  focusField = () => {
    if (this.input) {
      const field = this.input.getRenderedComponent();
      field.focus();
    }
  }

  closeWindow = (e) => {
    e.preventDefault();
    const { closeModal } = this.props;
    closeModal();
  }

  renameChannel = async (values) => {
    const { reset, makeRenameChannelRequest, currentChannelId } = this.props;
    const { channel } = values;
    const data = {
      data: {
        attributes: { name: channel },
      },
    };

    try {
      await makeRenameChannelRequest(currentChannelId, data);
      reset();
    } catch (err) {
      throw new SubmissionError({ _error: err.message });
    }
  }

  render() {
    const {
      closeModal, handleSubmit, submitting, error, channelName,
    } = this.props;

    return (
      <>
        <Modal.Header>
          <Modal.Title>{`Rename #${channelName}`}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(this.renameChannel)}>
          <Modal.Body>
            { error
              ? (<p>Could not rename channel. Check the connection and try again later.</p>)
              : (
                <Field
                  type="text"
                  name="channel"
                  className="form-control col-12 mb-2"
                  component="input"
                  placeholder="Enter new channel name..."
                  ref={(input) => { (this.input = input); }}
                  forwardRef
                />
              )
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" disabled={submitting} type="submit">
              {submitting ? 'Renaming.....' : 'Rename channel'}
            </Button>
          </Modal.Footer>
        </form>
      </>
    );
  }
}

export default RenameChannel;
