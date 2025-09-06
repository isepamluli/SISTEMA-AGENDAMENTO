const Disponibilidade = require('../models/disponibilidadeModel');

module.exports = {
  async create(req, res) {
    try {
      const novo = await Disponibilidade.create(req.body);
      res.json(novo);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async list(req, res) {
    try {
      const rows = await Disponibilidade.getAll();
      res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async getById(req, res) {
    try {
      const row = await Disponibilidade.getById(req.params.idd);
      res.json(row);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async update(req, res) {
    try {
      await Disponibilidade.update(req.params.idd, req.body);
      res.json({ message: 'Disponibilidade atualizada' });
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async delete(req, res) {
    try {
      await Disponibilidade.delete(req.params.idd);
      res.json({ message: 'Disponibilidade excluída' });
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async verificarPeriodo(req, res) {
    try {
      const { datad, horainicio, horafim } = req.body;
      const ok = await Disponibilidade.verificarPeriodo(datad, horainicio, horafim);
      res.json({ disponivel: ok });
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
};
