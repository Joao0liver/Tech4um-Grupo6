const app = require('express')(); // Importa e inicializa o app Express
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

// Importa os Controllers e Models
const UsuarioController = require('./controller/UsuarioController.js');
const UsuarioModel = require('./model/UsuarioModel.js');
const ForumController = require('./controller/ForumController.js');
const ForumModel = require('./model/ForumModel.js');
const RegistroModel = require('./model/RegistroModel.js');
const RegistroController = require('./controller/RegistroController.js');

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

UsuarioModel.criarTabela();
ForumModel.criarTabela();
RegistroModel.criarTabela();

// Rotas da API
app.post('/api/usuario-cadastro', UsuarioController.cadastrar);
app.post('/api/usuario-login', UsuarioController.login);

app.post('/api/forum-cadastro', ForumController.cadastrar);
app.get('/api/foruns', ForumController.listar);
app.get('/api/foruns/:nome', ForumController.buscar);

app.post('/api/entrar-forum', RegistroController.entrarForum);
app.delete('/api/sair-forum/:idForum', RegistroController.sairForum);
app.get('/api/inscricoes', RegistroController.forunsIncritos);


// Configurações de Server
const server = http.createServer(app);
const PORT = 3001

// Configurações do Servidor Socket.io
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } }); // Cors indica que o Socket só recebe requisição do client React
const usuariosPorSala = {};

io.on('connection', (socket) => {
  console.log('Novo usuário conectado:', socket.id);

  // Entrar em uma sala de fórum
  socket.on('entrarSala', ({ idForum, usuario }) => {
    const sala = `forum_${idForum}`;
    socket.join(sala);

    if (!usuariosPorSala[sala]) {
        usuariosPorSala[sala] = [];
    }
    usuariosPorSala[sala].push({
        id: socket.id,
        nome: usuario.nome,
        avatar: usuario.avatar
    });

    // Envia uma lista atualizada dos participantes para todos na sala
    io.to(sala).emit("listaParticipantes", usuariosPorSala[sala]);

    console.log(`Usuário entrou na sala forum_${idForum}`);
  });

  // Receber mensagem e enviar para todos na sala
  socket.on('mensagem', (data) => {
    const { idForum, usuario, avatar, texto } = data;
    io.to(`forum_${idForum}`).emit('mensagem', {
      usuario,
      avatar,
      texto,
      hora: new Date().toLocaleTimeString()
    });
  });

  // Caso o usuário se desconecte da sala
  socket.on('disconnect', () => {
    for (const sala in usuariosPorSala) {
        usuariosPorSala[sala] = usuariosPorSala[sala].filter(
            (u) => u.id !== socket.id
        );

        io.to(sala).emit("listaParticipantes", usuariosPorSala[sala]);
    }
    console.log('Usuário desconectado:', socket.id);
  });
});

server.listen(PORT, () => console.log('Backend rodando em http://localhost:3001'))