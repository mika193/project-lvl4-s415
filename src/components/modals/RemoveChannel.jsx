import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import * as actions from '../../actions';
import { getCurrentChannelName } from '../../selectors';
import { removeChannelUrl } from '../../routes';

const mapStateToProps = (state) => {
  const { currentChannelId, modal: { error } } = state;
  const channelName = getCurrentChannelName(state);
  return { currentChannelId, channelName, error };
};

const actionCreators = {
  closeModal: actions.closeModal,
  setModalError: actions.setModalError,
};

@connect(mapStateToProps, actionCreators)
class RemoveChannel extends React.Component {
  removeChannel = async (e) => {
    e.preventDefault();
    const { closeModal, currentChannelId, setModalError } = this.props;
    try {
      await axios.delete(removeChannelUrl(currentChannelId));
      closeModal();
    } catch (err) {
      setModalError({ error: err });
    }
  }

  render() {
    const { closeModal, channelName, error } = this.props;
    return (
      <>
        <Modal.Header>
          <Modal.Title>{`Delete #${channelName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { error
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
            Remove
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

export default RemoveChannel;
