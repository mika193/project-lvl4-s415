import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messages = handleActions({
  [actions.addMessage](state, { payload: { message } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [message.id]: message },
      allIds: [...allIds, message.id],
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

export default combineReducers({
  messages,
  channels,
  currentChannelId,
  socketConnectionStatus,
  form: formReducer,
});
