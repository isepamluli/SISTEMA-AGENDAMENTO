const pool = require('../config/db');

const Agendamento = {
  async create({ dataag, horainicio, horafim, eventoag, segmento, qtdpessoas, status, idf, ida, idd }) {
    const [res] = await pool.query(
      'INSERT INTO Agendamento (dataag, horainicio, horafim, eventoag, segmento, qtdpessoas, status, idf, ida, idd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [dataag, horainicio, horafim, eventoag, segmento, qtdpessoas, status || 'Pendente', idf, ida, idd]
    );
    return { idag: res.insertId };
  },

  async update(idag, data) {
    await pool.query(
      'UPDATE Agendamento SET dataag=?, horainicio=?, horafim=?, eventoag=?, segmento=?, qtdpessoas=?, status=?, idf=?, ida=?, idd=? WHERE idag=?',
      [data.dataag, data.horainicio, data.horafim, data.eventoag, data.segmento, data.qtdpessoas, data.status, data.idf, data.ida, data.idd, idag]
    );
  },

  async delete(idag) {
    await pool.query('DELETE FROM Agendamento WHERE idag=?', [idag]);
  },

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Agendamento');
    return rows;
  },

  async getById(idag) {
    const [rows] = await pool.query('SELECT * FROM Agendamento WHERE idag=?', [idag]);
    return rows[0];
  },

  async cancelar(idag) {
    await pool.query('UPDATE Agendamento SET status="Cancelado" WHERE idag=?', [idag]);
  },

  async confirmar(idag) {
    await pool.query('UPDATE Agendamento SET status="Aprovado" WHERE idag=?', [idag]);
  },

  async solicitarRecurso(idag, idr) {
    await pool.query('INSERT INTO AgendamentoRecurso (idag, idr) VALUES (?, ?)', [idag, idr]);
  },

  async listarFiltrado({ status, ida, idf, dataInicio, dataFim } = {}) {
    let sql = 'SELECT * FROM Agendamento WHERE 1=1';
    const params = [];
    if (status) { sql += ' AND status=?'; params.push(status); }
    if (ida) { sql += ' AND ida=?'; params.push(ida); }
    if (idf) { sql += ' AND idf=?'; params.push(idf); }
    if (dataInicio) { sql += ' AND dataag>=?'; params.push(dataInicio); }
    if (dataFim) { sql += ' AND dataag<=?'; params.push(dataFim); }
    const [rows] = await pool.query(sql, params);
    return rows;
  }
};

module.exports = Agendamento;
