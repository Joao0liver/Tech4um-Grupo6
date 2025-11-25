const conexao = require('../conexao.js');

class ForumModel {

    static async criarTabela() {
        const db = await conexao();
        db.run(`
            CREATE TABLE IF NOT EXISTS foruns (
            idForum INTEGER PRIMARY KEY, 
            nome TEXT, 
            descricao TEXT
            )`
        );
    }

    static async inserirForum(nome, descricao) {
        const db = await conexao();
        db.run(`INSERT INTO foruns (nome, descricao) VALUES (?, ?)`, [
            nome,
            descricao
        ]);
    }

    static async listarForuns() {
       const db = await conexao();
       db.get(`SELECT * FROM foruns`);
    }

    static async buscarForum(nome) {
        const db = await conexao();
        db.get(`SELECT * FROM foruns WHERE nome=?`, [
            nome
        ]);
    }

}

module.exports = ForumModel;