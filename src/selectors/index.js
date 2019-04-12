import { createSelector } from 'reselect';

export const getMessagesById = state => state.messages.byId;
export const getMessagesIds = state => state.messages.allIds;
export const getCurrentChannelId = state => state.currentChannelId;
export const getChannelsById = state => state.channels.byId;
export const getChannelsIds = state => state.channels.allIds;

export const messagesSelector = createSelector(
  [getMessagesById, getMessagesIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const getCurrentChannelMessages = createSelector(
  [messagesSelector, getCurrentChannelId],
  (messages, currentId) => messages.filter(({ channelId }) => channelId === currentId),
);

export const channelsSelector = createSelector(
  [getChannelsById, getChannelsIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const isCurrentChannelRemovable = createSelector(
  [getChannelsById, getCurrentChannelId],
  (byId, id) => byId[id].removable,
);

export const getCurrentChannelName = createSelector(
  [getChannelsById, getCurrentChannelId],
  (byId, id) => byId[id].name,
);
