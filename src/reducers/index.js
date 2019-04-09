import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
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

const currentChanelID = handleActions({
  [actions.setCurentChanelId](state, { payload: { currentChannelId } }) {
    return currentChannelId;
  },
}, '');

const currentMessage = handleActions({
  [actions.addMessage]() {
    return '';
  },
  [actions.updateNewMessageText](state, { payload: { text } }) {
    return text;
  },
}, '');

export default combineReducers({
  messages,
  channels,
  currentChanelID,
  currentMessage,
});
