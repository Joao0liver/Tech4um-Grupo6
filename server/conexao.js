const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function conexao() {
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });

    return db;
}

module.exports = conexao;