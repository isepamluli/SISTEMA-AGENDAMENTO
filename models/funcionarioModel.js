const pool = require('../config/db');

const Funcionario = {
  async create({ nomest, email, telefone, senha }) {
    const [res] = await pool.query('INSERT INTO Funcionario (nomest, email, telefone, senha) VALUES (?, ?, ?, ?)', [nomest, email, telefone, senha]);
    return { idf: res.insertId, nomest, email, telefone };
  },

  async update(idf, { nomest, email, telefone, senha }) {
    // se senha for fornecida, atualiza também
    if (senha) {
      await pool.query('UPDATE Funcionario SET nomest=?, email=?, telefone=?, senha=? WHERE idf=?', [nomest, email, telefone, senha, idf]);
    } else {
      await pool.query('UPDATE Funcionario SET nomest=?, email=?, telefone=? WHERE idf=?', [nomest, email, telefone, idf]);
    }
  },

  async delete(idf) {
    await pool.query('DELETE FROM Funcionario WHERE idf=?', [idf]);
  },

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Funcionario');
    return rows;
  },

  async getById(idf) {
    const [rows] = await pool.query('SELECT * FROM Funcionario WHERE idf=?', [idf]);
    return rows[0];
  },

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM Funcionario WHERE email=?', [email]);
    return rows[0];
  },

  async listPerfis(idf) {
    const [rows] = await pool.query(
      'SELECT p.* FROM Perfil p JOIN FuncionarioPerfil fp ON p.idp = fp.idp WHERE fp.idf = ?',
      [idf]
    );
    return rows;
  },

  async callGetAgendaPorUsuario(idf) {
    // chama procedure GetAgendaPorUsuario
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('CALL GetAgendaPorUsuario(?)', [idf]);
      // resultado vem em rows[0]
      return rows[0] || rows;
    } finally {
      conn.release();
    }
  }
};

module.exports = Funcionario;
