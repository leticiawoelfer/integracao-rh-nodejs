require('dotenv').config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

async function buscarUsuarios() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'X-Api-Key': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na API: Status ${response.status}`);
        }
        const data = await response.json();

        if (data && data.length > 0) {
            return data;
        } else {
            throw new Error('API retornou um array vazio.');
        }
    } catch (error) {
        console.warn(`Erro ao acessar API: ${error.message}`);
    }
}

module.exports = { buscarUsuarios };