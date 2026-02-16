const db = require('../config/database');

const salvarUsuarios = async (usuarios) => {
    const usuariosExistentes = await new Promise((resolve, reject) => {
        db.all("SELECT email FROM usuario", [], (err, emails) => {
            if (err) {
                reject(new Error("Erro ao buscar usuários existentes: " + err.message));
            } else {
                resolve(new Set(emails.map(r => r.email)));
            }
        });
    });

    let adicionados = []
    let atualizados = [];

    usuarios.forEach(usuario => {
        if (usuariosExistentes.has(usuario.email)) {
            atualizados.push(usuario);
        } else {
            adicionados.push(usuario);
        }
    });

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run("BEGIN TRANSACTION");

            const sql = `
            INSERT INTO usuario (email, sexo, nome, sobrenome, data_nascimento, celular, pais)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(email) DO UPDATE SET
                sexo = excluded.sexo,
                nome = excluded.nome,
                sobrenome = excluded.sobrenome,
                data_nascimento = excluded.data_nascimento,
                celular = excluded.celular,
                pais = excluded.pais
        `;
            const stmt = db.prepare(sql);

            usuarios.forEach(usuario => {
                stmt.run([usuario.email, usuario.gender, usuario.first_name, usuario.last_name, usuario.dob, usuario.cell, usuario.country]);
            });

            stmt.finalize();

            db.run("COMMIT", (err) => {
                if (err) {
                    db.run("ROLLBACK");
                    reject(err);
                } else {
                    resolve({ adicionados, atualizados });
                }
            });
        });
    });
}

module.exports = { salvarUsuarios };

