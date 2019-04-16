import React from 'react';
import { Modal } from 'react-bootstrap';
import connect from '../../connect';
import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const mapStateToProps = (state) => {
  const { modal } = state;
  return { modal };
};

const modalMap = {
  addChannel: <AddChannel />,
  removeChannel: <RemoveChannel />,
  renameChannel: <RenameChannel />,
};

@connect(mapStateToProps)
class ModalWindow extends React.Component {
  closeWindow = (e) => {
    e.preventDefault();
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const { modal } = this.props;

    return (
      <Modal show={modal.status === 'opened'} onHide={this.closeWindow}>
        {modalMap[modal.type]}
      </Modal>
    );
  }
}

export default ModalWindow;
