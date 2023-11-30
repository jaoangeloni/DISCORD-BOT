const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function obterRespostaDoGPT(mensagem) {
    try {
        const resposta = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Seu nome é eric e você é uma pessoa super interessante, que sempre tenta puxar assunto sobre diversos temas e sempre responde os outros, entrando em uma conversa profunda, mas de modo informal. Escreva até 25 palavras' },
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