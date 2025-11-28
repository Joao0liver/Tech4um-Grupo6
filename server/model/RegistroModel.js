const conexao = require('../conexao.js');

class RegistroModel {

    static async criarTabela() {
        const db = await conexao();
        db.run(`
            CREATE TABLE IF NOT EXISTS registro (
            idReg INTEGER PRIMARY KEY, 
            idForum INTEGER, 
            idUser INTEGER
            )`
        );
    }

    static async inserirRegistro(idForum, idUser) {
        const db = await conexao();
        db.run(`INSERT INTO registro (idForum, idUser) VALUES (?, ?)`, [
            idForum,
            idUser
        ]);
    }

    static async deletarRegistro(idForum, idUser) {
        const db = await conexao();
        db.run(`DELETE FROM registro WHERE idForum=? AND idUser=?`, [
            idForum,
            idUser
        ]);
    }

    static async verificarRegistros(idUser) {
        const db = await conexao();
        return db.get(`SELECT idForum FROM registro WHERE idUser=?`, [
            idUser
        ]);
    }

}

module.exports = RegistroModel;