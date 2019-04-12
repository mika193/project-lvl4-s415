import { createAction } from 'redux-actions';

export const addMessage = createAction('MESSAGE_ADD');
export const updateNewMessageText = createAction('NEW_MESSAGE_TEXT_UPDATE');
export const setCurentChannelId = createAction('CURRENT_CHANNEL_ID_SET');
export const addChannel = createAction('CHANNEL_ADD');
export const removeChannel = createAction('CHANNEL_REMOVE');
export const setSocketConnectionStatus = createAction('SOCKET_CONNECTION_STATUS_SET');
export const addChannelFormOpen = createAction('ADD_CHANNEL_FORM_OPEN');
export const addChannelFormClose = createAction('ADD_CHANNEL_FORM_CLOSE');
export const submitingRemoveChannelWindowOpen = createAction('SUBMITING_REMOVE_CHANNEL_WINDOW_OPEN');
export const submitingRemoveChannelWindowClose = createAction('SUBMITING_REMOVE_CHANNEL_WINDOW_CLOSE');
