const { MessageEmbed } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { sendAPICallback } = require('./APIMessage');

class ExtendedWebhookClient {
  constructor(client, id, token) {
    this.client = client;
    this.id = id;
    this.token = token;
  }

  async editMessage(message, content, options) {
    if (content && content.embed instanceof MessageEmbed) {
      options = options || {};
      options.embeds = options.embeds || [];
      options.embeds.push(content.embed);
      content = null;
    }

    if (options && options.embed) {
      options = options || {};
      options.embeds = options.embeds || [];
      options.embeds.push(options.embed);
      options.embed = null;
    }

    let apiMessage;

    if (content instanceof sendAPICallback) {
      apiMessage = content.resolveData();
    } else {
      apiMessage = sendAPICallback.create(this.client, content, options).resolveData();
    }

    const { data, files } = await apiMessage.resolveFiles();

    return this.client.api
      .webhooks(this.id, this.token)
      .messages(typeof message === 'string' ? message : message.id)
      .patch({
        data,
        files,
      });
  }

  async deleteMessage(message) {
    await this.client.api
      .webhooks(this.id, this.token)
      .messages(typeof message === 'string' ? message : message.id)
      .delete();
  }

  async fetchMessage(message, cache = true) {
    const data = await this.client.api
      .webhooks(this.id, this.token)
      .messages(typeof message === 'string' ? message : message.id)
      .get();

    return this.client.channels
      ? this.client.channels.cache.get(data.channel_id)
        ? this.client.channels.cache.get(data.channel_id).messages.add(data, cache)
        : null
      : data;
  }
}

module.exports = ExtendedWebhookClient;
