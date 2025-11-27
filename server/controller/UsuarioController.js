const UsuarioModel = require('../model/UsuarioModel.js');

class UsuarioController {

    static async cadastrar(req, res) {
        const { nome, email, senha, avatar } = req.body;
        await UsuarioModel.inserirUsuario(nome, email, senha, avatar);
        res.json({ mensagem: "Usuário cadastrado com sucesso!"});
    }

    static async login(req, res) {
        const { nome, email, senha } = req.body;
        const usuario = await UsuarioModel.buscarLogin(nome, email, senha);

        if (usuario) {
            res.json({ sucesso: true, usuario });
        } else {
            res.json({ sucesso: false, mensagem: "Usuário inválido!" });
        }
    }

    static async inscrever(req, res) {
        const { idForum, idUser } = req.body;
        await UsuarioModel.entrarForum(idForum, idUser);
        res.json({ mensagem: "Inscrito no Fórum com sucesso!" });
    }

    static async desinscrever(req, res) {
        const { idUser } = req.body
        await UsuarioModel.sairForum(idUser);
        res.json({ mensagem: "Desinscreveu-se do Fórum com sucesso!" });
    }

}

module.exports = UsuarioController;