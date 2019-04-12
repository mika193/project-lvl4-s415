import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { channelsSelector, isCurrentChannelRemovable } from '../selectors';
import * as actions from '../actions';
import AddChannelForm from './AddChannelForm';
import RemoveChannelSubmitWindow from './RemoveChannelSubmittWindow';

const mapStateToProps = (state) => {
  const { currentChannelId, addChannelFormStatus } = state;
  const channels = channelsSelector(state);
  const removable = isCurrentChannelRemovable(state);
  return {
    channels, currentChannelId, addChannelFormStatus, removable,
  };
};

const actionCreators = {
  setCurentChannelId: actions.setCurentChannelId,
  addChannelFormOpen: actions.addChannelFormOpen,
  removeChannelSubmitWindowOpen: actions.removeChannelSubmitWindowOpen,
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

  openAddChannelForm = (e) => {
    e.preventDefault();
    const { addChannelFormOpen } = this.props;
    addChannelFormOpen();
  }

  removeChannelClick = (e) => {
    e.preventDefault();
    const { removeChannelSubmitWindowOpen } = this.props;
    removeChannelSubmitWindowOpen();
  }

  render() {
    const { channels, addChannelFormStatus, removable } = this.props;
    return (
      <div className="col-3">
        <div className="list-group mb-4">
          {channels.map(this.renderChannel)}
        </div>
        {addChannelFormStatus === 'opened' ? <AddChannelForm />
          : <button type="button" className="btn btn-outline-secondary" onClick={this.openAddChannelForm}>Add a Channel</button>}
        {removable && (
          <>
            <button type="button" className="btn btn-outline-secondary" onClick={this.removeChannelClick}>Remove current channel</button>
            <RemoveChannelSubmitWindow />
          </>
        )}
      </div>
    );
  }
}

export default Channels;
