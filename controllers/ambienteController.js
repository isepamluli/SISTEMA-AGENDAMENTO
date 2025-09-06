const Ambiente = require('../models/ambienteModel');

module.exports = {
  async create(req, res) {
    try {
      const novo = await Ambiente.create(req.body);
      res.json(novo);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async list(req, res) {
    try {
      const rows = await Ambiente.getAll();
      res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async getById(req, res) {
    try {
      const { ida } = req.params;
      const row = await Ambiente.getById(ida);
      res.json(row);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async update(req, res) {
    try {
      const { ida } = req.params;
      await Ambiente.update(ida, req.body);
      res.json({ message: 'Ambiente atualizado' });
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async delete(req, res) {
    try {
      const { ida } = req.params;
      await Ambiente.delete(ida);
      res.json({ message: 'Ambiente excluído' });
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async vincularRecurso(req, res) {
    try {
      await Ambiente.vincularRecurso(req.body); // { ida, idr }
      res.json({ message: 'Recurso vinculado ao ambiente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async removerRecurso(req, res) {
    try {
      await Ambiente.removerRecurso(req.body);
      res.json({ message: 'Recurso removido do ambiente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
  },

  async listarRecursos(req, res) {
    try {
      const { ida } = req.params;
      const rows = await Ambiente.listarRecursos(ida);
      res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
};
