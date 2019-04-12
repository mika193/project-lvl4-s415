import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import * as actions from '../actions';
import { getCurrentChannelName } from '../selectors';
import { removeChannelUrl } from '../routes';

const mapStateToProps = (state) => {
  const { removeChannelSubmitWindowStatus: windowStatus, currentChannelId } = state;
  const channelName = getCurrentChannelName(state);
  return { windowStatus, currentChannelId, channelName };
};

const actionCreators = {
  removeChannelSubmitWindowStatus: actions.removeChannelSubmitWindowStatus,
};

@connect(mapStateToProps, actionCreators)
class RemoveChannelSubmitWindow extends React.Component {
  closeWindow = (e) => {
    e.preventDefault();
    const { removeChannelSubmitWindowStatus } = this.props;
    removeChannelSubmitWindowStatus();
  }

  deleteChannel = async (e) => {
    e.preventDefault();
    const { removeChannelSubmitWindowStatus, currentChannelId } = this.props;
    try {
      await axios.delete(removeChannelUrl(currentChannelId));
      removeChannelSubmitWindowStatus();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { windowStatus, channelName } = this.props;

    return (
      <Modal show={windowStatus === 'opened'} onHide={this.closeWindow}>
        <Modal.Header>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the
          <span className="font-weight-bold">{` #${channelName}`}</span>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeWindow}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.deleteChannel}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RemoveChannelSubmitWindow;
