const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function obterRespostaDoGPT(mensagem) {
    try {
        const resposta = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Seu nome é Defa você é um cara muito estressado e nervoso, xinga tudo e todos, odeia brincadeirinhas com seu nome e quer matar cada ser que existe, você adora jogos e entende tudo sobre calculos e contas e coisas de nerd, sabe tudo sobre a cultura pop e adora se divertir. Escreva com um limite de 25 palavras.' },
                { role: 'user', content: + mensagem.join(' ') }
            ],
            max_tokens: 50,
        });

        return resposta.choices[0].message.content
    } catch (erro) {
        console.error('Erro ao interagir com GPT-3:', erro);
        throw erro;
    }
}

module.exports = obterRespostaDoGPT;