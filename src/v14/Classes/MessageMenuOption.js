const { Util } = require('discord.js');

class MessageMenuOption {
  constructor(data = {}) {
    this.setup(data);
  }

  setup(data) {
    this.label = 'label' in data && data.label ? Util.cleanContent(data.label, null, null) : undefined;

    this.value = 'value' in data && data.value ? Util.cleanContent(data.value, null, null) : undefined;

    if (data.emoji) this.setEmoji(data.emoji);

    this.description = 'description' in data ? Util.cleanContent(data.description, null, null) : undefined;

    return this;
  }

  setLabel(label) {
    this.label = Util.cleanContent(label, null, null);
    return this;
  }

  setValue(value) {
    this.value = Util.cleanContent(value, null, null);
    return this;
  }

  setDescription(value) {
    this.description = Util.cleanContent(value, null, null);
    return this;
  }

  setDefault(def = true) {
    this.default = def;
    return this;
  }

  setEmoji(emoji, animated) {
    if (!emoji) throw new Error('MISSING_EMOJI: On this option was used `.setEmoji` method without emoji');

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
      label: this.label,
      value: this.value,
      default: this.default,
      emoji: this.emoji,
      description: this.description,
    };
  }
}

module.exports = MessageMenuOption;
