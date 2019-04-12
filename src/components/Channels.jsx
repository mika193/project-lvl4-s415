import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { channelsSelector, isCurrentChannelRemovable } from '../selectors';
import * as actions from '../actions';
import ModalWindow from './modals/ModalWindow';

const mapStateToProps = (state) => {
  const { currentChannelId, modal } = state;
  const channels = channelsSelector(state);
  const removable = isCurrentChannelRemovable(state);
  return {
    channels, currentChannelId, modal, removable,
  };
};

const actionCreators = {
  setCurentChannelId: actions.setCurentChannelId,
  openModal: actions.openModal,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  channelClick = id => (e) => {
    e.preventDefault();
    const { setCurentChannelId, currentChannelId } = this.props;
    if (currentChannelId !== id) {
      setCurentChannelId({ id });
    }
  }

  renderChannel = ({ id, name }) => {
    const { currentChannelId } = this.props;
    const classes = cn({
      'list-group-item list-group-item-action': true,
      active: currentChannelId === id,
    });

    return (
      <a href={`#${name}`} className={classes} onClick={this.channelClick(id)} key={id}>
        {`#${name}`}
      </a>
    );
  }

  openModal = type => (e) => {
    e.preventDefault();
    const { openModal } = this.props;
    openModal({ type });
  }

  render() {
    const { channels, modal, removable } = this.props;
    return (
      <div className="col-3 align-self-stretch d-flex flex-column">
        <div className="list-group mb-4">
          {channels.map(this.renderChannel)}
        </div>
        <button type="button" className="btn btn-outline-secondary mb-2" onClick={this.openModal('addChannel')}>Add a Channel</button>
        {removable && (
          <div className="d-flex mt-auto">
            <button type="button" className="btn btn-danger btn-sm mr-1" onClick={this.openModal('removeChannel')}>Remove channel</button>
            <button type="button" className="btn btn-warning btn-sm" onClick={this.openModal('renameChannel')}>Rename channel</button>
          </div>
        )}
        {modal.status === 'opened' && <ModalWindow />}
      </div>
    );
  }
}

export default Channels;
