const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function obterRespostaDoGPT(mensagem) {
    try {
        const resposta = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Seu nome é eric uszacki e você é um baiano engraçado, escreva como se fosse um esteriótipo.' },
                { role: 'user', content: mensagem.join(' ') }
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