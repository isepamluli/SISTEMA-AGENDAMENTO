const pool = require('../config/db');

const Ambiente = {
  async create({ nomea, descricao, numeroa, capacidade, tipoambiente }) {
    const [res] = await pool.query('INSERT INTO Ambientes (nomea, descricao, numeroa, capacidade, tipoambiente) VALUES (?, ?, ?, ?, ?)',
      [nomea, descricao, numeroa, capacidade, tipoambiente]);
    return { ida: res.insertId };
  },

  async update(ida, data) {
    await pool.query('UPDATE Ambientes SET nomea=?, descricao=?, numeroa=?, capacidade=?, tipoambiente=? WHERE ida=?',
      [data.nomea, data.descricao, data.numeroa, data.capacidade, data.tipoambiente, ida]);
  },

  async delete(ida) {
    await pool.query('DELETE FROM Ambientes WHERE ida=?', [ida]);
  },

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Ambientes');
    return rows;
  },

  async getById(ida) {
    const [rows] = await pool.query('SELECT * FROM Ambientes WHERE ida=?', [ida]);
    return rows[0];
  },

  async vincularRecurso({ ida, idr }) {
    await pool.query('INSERT INTO AmbienteRecurso (ida, idr) VALUES (?, ?)', [ida, idr]);
  },

  async removerRecurso({ ida, idr }) {
    await pool.query('DELETE FROM AmbienteRecurso WHERE ida=? AND idr=?', [ida, idr]);
  },

  async listarRecursos(ida) {
    const [rows] = await pool.query(
      'SELECT r.* FROM Recursos r JOIN AmbienteRecurso ar ON r.idr = ar.idr WHERE ar.ida = ?',
      [ida]
    );
    return rows;
  }
};

module.exports = Ambiente;
