import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import * as actions from '../../actions';
import { getCurrentChannelName } from '../../selectors';
import { removeChannelUrl } from '../../routes';

const mapStateToProps = (state) => {
  const { currentChannelId, requestState } = state;
  const channelName = getCurrentChannelName(state);
  return { currentChannelId, channelName, requestState };
};

const actionCreators = {
  closeModal: actions.closeModal,
  setRequestError: actions.setRequestError,
  startRequest: actions.startRequest,
  finishRequest: actions.finishRequest,
};

@connect(mapStateToProps, actionCreators)
class RemoveChannel extends React.Component {
  removeChannel = async (e) => {
    e.preventDefault();
    const {
      closeModal, currentChannelId, setRequestError, startRequest, finishRequest,
    } = this.props;
    startRequest();
    try {
      await axios.delete(removeChannelUrl(currentChannelId));
      finishRequest();
      closeModal();
    } catch (err) {
      setRequestError();
    }
  }

  render() {
    const { closeModal, channelName, requestState } = this.props;
    return (
      <>
        <Modal.Header>
          <Modal.Title>{`Delete #${channelName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { requestState === 'error'
            ? (<p>Could not delete channel. Check the connection and try again later.</p>)
            : (
              <p>
                Are you sure you want to delete the
                <span className="font-weight-bold">{` #${channelName}`}</span>
                ?
              </p>
            )
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.removeChannel}>
            {requestState === 'requested' ? 'Removing......' : 'Remove channel'}
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

export default RemoveChannel;
