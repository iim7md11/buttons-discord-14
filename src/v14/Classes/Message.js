const { Message } = require('discord.js');
const ButtonCollector = require('./ButtonCollector');
const MenuCollector = require('./MenuCollector');
const { APIMessage } = require('./APIMessage');
const BaseMessageComponent = require('./interfaces/BaseMessageComponent');

class ExtendedMessage extends Message {
  _patch(data) {
    super._patch(data);

    if (data.components && Array.isArray(data.components) && data.components.length > 0) {
      this.components = data.components.map((c) => BaseMessageComponent.create(c));
    } else {
      this.components = [];
    }

    return this;
  }

  createButtonCollector(filter, options = {}) {
    return new ButtonCollector(this, filter, options);
  }

  awaitButtons(filter, options = {}) {
    return new Promise((resolve, reject) => {
      const collector = this.createButtonCollector(filter, options);
      collector.once('end', (buttons, reason) => {
        if (options.errors && options.errors.includes(reason)) {
          reject(buttons);
        } else {
          resolve(buttons);
        }
      });
    });
  }

  createMenuCollector(filter, options = {}) {
    return new MenuCollector(this, filter, options);
  }

  awaitMenus(filter, options = {}) {
    return new Promise((resolve, reject) => {
      const collector = this.createMenuCollector(filter, options);
      collector.once('end', (menus, reason) => {
        if (options.errors && options.errors.includes(reason)) {
          reject(menus);
        } else {
          resolve(menus);
        }
      });
    });
  }

  async reply(content, options) {
    if (!this.interaction) {
      return super.reply(content, options);
    }

    const { data, files } = await APIMessage.create(
      this.channel,
      content,
      options,
    ).resolveDataAndFiles();

    this.client.api.interactions(this.interaction.id, this.interaction.token).callback.post({
      data: {
        type: 7,
        data,
      },
    });

    return this.client.channels.cache.get(this.channel.id).messages.add(data, true);
  }

  async edit(content, options) {
    if (options === null || options === undefined) options = { components: null };
    const { data } = content instanceof APIMessage ? content.resolveData() : APIMessage.create(this, content, options).resolveData();
    return this.client.api.channels(this.channel.id).messages(this.id).patch({ data }).then((d) => {
      const clone = this._clone();
      clone._patch(d);
      return clone;
    });
  }
}

module.exports = ExtendedMessage;
