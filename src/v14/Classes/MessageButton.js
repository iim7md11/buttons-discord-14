const { MessageActionRow, MessageButtonStyles, MessageComponentTypes } = require('discord.js');
const { resolveString } = require('discord.js').Util;
const { resolveStyle } = require('../Util');

class MessageButton {
  constructor(data = {}) {
    this.type = MessageComponentTypes.BUTTON;
    this.style = 'style' in data ? resolveStyle(data.style) : null;
    this.label = 'label' in data && data.label ? resolveString(data.label) : undefined;
    this.disabled = 'disabled' in data ? data.disabled : false;

    if (data.emoji) this.setEmoji(data.emoji);

    if ('url' in data && data.url) this.url = resolveString(data.url);
    else this.url = undefined;

    if (('id' in data && data.id) || ('custom_id' in data && data.custom_id)) this.customId = data.id || data.custom_id;
    else this.customId = undefined;
  }

  setStyle(style) {
    this.style = resolveStyle(style);
    return this;
  }

  setLabel(label) {
    this.label = resolveString(label);
    return this;
  }

  setDisabled(disabled) {
    this.disabled = !!disabled;
    return this;
  }

  setURL(url) {
    this.url = resolveString(url);
    return this;
  }

  setCustomId(id) {
    this.customId = resolveString(id);
    return this;
  }

  setEmoji(emoji, animated) {
    if (!emoji) throw new Error('MISSING_EMOJI: You used `.setEmoji` method without providing an emoji.');

    this.emoji = {
      id: undefined,
      name: undefined,
    };

    if (!isNaN(emoji)) this.emoji.id = emoji;
    if (!isNaN(emoji.id)) this.emoji.id = emoji.id;
    if (emoji.name) this.emoji.name = emoji.name;

    if (!this.emoji.id && !this.emoji.name) this.emoji.name = emoji;

    if (typeof animated === 'boolean') this.emoji.animated = animated;

    return this;
  }

  toJSON() {
    return {
      type: MessageComponentTypes.BUTTON,
      style: this.style,
      label: this.label,
      emoji: this.emoji,
      disabled: this.disabled,
      url: this.url,
      custom_id: this.customId,
    };
  }
}

module.exports = MessageButton;
