const pool = require('../config/db');

const Disponibilidade = {
  async create({ datad, horainicio, horafim, status }) {
    const [res] = await pool.query('INSERT INTO Disponibilidade (datad, horainicio, horafim, status) VALUES (?, ?, ?, ?)',
      [datad, horainicio, horafim, status || 'Livre']);
    return { idd: res.insertId };
  },

  async update(idd, data) {
    await pool.query('UPDATE Disponibilidade SET datad=?, horainicio=?, horafim=?, status=? WHERE idd=?',
      [data.datad, data.horainicio, data.horafim, data.status, idd]);
  },

  async delete(idd) {
    await pool.query('DELETE FROM Disponibilidade WHERE idd=?', [idd]);
  },

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Disponibilidade');
    return rows;
  },

  async getById(idd) {
    const [rows] = await pool.query('SELECT * FROM Disponibilidade WHERE idd=?', [idd]);
    return rows[0];
  },

  async verificar(idd) {
    const [rows] = await pool.query('SELECT * FROM Disponibilidade WHERE idd=?', [idd]);
    return rows.length > 0 ? rows[0] : null;
  },

  async verificarPeriodo(datad, horainicio, horafim) {
    const [rows] = await pool.query(
      'SELECT * FROM Disponibilidade WHERE datad=? AND horainicio<=? AND horafim>=? AND status="Livre"',
      [datad, horainicio, horafim]
    );
    return rows.length > 0;
  }
};

module.exports = Disponibilidade;
