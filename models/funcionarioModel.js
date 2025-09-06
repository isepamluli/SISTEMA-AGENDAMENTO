const pool = require('../config/db');

const Funcionario = {
  async create({ nomest, email, telefone, senha }) {
    const [res] = await pool.query(
      'INSERT INTO Funcionario (nomest, email, telefone, senha) VALUES (?, ?, ?, ?)',
      [nomest, email, telefone ?? null, senha]
    );
    return { idf: res.insertId, nomest, email, telefone };
  },

  async update(idf, data) {
    // monta SET dinâmico com apenas os campos enviados
    const fields = [];
    const values = [];

    if (data.nomest !== undefined)   { fields.push('nomest = ?');   values.push(data.nomest); }
    if (data.email !== undefined)    { fields.push('email = ?');    values.push(data.email); }
    if (data.telefone !== undefined) { fields.push('telefone = ?'); values.push(data.telefone); }
    if (data.senha !== undefined)    { fields.push('senha = ?');    values.push(data.senha); }

    if (fields.length === 0) return 0;

    values.push(idf);
    const [res] = await pool.query(
      `UPDATE Funcionario SET ${fields.join(', ')} WHERE idf = ?`,
      values
    );
    return res.affectedRows;
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
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('CALL GetAgendaPorUsuario(?)', [idf]);
      return rows[0] || rows;
    } finally {
      conn.release();
    }
  }
};

module.exports = Funcionario;
