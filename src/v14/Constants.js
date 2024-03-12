exports.MessageComponentTypes = createEnum([
  'ACTION_ROW',
  'BUTTON',
  'SELECT_MENU',
]);

exports.MessageButtonStyles = {
  blurple: 'PRIMARY',
  grey: 'SECONDARY',
  green: 'SUCCESS',
  red: 'DANGER', 
  url: 'LINK',
};

exports.MessageButtonStylesAliases = {
  PRIMARY: 'blurple',
  SECONDARY: 'grey',
  SUCCESS: 'green',
  DANGER: 'red', 
  LINK: 'url',
};

exports.InteractionReplyTypes = createEnum([
  'PONG',
  'CHANNEL_MESSAGE_WITH_SOURCE',
  'DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE', 
  'DEFERRED_UPDATE_MESSAGE', 
  'UPDATE_MESSAGE',
]);

function createEnum(keys) {
  const obj = {};
  for (const [index, key] of keys.entries()) {
    if (key === null) continue;
    obj[key] = index;
    obj[index] = key;
  }
  return obj;
}
