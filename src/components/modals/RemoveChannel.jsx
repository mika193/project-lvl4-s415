import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../../connect';
import { getCurrentChannelName } from '../../selectors';

const mapStateToProps = (state) => {
  const { currentChannelId, channelRemovingState } = state;
  const channelName = getCurrentChannelName(state);
  return { currentChannelId, channelName, channelRemovingState };
};

@connect(mapStateToProps)
class RemoveChannel extends React.Component {
  removeChannel = (e) => {
    e.preventDefault();
    const { currentChannelId, makeRemoveChannelRequest } = this.props;
    makeRemoveChannelRequest(currentChannelId);
  }

  render() {
    const { closeModal, channelName, channelRemovingState } = this.props;
    return (
      <>
        <Modal.Header>
          <Modal.Title>{`Delete #${channelName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { channelRemovingState === 'failed'
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
            {channelRemovingState === 'requested' ? 'Removing......' : 'Remove channel'}
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

export default RemoveChannel;
