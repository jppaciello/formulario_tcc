const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ou criar o banco SQLite
const db = new sqlite3.Database("avaliacoes.db");

// Criar a tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_empresa TEXT,
    pontuacao INTEGER,
    nivel TEXT
  )
`);

// Rota para salvar os dados
app.post("/salvar", (req, res) => {
  const { nomeEmpresa, pontuacao, nivelSeguranca } = req.body;

  const stmt = db.prepare("INSERT INTO avaliacoes (nome_empresa, pontuacao, nivel) VALUES (?, ?, ?)");
  stmt.run(nomeEmpresa, pontuacao, nivelSeguranca, function (err) {
    if (err) {
      return res.status(500).send({ erro: "Erro ao salvar no banco de dados." });
    }
    res.send({ status: "ok", id: this.lastID });
  });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");

// Rota para limpar todos os registros do banco
app.delete('/limpar', (req, res) => {
    const query = `DELETE * FROM avaliacoes`; 

    db.run(query, function(err) {
        if (err) {
            console.error("Erro ao limpar dados:", err.message);
            return res.status(500).json({ error: "Erro ao limpar dados" });
        }
        res.json({ message: "Banco de dados limpo com sucesso" });
    });
});

});
