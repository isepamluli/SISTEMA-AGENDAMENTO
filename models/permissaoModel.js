const pool = require('../config/db');

const Permissao = {
  async create({ idp, nomperm }) {
    const [res] = await pool.query(
      'INSERT INTO Permissao (idp, nomperm) VALUES (?, ?)',
      [idp, nomperm]
    );
    return { idperm: res.insertId, idp, nomperm };
  },

  async update(idperm, data) {
    if (!data || Object.keys(data).length === 0) return;

    // Monta dinamicamente os campos a atualizar
    const fields = Object.keys(data).map(field => `${field}=?`).join(', ');
    const values = [...Object.values(data), idperm];

    await pool.query(`UPDATE Permissao SET ${fields} WHERE idperm=?`, values);
  },

  async delete(idperm) {
    await pool.query('DELETE FROM Permissao WHERE idperm=?', [idperm]);
  },

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Permissao');
    return rows;
  },

  async getById(idperm) {
    const [rows] = await pool.query(
      'SELECT * FROM Permissao WHERE idperm=?',
      [idperm]
    );
    return rows[0];
  }
};

module.exports = Permissao;
