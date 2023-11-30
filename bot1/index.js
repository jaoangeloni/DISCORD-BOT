const { Client, IntentsBitField } = require('discord.js');

const obterRespostaDoGPT = require('./API');

const dotenv = require('dotenv');

dotenv.config();

const prefix = 'e.';

const canalID = '740642035492585513';

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('messageCreate', async (message) => {
    const canal = message.guild.channels.cache.get(canalID);

    if (message.content.startsWith(prefix)) {
        const msg = message.content.slice(prefix.length).toLowerCase().split(' ');

        try {
            const resposta = await obterRespostaDoGPT(msg);

            canal.send(`${resposta}`);

        } catch (erro) {
            console.error('Erro:', erro);

            canal.send('Ocorreu um erro ao processar a mensagem.');
        }
    }

    if (message.author.bot) return 0;
});

client.on('ready', () => {
    console.log(`${client.user.tag} está POSITIVO E OPERANTE`);
});

client.login(process.env.TOKEN);