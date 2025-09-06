const Agendamento = require('../models/agendamentoModel');
const Disponibilidade = require('../models/disponibilidadeModel');

module.exports = {
  async create(req, res) {
    try {
      const novo = await Agendamento.create(req.body);
      res.json(novo);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async list(req, res) {
    try {
      const rows = await Agendamento.getAll();
      res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async getById(req, res) {
    try { const row = await Agendamento.getById(req.params.idag); res.json(row); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  async update(req, res) {
    try { await Agendamento.update(req.params.idag, req.body); res.json({ message: 'Agendamento atualizado' }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  async delete(req, res) {
    try { await Agendamento.delete(req.params.idag); res.json({ message: 'Agendamento excluído' }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  async cancelar(req, res) {
    try { await Agendamento.cancelar(req.params.idag); res.json({ message: 'Agendamento cancelado' }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  async confirmar(req, res) {
    try { await Agendamento.confirmar(req.params.idag); res.json({ message: 'Agendamento confirmado' }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  async solicitarRecurso(req, res) {
    try {
      const { idr } = req.body;
      await Agendamento.solicitarRecurso(req.params.idag, idr);
      res.json({ message: 'Recurso solicitado para agendamento' });
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async verificarDisponibilidade(req, res) {
    try {
      const { datad, horainicio, horafim } = req.body;
      const ok = await Disponibilidade.verificarPeriodo(datad, horainicio, horafim);
      res.json({ disponivel: ok });
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async listarFiltrado(req, res) {
    try {
      const filters = {
        status: req.query.status,
        ida: req.query.ida,
        idf: req.query.idf,
        dataInicio: req.query.dataInicio,
        dataFim: req.query.dataFim
      };
      const rows = await Agendamento.listarFiltrado(filters);
      res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
};
