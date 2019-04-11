import { createAction } from 'redux-actions';

export const addMessage = createAction('MESSAGE_ADD');
export const updateNewMessageText = createAction('NEW_MESSAGE_TEXT_UPDATE');
export const setCurentChannelId = createAction('CURRENT_CHANNEL_ID_SET');
export const addChannel = createAction('CHANNEL_ADD');
export const setSocketConnectionStatus = createAction('SOCKET_CONNECTION_STATUS_SET');
