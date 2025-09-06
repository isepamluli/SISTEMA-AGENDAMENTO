const pool = require('../config/db');

const Permissao = {
  async create({ idp, nomperm }) {
    const [res] = await pool.query('INSERT INTO Permissao (idp, nomperm) VALUES (?, ?)', [idp, nomperm]);
    return { idperm: res.insertId, idp, nomperm };
  },

  async update(idperm, { idp, nomperm }) {
    await pool.query('UPDATE Permissao SET idp=?, nomperm=? WHERE idperm=?', [idp, nomperm, idperm]);
  },

  async delete(idperm) {
    await pool.query('DELETE FROM Permissao WHERE idperm=?', [idperm]);
  },

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Permissao');
    return rows;
  },

  async getById(idperm) {
    const [rows] = await pool.query('SELECT * FROM Permissao WHERE idperm=?', [idperm]);
    return rows[0];
  }
};

module.exports = Permissao;
