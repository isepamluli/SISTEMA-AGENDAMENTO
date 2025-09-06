const pool = require('../config/db');

const Perfil = {
  async create({ nomp }) {
    const [res] = await pool.query(
      'INSERT INTO Perfil (nomp) VALUES (?)',
      [nomp]
    );
    return { idp: res.insertId, nomp };
  },

  async update(idp, data) {
    if (!data || Object.keys(data).length === 0) return;

    // Monta dinamicamente os campos que serão atualizados
    const fields = Object.keys(data).map(field => `${field}=?`).join(', ');
    const values = [...Object.values(data), idp];

    await pool.query(`UPDATE Perfil SET ${fields} WHERE idp=?`, values);
  },

  async delete(idp) {
    await pool.query('DELETE FROM Perfil WHERE idp=?', [idp]);
  },

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Perfil');
    return rows;
  },

  async getById(idp) {
    const [rows] = await pool.query('SELECT * FROM Perfil WHERE idp=?', [idp]);
    return rows[0];
  }
};

module.exports = Perfil;
