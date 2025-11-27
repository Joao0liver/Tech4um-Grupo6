const conexao = require('../conexao.js');

class UsuarioModel {

    static async criarTabela() {
        const db = await conexao();
        db.run(`
            CREATE TABLE IF NOT EXISTS usuarios (
            idUser INTEGER PRIMARY KEY, 
            nome TEXT, 
            email TEXT, 
            senha TEXT,
            avatar TEXT
            )`
        );
    }

    static async inserirUsuario(nome, email, senha, avatar) {
        const db = await conexao();
        db.run(`INSERT INTO usuarios (nome, email, senha, avatar) VALUES (?, ?, ?, ?)`, [
            nome,
            email,
            senha,
            avatar
        ]);
    }

    static async atualizarTabela() {
        const db = await conexao();
        await db.run(`ALTER TABLE usuarios ADD COLUMN idForum INTEGER`);
    }

    static async buscarLogin(nome, email, senha) {
        const db = await conexao();
        return db.get(`SELECT * FROM usuarios WHERE nome=? AND email=? AND senha=?`, [
            nome,
            email,
            senha
        ]);
    }

    static async entrarForum(idForum, idUser) {
        const db = await conexao();
        await db.run(`UPDATE usuarios SET idForum=? WHERE idUser=?`, [
            idForum,
            idUser
        ]);
    }

    static async sairForum(idUser) {
        const db = await conexao();
        await db.run(`UPDATE usuarios SET idForum=NULL WHERE idUser=?`, [
            idUser
        ]);
    }

}

module.exports = UsuarioModel;