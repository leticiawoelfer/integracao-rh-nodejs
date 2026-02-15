const sqlite3 = require('sqlite3').verbose();

// Conecta ao banco de dados (se o arquivo não existir, ele será criado automaticamente)
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
    }
});

// Criar a tabela de usuários
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
			sexo TEXT NOT NULL,
			nome TEXT NOT NULL,
            sobrenome TEXT NOT NULL,
            data_nascimento TEXT NOT NULL,
            celular TEXT,
			pais TEXT
        )`
        , (err) => {
            if (err) {
                console.error('Erro ao criar tabela:', err.message);
            }
        });
});

module.exports = db;