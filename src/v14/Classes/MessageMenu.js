const { MessageActionRow, MessageSelectMenu, MessageComponentTypes } = require('discord.js');
const { resolveMaxValues, resolveMinValues } = require('../Util.js');
const MessageMenuOption = require('./MessageMenuOption.js');

class MessageMenu extends MessageSelectMenu {
  constructor(data = {}) {
    super();
    this.setup(data);
  }

  setup(data) {
    this.placeholder = 'placeholder' in data ? data.placeholder : null;

    this.maxValues = ('maxValues' in data) | ('max_values' in data) ? resolveMaxValues(data.maxValues, data.max_values) : undefined;

    this.minValues = ('minValues' in data) | ('min_values' in data) ? resolveMinValues(data.minValues, data.min_values) : undefined;

    if ('option' in data) {
      data.option.type = 'SELECT_MENU_OPTION';
      this.addOption(new MessageMenuOption(data.option));
    }

    if ('options' in data) {
      data.options.map((c) => {
        this.addOptions(new MessageMenuOption(c));
      });
    }

    if (('id' in data && data.id) || ('custom_id' in data && data.custom_id)) this.customId = data.id || data.custom_id;
    else this.customId = undefined;

    return this;
  }

  setPlaceholder(label) {
    this.placeholder = label;
    return this;
  }

  setCustomId(id) {
    this.customId = id;
    return this;
  }

  setMaxValues(number) {
    this.maxValues = resolveMaxValues(number);
    return this;
  }

  setMinValues(number) {
    this.minValues = resolveMinValues(number);
    return this;
  }

  addOption(option) {
    option.type = 'SELECT_MENU_OPTION';
    this.addOptions(option);
    return this;
  }

  addOptions(...options) {
    options.flat(Infinity).forEach((c) => this.addOption(new MessageMenuOption(c)));
    return this;
  }

  removeOptions(index, deleteCount, ...options) {
    this.components.splice(index, deleteCount, ...options.flat(Infinity).map((c) => new MessageMenuOption(c).toJSON()));
    return this;
  }

  toJSON() {
    return {
      type: MessageComponentTypes.SELECT_MENU,
      placeholder: this.placeholder,
      customId: this.customId,
      maxValues: this.maxValues,
      minValues: this.minValues,
      options: this.options,
    };
  }
}

module.exports = MessageMenu;
