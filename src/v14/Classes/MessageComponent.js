const { MessageComponentInteraction, WebhookClient } = require('discord.js');
const { InteractionReplyTypes } = require('../Constants');
const { APIMessage } = require('./APIMessage');

class MessageComponent {
  constructor(client, data, menu) {
    this.client = client;

    this.id = data.custom_id;

    if (menu) this.values = data.values || [];

    this.version = data.version;

    this.token = data.token;

    this.discordID = data.id;

    this.applicationID = data.application_id;

    this.guild = data.guild_id ? client.guilds.cache.get(data.guild_id) : undefined;

    this.channel = client.channels.cache.get(data.channel_id);

    this.setupClicker(data);

    this.message = new Message(client, data.message, this.channel);

    this.reply = new InteractionReply(client, this, new WebhookClient(data.application_id, data.token, client.options));

    this.message.update = async function (content, options) {
      if (options === null || options === undefined) options = { components: null };

      const { data: d } = content instanceof APIMessage ? content.resolveData() : APIMessage.create(this, content, options).resolveData();

      return await this.client.api.interactions(data.id, data.token).callback.post({
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          data: d,
          type: InteractionReplyTypes.UPDATE_MESSAGE,
        },
      });
    };
  }

  async setupClicker(data) {
    this.clicker = {
      id: data.guild_id ? data.member.user.id : data.user.id,
      user: await this.client.users.fetch(data.guild_id ? data.member.user.id : data.user.id),
      member: this.guild ? await this.guild.members.fetch(data.guild_id ? data.member.user.id : data.user.id) : undefined,
    };
  }
}

class Message {
  constructor(client, data, channel) {
    this.client = client;
    this.channel = channel;
    this.partial = !data.content;
    this.setup(data);
  }

  async update(content, options) {
    if (options === null || options === undefined) options = { components: null };

    const { data: d } = content instanceof APIMessage ? content.resolveData() : APIMessage.create(this, content, options).resolveData();

    await this.client.api.channels(this.channel.id).messages(this.id).patch({
      data: d,
    });

    const updatedMessageData = await this.client.api.channels(this.channel.id).messages(this.id).get();
    const updatedMessage = new Message(this.client, updatedMessageData, this.channel);

    console.log('Message updated:', updatedMessage);
  }
}

module.exports = { MessageComponent, Message };
