const { Client, IntentsBitField } = require('discord.js');

const obterRespostaDoGPT = require('./API');

const dotenv = require('dotenv');

dotenv.config();

const prefix = 'd.';

const canalID = '1179824889251774595';

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

            setTimeout(() => {
                canal.send(`e.${resposta}`);
            }, 5000)

        } catch (erro) {
            console.error('Erro:', erro);

            canal.send('Ocorreu um erro ao processar a mensagem.');
        }
    }

});

client.on('ready', () => {
    console.log(`${client.user.tag} está POSITIVO E OPERANTE`);
});

client.login(process.env.TOKEN);