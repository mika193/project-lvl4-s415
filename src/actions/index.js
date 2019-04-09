import { createAction } from 'redux-actions';

export const addMessage = createAction('MESSAGE_ADD');
export const updateNewMessageText = createAction('NEW_MESSAGE_TEXT_UPDATE');
export const setCurentChanelId = createAction('CURRENT_CHANEL_ID_SET');
export const addChannel = createAction('CHANNEL_ADD');
