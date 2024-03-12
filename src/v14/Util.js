const { MessageActionRow, MessageButton, MessageSelectMenu, MessageComponentType } = require('discord.js');

module.exports = {
  resolveStyle(style) {
    if (!style || style === undefined || style === null) throw new TypeError('NO_BUTTON_STYLE: Please provide button style');

    if (style === 'gray') style = 'grey';

    if (
      (!MessageButtonStyles[style] || MessageButtonStyles[style] === undefined || MessageButtonStyles[style] === null) &&
      (!MessageButtonStylesAliases[style] || MessageButtonStylesAliases[style] === undefined || MessageButtonStylesAliases[style] === null)
    )
      throw new TypeError('INVALID_BUTTON_STYLE: An invalid button styles was provided');

    return typeof style === 'string' ? MessageButtonStyles[style] : style;
  },
  resolveButton(data) {
    if (data.type !== MessageComponentType.BUTTON) throw new TypeError('INVALID_BUTTON_TYPE: Invalid type');

    if (!data.style) throw new TypeError('NO_BUTTON_STYLE: Please provide button style');

    if (!data.label && !data.emoji) throw new TypeError('NO_BUTTON_LABEL_AND_EMOJI: Please provide button label and/or emoji');

    if ('disabled' in data && typeof data.disabled !== 'boolean')
      throw new TypeError('BUTTON_DISABLED: The button disabled option must be boolean (true/false)');

    if (data.style === MessageButtonStyles.LINK && !data.url) throw new TypeError('NO_BUTTON_URL: You provided url style, you must provide an URL');

    if (data.style !== MessageButtonStyles.LINK && data.url)
      throw new TypeError('BOTH_URL_CUSTOM_ID: A custom id and url cannot both be specified');

    if (data.style === MessageButtonStyles.LINK && data.customId)
      throw new TypeError('BOTH_URL_CUSTOM_ID: A custom id and url cannot both be specified');

    if (data.style !== MessageButtonStyles.LINK && !data.customId) throw new TypeError('NO_BUTTON_ID: Please provide button id');

    if (data.emoji && data.emoji.id && isNaN(data.emoji.id)) throw new TypeError('INCORRECT_EMOJI_ID: Please provide correct emoji id');

    if (data.emoji && data.emoji.name && this.isEmoji(data.emoji.name) === false)
      throw new TypeError('INCORRECT_EMOJI_NAME: Please provide correct emoji');

    return new MessageButton()
      .setStyle(data.style)
      .setLabel(data.label)
      .setEmoji(data.emoji)
      .setDisabled(data.disabled)
      .setURL(data.url)
      .setCustomId(data.customId);
  },
  resolveMenu(data) {
    if (data.type !== MessageComponentType.SELECT_MENU) throw new TypeError('INVALID_MENU_TYPE: Invalid type');

    if (data.placeholder && typeof data.placeholder !== 'string')
      throw new Error('INVALID_MENU_PLACEHOLDER: The given menu placeholder is not string');

    if (!data.customId) throw new Error('NO_MENU_ID: Please provide menu id');

    let options = this.resolveMenuOptions(data.options);

    if (options.length < 1) throw new Error('NO_BUTTON_OPTIONS: Please provide at least one menu option');

    let maxValues = this.resolveMaxValues(data.maxValues);
    let minValues = this.resolveMinValues(data.minValues);

    return new MessageSelectMenu()
      .setCustomId(data.customId)
      .setPlaceholder(data.placeholder)
      .addOptions(options)
      .setMaxValues(maxValues)
      .setMinValues(minValues);
  },
  resolveMenuOptions(data) {
    if (!Array.isArray(data)) throw new Error('INVALID_OPTIONS: The select menu options must be an array');

    let options = [];
    data.map((d) => {
      if (!d.value) throw new Error('VALUE_MISSING: Please provide a value for this option');

      if (!d.label) throw new Error('MISSING_LABEL: Please provide label for this option');

      options.push({
        label: d.label,
        value: d.value,
        emoji: d.emoji,
        description: d.description,
      });
    });

    return options;
  },
  resolveType(type) {
    return typeof type === 'string' ? MessageComponentType[type] : type;
  },
  resolveMaxValues(m1, m2) {
    return m1 || m2;
  },
  resolveMinValues(m1, m2) {
    return m1 || m2;
  },
  isEmoji(string) {
    let emojiRagex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return emojiRagex.test(string);
  },
  verifyString(data, allowEmpty = true, errorMessage = `Expected a string, got ${data} instead.`, error = Error) {
    if (typeof data !== 'string') throw new error(errorMessage);
    if (!allowEmpty && data.length === 0) throw new error(errorMessage);
    return data;
  },
};