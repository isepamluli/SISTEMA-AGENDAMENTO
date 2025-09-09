const pool = require('../config/db');

const Agendamento = {
  async create({ dataag, horainicio, horafim, eventoag, segmento, qtdpessoas, status, idf, ida, idd }) {
    const [res] = await pool.query(
      `INSERT INTO Agendamento 
       (dataag, horainicio, horafim, eventoag, segmento, qtdpessoas, status, idf, ida, idd) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [dataag, horainicio, horafim, eventoag, segmento, qtdpessoas, status || 'Pendente', idf, ida, idd]
    );
    return await this.getById(res.insertId);
  },

  async update(idag, payload) {
    const current = await this.getById(idag);
    if (!current) return null;

    // mantém valores antigos se não forem enviados
    const data = {
      dataag: payload.dataag ?? current.dataag,
      horainicio: payload.horainicio ?? current.horainicio,
      horafim: payload.horafim ?? current.horafim,
      eventoag: payload.eventoag ?? current.eventoag,
      segmento: payload.segmento ?? current.segmento,
      qtdpessoas: payload.qtdpessoas ?? current.qtdpessoas,
      status: payload.status ?? current.status,
      idf: payload.idf ?? current.idf,
      ida: payload.ida ?? current.ida,
      idd: payload.idd ?? current.idd
    };

    await pool.query(
      `UPDATE Agendamento 
       SET dataag=?, horainicio=?, horafim=?, eventoag=?, segmento=?, qtdpessoas=?, status=?, idf=?, ida=?, idd=? 
       WHERE idag=?`,
      [data.dataag, data.horainicio, data.horafim, data.eventoag, data.segmento, data.qtdpessoas, data.status, data.idf, data.ida, data.idd, idag]
    );

    return await this.getById(idag);
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
    return await this.getById(idag);
  },

  async confirmar(idag) {
    await pool.query('UPDATE Agendamento SET status="Aprovado" WHERE idag=?', [idag]);
    return await this.getById(idag);
  },

  async solicitarRecurso(idag, idr) {
    await pool.query(
      'INSERT INTO AgendamentoRecurso (idag, idr) VALUES (?, ?)',
      [idag, idr]
    );
  },

  async listarRecursos(idag) {
    const [rows] = await pool.query(
      `SELECT r.* 
       FROM AgendamentoRecurso ar
       JOIN Recursos r ON r.idr = ar.idr
       WHERE ar.idag = ?`,
      [idag]
    );
    return rows;
  },

  async removerRecurso(idag, idr) {
    await pool.query(
      'DELETE FROM AgendamentoRecurso WHERE idag = ? AND idr = ?',
      [idag, idr]
    );
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
