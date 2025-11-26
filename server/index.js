const app = require('express')(); // Importa e inicializa o app Express
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

// Importa os Controllers e Models
const UsuarioController = require('./controller/UsuarioController.js');
const UsuarioModel = require('./model/UsuarioModel.js');
const ForumController = require('./controller/ForumController.js');
const ForumModel = require('./model/ForumModel.js');

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

UsuarioModel.criarTabela();
ForumModel.criarTabela();

// Rotas da API
app.post('/api/usuario-cadastro', UsuarioController.cadastrar);
app.post('/api/usuario-login', UsuarioController.login);
app.post('/api/forum-cadastro', ForumController.cadastrar);
app.get('/api/foruns', ForumController.listar);
app.get('/api/foruns/:nome', ForumController.buscar);


// Configurações de Server e Socket.io
const server = http.createServer(app);
const PORT = 3001
const io = require('socket.io')(server, {cors: {origin: 'http//localhost:5173'}}); // Cors indica que o Socket só recebe requisição do client React

server.listen(PORT, () => console.log('Backend rodando em http://localhost:3001'))