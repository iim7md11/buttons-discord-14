const { Structures } = require('discord.js');
const { APIMessage } = require('./APIMessage');

const ExtendedNewsChannel = Structures.extend('NewsChannel', (NewsChannel) => {
  class ExtendedNewsChannel extends NewsChannel {
    async send(content, options) {
      const { User, GuildMember } = require('discord.js');

      if (this instanceof User || this instanceof GuildMember) {
        return this.createDM().then((dm) => dm.send(content, options));
      }

      let apiMessage;

      if (content instanceof APIMessage) {
        apiMessage = content.resolveData();
      } else {
        apiMessage = APIMessage.create(this, content, options).resolveData();
      }

      if (Array.isArray(apiMessage.data.content)) {
        return Promise.all(apiMessage.data.content.map((c) => this.send(c, options)));
      }

      const { data, files } = await apiMessage.resolveFiles();
      const result = await this.client.api.channels(this.id).messages.post({ data, files });
      return this.client.actions.MessageCreate.handle(result).message;
    }
  }

  return ExtendedNewsChannel;
});

module.exports = ExtendedNewsChannel;
