const { origin } = window.location;

export const addChannelUrl = () => [origin, 'api/v1/channels'].join('/');
export const addMessageUrl = id => [origin, 'api/v1/channels', id, 'messages'].join('/');
export const removeChannelUrl = id => [origin, 'api/v1/channels', id].join('/');
export const renameChannelUrl = removeChannelUrl;
