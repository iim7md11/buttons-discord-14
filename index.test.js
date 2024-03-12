const { Client, Intents, MessageActionRow, MessageButton, MessageSelectMenu, MessageSelectOptionData, MessageEmbed } = require('discord.js');
const { disbut } = require('./src/index');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.MESSAGE_CONTENT, Intents.FLAGS.MESSAGE_MANAGE] });
const client2 = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
disbut(client);

client.on('ready', () => {
    console.log(`${client.user.tag} is ready`);
});

client2.on('ready', () => console.log('2 ready'));

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('o')) {
        const embed = new MessageEmbed().setDescription(`${client.version}`);
        let option = new MessageSelectOptionData().setLabel('op').setValue('hi').setDescription('ss');
        let reload = new MessageSelectOptionData().setLabel('reload').setEmoji('780988312172101682').setValue('reload');
        let select = new MessageSelectMenu().setCustomId('hey').addOptions([option, reload]).setPlaceholder('opla');
        let btn = new MessageButton().setLabel(' ').setCustomId('id').setStyle('PRIMARY').setDisabled(true);
        let row1 = new MessageActionRow().addComponents(btn);
        let row2 = new MessageActionRow().addComponents(select);
        let m = await message.channel.send({ content: 'hi', components: [row1, row2] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton() && !interaction.isSelectMenu()) return;

    if (interaction.isButton()) {
        let btn = new MessageButton().setEmoji('785062885952192512').setCustomId('d').setStyle('PRIMARY');
        interaction.deferUpdate().then(async () => {
            await wait(1000);
            interaction.editReply({ content: 'awaited', components: [[btn]] });
        });
    }

    if (interaction.isSelectMenu()) {
        if (interaction.values[0] === 'reload') {
            interaction.message.components[0].components[0].setDisabled(false);
            console.log(interaction.message.components);
            interaction.message.edit({ content: 'hey', components: [interaction.message.components[0]] });
        }
    }
});

client.login('  ');

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
