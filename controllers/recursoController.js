const Recurso = require('../models/recursoModel');

module.exports = {
  async create(req, res) {
    try {
      const novo = await Recurso.create(req.body);
      res.json(novo);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async list(req, res) {
    try { const rows = await Recurso.getAll(); res.json(rows); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  async getById(req, res) {
    try { const row = await Recurso.getById(req.params.idr); res.json(row); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  async update(req, res) {
    try { await Recurso.update(req.params.idr, req.body); res.json({ message: 'Recurso atualizado' }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  },

  async delete(req, res) {
    try { await Recurso.delete(req.params.idr); res.json({ message: 'Recurso excluído' }); }
    catch (err) { res.status(500).json({ error: err.message }); }
  }
};
