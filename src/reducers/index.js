import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessage](state, { payload: { message } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
    };
  },
  [actions.removeChannel](state, { payload: { id: channelID } }) {
    const { byId, allIds } = state;
    const removingIds = allIds.filter(id => byId[id].channelId === channelID);
    return {
      ...state,
      byId: _.omit(byId, removingIds),
      allIds: _.without(allIds, ...removingIds),
    };
  },
}, { byId: {}, allIds: [] });

const channels = handleActions({
  [actions.addChannel](state, { payload: { channel } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [channel.id]: channel },
      allIds: [channel.id, ...allIds],
    };
  },
  [actions.removeChannel](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      ...state,
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
}, { byId: {}, allIds: [] });

const currentChannelId = handleActions({
  [actions.setCurentChannelId](state, { payload: { id } }) {
    return id;
  },
}, '');

const socketConnectionStatus = handleActions({
  [actions.setSocketConnectionStatus](state, { payload: { status } }) {
    return status;
  },
}, 'disconnected');

const addChannelFormStatus = handleActions({
  [actions.addChannelFormOpen]() {
    return 'opened';
  },
  [actions.addChannelFormClose]() {
    return 'closed';
  },
}, 'closed');

const removeChannelSubmitWindowStatus = handleActions({
  [actions.submitingRemoveChannelWindowOpen]() {
    return 'opened';
  },
  [actions.submitingRemoveChannelWindowClose]() {
    return 'closed';
  },
}, 'closed');

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  socketConnectionStatus,
  addChannelFormStatus,
  removeChannelSubmitWindowStatus,
  form: formReducer,
});
