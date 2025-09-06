const pool = require('../config/db');

const Perfil = {
  async create({ nomp }) {
    const [res] = await pool.query('INSERT INTO Perfil (nomp) VALUES (?)', [nomp]);
    return { idp: res.insertId, nomp };
  },

  async update(idp, { nomp }) {
    await pool.query('UPDATE Perfil SET nomp=? WHERE idp=?', [nomp, idp]);
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
