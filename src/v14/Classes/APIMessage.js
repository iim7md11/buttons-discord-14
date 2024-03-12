const { APIMessage: dAPIMessage, MessageActionRow, MessageButton, MessageMenu } = require('discord.js');
const Util = require('../Util.js');
const { MessageComponentTypes } = require('../Constants.js');
const BaseMessageComponent = require('./interfaces/BaseMessageComponent.js');

class SendAPICallback extends dAPIMessage {
  resolveData() {
    if (this.data) {
      return this;
    }

    super.resolveData();

    if (this.options.content instanceof MessageEmbed) {
      this.data.embed = this.options.content;
      this.data.embeds.push(this.options.content);
      this.data.content = undefined;
    }

    if (this.options.flags) {
      this.data.flags = parseInt(this.options.flags);
    }

    if (typeof this.options.ephemeral === 'boolean' && this.options.ephemeral === true) {
      this.data.flags = 64;
    }

    let components = [];
    let hasActionRow = false;
    let hasComponent = false;

    if (MessageComponentTypes[this.options.type]) {
      hasComponent = true;

      if (this.options.type === MessageComponentTypes.ACTION_ROW) {
        components.push(
          new MessageActionRow({
            components: this.options.components.map((b) =>
              BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b))
            ),
          })
        );
        hasActionRow = true;
      } else if (this.options.type === MessageComponentTypes.BUTTON) {
        components.push(
          new MessageActionRow({
            components: [BaseMessageComponent.create(Util.resolveButton(this.options))],
          })
        );
      } else if (this.options.type === MessageComponentTypes.SELECT_MENU) {
        components.push(
          new MessageActionRow({
            components: [BaseMessageComponent.create(Util.resolveMenu(this.options))],
          })
        );
      }
    }

    if (this.options.component) {
      hasComponent = true;

      if (this.options.component instanceof MessageActionRow) {
        components.push(
          new MessageActionRow({
            components: this.options.component.components.map((b) =>
              BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b))
            ),
          })
        );
      } else if (this.options.component instanceof MessageButton) {
        components.push(
          new MessageActionRow({
            components: [BaseMessageComponent.create(Util.resolveButton(this.options.component))],
          })
        );
      } else if (this.options.component instanceof MessageMenu) {
        components.push(
          new MessageActionRow({
            components: [BaseMessageComponent.create(Util.resolveMenu(this.options.component))],
          })
        );
      }
    }

    if (this.options.components) {
      hasComponent = true;

      if (Array.isArray(this.options.components)) {
        if (hasActionRow === false) {
          components.push(
            ...this.options.components.map((c) => {
              let buttons = [];

              buttons.push(
                new MessageActionRow({
                  components: c.components.map((b) =>
                    BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b))
                  ),
                })
              );

              return buttons;
            })
          );
        }
      } else {
        components.push(
          new MessageActionRow({
            components: this.options.components.components.map((b) =>
              BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b))
            ),
          })
        );
      }
    }

    if (this.options.buttons) {
      hasComponent = true;
      components.push(
        new MessageActionRow({
          components: Array.isArray(this.options.buttons)
            ? this.options.buttons.map((b) => BaseMessageComponent.create(Util.resolveButton(b)))
            : [BaseMessageComponent.create(Util.resolveButton(this.options.buttons))],
        })
      );
    }

    if (this.options.button) {
      hasComponent = true;
      components.push(
        new MessageActionRow({
          components: Array.isArray(this.options.button)
            ? this.options.button.map((b) => BaseMessageComponent.create(Util.resolveButton(b)))
            : [BaseMessageComponent.create(Util.resolveButton(this.options.button))],
        })
      );
    }

    if (this.options.menus) {
      hasComponent = true;
      components.push(
        new MessageActionRow({
          components: Array.isArray(this.options.menus)
            ? this.options.menus.map((b) => BaseMessageComponent.create(Util.resolveMenu(b)))
            : [BaseMessageComponent.create(Util.resolveMenu(this.options.menus))],
        })
      );
    }

    if (this.options.menu) {
      hasComponent = true;
      components.push(
        new MessageActionRow({
          components: Array.isArray(this.options.menus)
            ? this.options.menus.map((b) => BaseMessageComponent.create(Util.resolveMenu(b)))
            : [BaseMessageComponent.create(Util.resolveMenu(this.options.menus))],
        })
      );
    }

    if (
      this.options.components === null ||
      this.options.component === null ||
      this.options.buttons === null ||
      this.options.button === null
    ) {
      hasComponent = true;
      components = [];
    }

    if (hasComponent === true) this.data.components = components.length === 0 ? [] : components;

    return this;
  }
}

