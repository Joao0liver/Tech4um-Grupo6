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

}

module.exports = UsuarioController;