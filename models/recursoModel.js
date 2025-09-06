const pool = require('../config/db');

const Recurso = {
  async create({ nomer, tipor }) {
    const [res] = await pool.query('INSERT INTO Recursos (nomer, tipor) VALUES (?, ?)', [nomer, tipor]);
    return { idr: res.insertId, nomer, tipor };
  },

  async update(idr, { nomer, tipor }) {
    await pool.query('UPDATE Recursos SET nomer=?, tipor=? WHERE idr=?', [nomer, tipor, idr]);
  },

  async delete(idr) {
    await pool.query('DELETE FROM Recursos WHERE idr=?', [idr]);
  },

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Recursos');
    return rows;
  },

  async getById(idr) {
    const [rows] = await pool.query('SELECT * FROM Recursos WHERE idr=?', [idr]);
    return rows[0];
  }
};

module.exports = Recurso;
