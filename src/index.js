const { Structures, Client, GatewayIntentBits } = require('discord.js');
const MessageComponentInteraction = require('./v14/Classes/MessageComponentInteraction');
const TextChannel = require('./v14/Classes/TextChannel');
const DMChannel = require('./v14/Classes/DMChannel');
const NewsChannel = require('./v14/Classes/NewsChannel');
const Message = require('./v14/Classes/Message');
const { MessageComponentTypes } = require('./v14/Constants');

var version = require('discord.js').version.split('');
if (version.includes('(')) {
  version = version.join('').split('(').pop().split('');
}
version = parseInt(version[0] + version[1]);

module.exports = (client) => {
  if (version !== 14) {
    throw new Error('The discord.js version must be v14');
  }

  if (!client || !(client instanceof Client)) {
    throw new Error("INVALID_CLIENT_PROVIDED: The Discord.js Client isn't provided or it's invalid.");
  }

  client.ws.on('INTERACTION_CREATE', (data) => {
    if (!data.data.component_type) return;

    switch (data.data.component_type) {
      case MessageComponentTypes.BUTTON:
        client.emit('clickButton', new MessageComponentInteraction(client, data));
        break;

      case MessageComponentTypes.SELECT_MENU:
        client.emit('clickMenu', new MessageComponentInteraction(client, data, true));
        break;

      default:
        client.emit('debug', `Got unknown interaction component type, ${data.data.component_type}`);
        break;
    }
  });
};

module.exports.multipleImport = (...clients) => {
  if (version !== 14) {
    throw new Error('The discord.js version must be v14');
  }

  clients.forEach((client) => {
    if (!client || !(client instanceof Client)) {
      throw new Error("INVALID_CLIENT_PROVIDED: The Discord.js Client isn't provided or it's invalid.");
    }

    client.ws.on('INTERACTION_CREATE', (data) => {
      if (!data.data.component_type) return;

      switch (data.data.component_type) {
        case MessageComponentTypes.BUTTON:
          client.emit('clickButton', new MessageComponentInteraction(client, data));
          break;

        case MessageComponentTypes.SELECT_MENU:
          client.emit('clickMenu', new MessageComponentInteraction(client, data, true));
          break;

        default:
          client.emit('debug', `Got unknown interaction component type, ${data.data.component_type}`);
          break;
      }
    });
  });
};

module.exports.MessageButton = require(`./v14/Classes/MessageButton`);
module.exports.MessageMenu = require(`./v14/Classes/MessageMenu`);
module.exports.MessageMenuOption = require(`./v14/Classes/MessageMenuOption`);
module.exports.MessageActionRow = require('./v14/Classes/MessageActionRow');
module.exports.MessageComponentInteraction = require('./v14/Classes/MessageComponentInteraction');
module.exports.Message = require(`./v14/Classes/Message`);
module.exports.ButtonCollector = require(`./v14/Classes/ButtonCollector`);
module.exports.MenuCollector = require(`./v14/Classes/MenuCollector`);
module.exports.APIMessage = require('./v14/Classes/APIMessage').APIMessage;
module.exports.sendAPICallback = require('./v14/Classes/APIMessage').sendAPICallback;
module.exports.DMChannel = require('./v14/Classes/DMChannel');
module.exports.NewsChannel = require('./v14/Classes/NewsChannel');
module.exports.TextChannel = require('./v14/Classes/TextChannel');
module.exports.WebhookClient = require('./v14/Classes/WebhookClient');
module.exports.Util = require('./v14/Util');
module.exports.Constants = require('./v14/Constants');
module.exports.InteractionReply = require(`./v14/Classes/managers/InteractionReply`);
