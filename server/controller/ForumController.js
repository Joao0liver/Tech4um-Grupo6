const ForumModel = require('../model/ForumModel.js');

class ForumController {

    static async cadastrar(req, res) {
        const { nome, descricao } = req.body;
        await ForumModel.inserirForum(nome, descricao);
        res.json({ mensagem: "Fórum cadastrado com sucesso!" });
    }

    static async listar(req, res) {
        const foruns = await ForumModel.listarForuns();
        res.json(foruns);
    }

    static async buscar(req, res) {
        const { nome } = req.params;
        const forum = await ForumModel.buscarForum(nome);

        if (forum) {
            res.json(forum);
        } else {
            res.status(404).json({ mensagem: "Fórum não encontrado!" });
        }
    }

}

module.exports = ForumController;