import { createAction } from 'redux-actions';
import axios from 'axios';
import * as routes from '../routes';

export const addMessage = createAction('MESSAGE_ADD');
export const updateNewMessageText = createAction('NEW_MESSAGE_TEXT_UPDATE');
export const setCurentChannelId = createAction('CURRENT_CHANNEL_ID_SET');
export const addChannel = createAction('CHANNEL_ADD');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const renameChannel = createAction('CHANNEL_RENAME');
export const setSocketConnectionStatus = createAction('SOCKET_CONNECTION_STATUS_SET');
export const openModal = createAction('MODAL_OPEN');
export const closeModal = createAction('MODAL_CLOSE');
export const setRequestError = createAction('REQUEST_ERROR_SET');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const makeAddChannelRequest = data => async (dispatch) => {
  const { addChannelUrl } = routes;
  await axios.post(addChannelUrl(), data);
  dispatch(closeModal());
};

export const makeRenameChannelRequest = (channelId, data) => async (dispatch) => {
  const { renameChannelUrl } = routes;
  await await axios.patch(renameChannelUrl(channelId), data);
  dispatch(closeModal());
};

export const makeRemoveChannelRequest = channelId => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    const { removeChannelUrl } = routes;
    await axios.delete(removeChannelUrl(channelId));
    dispatch(removeChannelSuccess());
    dispatch(closeModal());
  } catch (e) {
    dispatch(removeChannelFailure());
  }
};
