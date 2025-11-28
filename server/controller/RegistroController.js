const RegistroModel = require("../model/RegistroModel.js");

class RegistroController {

    static async entrarForum(req, res) {
        const { idForum, idUser } = req.body;
        await RegistroModel.inserirRegistro(idForum, idUser);
        res.json({ mensagem: "Inscrito no Fórum com sucesso!" });
    }

    static async sairForum(req, res) {
        const { idForum } = req.params;
        const { idUser } = req.body;
        await RegistroModel.deletarRegistro(idForum, idUser);
        res.json({ mensagem: "Desinscreveu-se do Fórum com sucesso!" });
    }

    static async forunsIncritos(req, res) {
        const { idUser } = req.params;
        const forunsIn = await RegistroModel.verificarRegistros(idUser);

        if (forunsIn) {
            res.json(forunsIn);
        } else {
            res.status(404).json({ mensagem: "Você não está inscrito em nenhum Fórum!" });
        }
    }

}

module.exports = RegistroController;