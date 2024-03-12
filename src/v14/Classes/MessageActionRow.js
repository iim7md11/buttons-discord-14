const { MessageActionRow: DiscordMessageActionRow } = require('discord.js');
const MessageButton = require('./MessageButton');
const MessageMenu = require('./MessageMenu');
const { MessageComponentTypes } = require('../Constants');
const BaseMessageComponent = require('./interfaces/BaseMessageComponent');

class MessageActionRow extends BaseMessageComponent {
  constructor(data = {}) {
    super({ type: 'ACTION_ROW' });
    this.setup(data);
  }

  setup(data) {
    if ('components' in data) {
      this.components = data.components.map((c) => BaseMessageComponent.create(c));
    } else {
      this.components = [];
    }

    return this;
  }

  addComponents(...components) {
    this.components.push(...components.flat(Infinity).map((c) => BaseMessageComponent.create(c)));
    return this;
  }

  addComponent(component) {
    return this.addComponents(component);
  }

  removeComponents(index, deleteCount, ...components) {
    this.components.splice(index, deleteCount, ...components.flat(Infinity).map((c) => BaseMessageComponent.create(c)));
    return this;
  }

  toJSON() {
    const row = new DiscordMessageActionRow();
    
    for (const component of this.components) {
      if (component instanceof MessageButton || component instanceof MessageMenu) {
        row.addComponents(component.toJSON());
      } else {
        switch (component.type) {
          case MessageComponentTypes.BUTTON:
            row.addComponents(new MessageButton(component).toJSON());
            break;
          case MessageComponentTypes.SELECT_MENU:
            row.addComponents(new MessageMenu(component).toJSON());
            break;
        }
      }
    }
    
    return row;
  }
}

module.exports = MessageActionRow;