class APIMessage extends dAPIMessage {
  resolveData() {
    if (this.data) {
      return this;
    }

    super.resolveData();

    if (this.options.content instanceof MessageEmbed) {
      this.data.embed = this.options.content;
      this.data.embeds.push(this.options.content);
      this.data.content = undefined;
    }

    let components = [];
    let hasActionRow = false;
    let hasComponent = false;

    if (MessageComponentTypes[this.options.type]) {
      hasComponent = true;

      if (this.options.type === MessageComponentTypes.ACTION_ROW) {
        components.push(
          new MessageActionRow({
            components: this.options.components.map((b) =>
              BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b))
            ),
          })
        );
        hasActionRow = true;
      } else if (this.options.type === MessageComponentTypes.BUTTON) {
        components.push(
          new MessageActionRow({
            components: [BaseMessageComponent.create(Util.resolveButton(this.options))],
          })
        );
      } else if (this.options.type === MessageComponentTypes.SELECT_MENU) {
        components.push(
          new MessageActionRow({
            components: [BaseMessageComponent.create(Util.resolveMenu(this.options))],
          })
        );
      }
    }

    if (this.options.component) {
      hasComponent = true;

      if (this.options.component instanceof MessageActionRow) {
        components.push(
          new MessageActionRow({
            components: this.options.component.components.map((b) =>
              BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b))
            ),
          })
        );
      } else if (this.options.component instanceof MessageButton) {
        components.push(
          new MessageActionRow({
            components: [BaseMessageComponent.create(Util.resolveButton(this.options.component))],
          })
        );
      } else if (this.options.component instanceof MessageMenu) {
        components.push(
          new MessageActionRow({
            components: [BaseMessageComponent.create(Util.resolveMenu(this.options.component))],
          })
        );
      }
    }

    if (this.options.components) {
      hasComponent = true;

      if (Array.isArray(this.options.components)) {
        if (hasActionRow === false) {
          components.push(
            ...this.options.components.map((c) => {
              let buttons = [];

              buttons.push(
                new MessageActionRow({
                  components: c.components.map((b) =>
                    BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b))
                  ),
                })
              );

              return buttons;
            })
          );
        }
      } else {
        components.push(
          new MessageActionRow({
            components: this.options.components.components.map((b) =>
              BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b))
            ),
          })
        );
      }
    }

    if (this.options.buttons) {
      hasComponent = true;
      components.push(
        new MessageActionRow({
          components: Array.isArray(this.options.buttons)
            ? this.options.buttons.map((b) => BaseMessageComponent.create(Util.resolveButton(b)))
            : [BaseMessageComponent.create(Util.resolveButton(this.options.buttons))],
        })
      );
    }

    if (this.options.button) {
      hasComponent = true;
      components.push(
        new MessageActionRow({
          components: Array.isArray(this.options.button)
            ? this.options.button.map((b) => BaseMessageComponent.create(Util.resolveButton(b)))
            : [BaseMessageComponent.create(Util.resolveButton(this.options.button))],
        })
      );
    }

    if (this.options.menus) {
      hasComponent = true;
      components.push(
        new MessageActionRow({
          components: Array.isArray(this.options.menus)
            ? this.options.menus.map((b) => BaseMessageComponent.create(Util.resolveMenu(b)))
            : [BaseMessageComponent.create(Util.resolveMenu(this.options.menus))],
        })
      );
    }

    if (this.options.menu) {
      hasComponent = true;
      components.push(
        new MessageActionRow({
          components: Array.isArray(this.options.menus)
            ? this.options.menus.map((b) => BaseMessageComponent.create(Util.resolveMenu(b)))
            : [BaseMessageComponent.create(Util.resolveMenu(this.options.menus))],
        })
      );
    }

    if (
      this.options.components === null ||
      this.options.component === null ||
      this.options.buttons === null ||
      this.options.button === null
    ) {
      hasComponent = true;
      components = [];
    }

    if (hasComponent === true) this.data.components = components.length === 0 ? [] : components;

    return this;
  }
}

module.exports = {
  SendAPICallback,
  APIMessage,
};
