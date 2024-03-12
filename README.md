```markdown
<div align="center">
  <h1>buttons-discord-14</h1>
  <p>
    <a href="https://www.npmjs.com/package/buttons-discord-14"><img src="https://img.shields.io/npm/v/buttons-discord-14?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/buttons-discord-14"><img src="https://img.shields.io/npm/dt/buttons-discord-14?maxAge=3600" alt="NPM downloads" /></a>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/buttons-discord-14"><img src="https://nodei.co/npm/buttons-discord-14.png?downloads=true&stars=true" alt="NPM Banner"></a>
  </p>
</div>

## 📂 | Installation
```sh
npm i buttons-discord-14
```

## 📜 | Setup
```js
const discord = require('discord.js'); // Define the discord.js module
const { Client, GatewayIntentBits } = require('discord.js'); // Import required modules from discord.js
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ], // Include necessary gateway intents
}); // Creating discord.js client (constructor)
const disbut = require('buttons-discord-14');
disbut(client);
```

### ✍ | Example Usage
```js
const { MessageButton } = require('buttons-discord-14');

// Create a new button
const button = new MessageButton()
  .setLabel('Click me!')
  .setStyle('blurple')
  .setID('example_button');

// Add the button to a message
message.channel.send('Hello, world!', {
  components: [
    {
      type: 1, // ACTION_ROW
      components: [button],
    },
  ],
});
```

## 🔄 | Updates
- **Version 2.0.0:**
  - Added support for Discord.js v14.
  - Enhanced performance and reliability.
  - Updated gateway intents to comply with Discord.js v14 requirements.

## 🚫 | Removed
- Removed outdated information about Discord.js v12.

```
