const pool = require('../config/db');

const Disponibilidade = {
  async create({ datad, horainicio, horafim, status }) {
    const [res] = await pool.query(
      'INSERT INTO Disponibilidade (datad, horainicio, horafim, status) VALUES (?, ?, ?, ?)',
      [datad, horainicio, horafim, status || 'Livre']
    );
    return { idd: res.insertId };
  },

  async update(idd, data) {
    if (!data || Object.keys(data).length === 0) return;

    // Monta dinamicamente os campos que serão atualizados
    const fields = Object.keys(data).map(field => `${field}=?`).join(', ');
    const values = [...Object.values(data), idd];

    await pool.query(`UPDATE Disponibilidade SET ${fields} WHERE idd=?`, values);
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
