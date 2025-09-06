const Perfil = require('../models/perfilModel');

module.exports = {
  async create(req, res) {
    try {
      const novo = await Perfil.create(req.body);
      res.json(novo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req, res) {
    try {
      const rows = await Perfil.getAll();
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { idp } = req.params;
      const row = await Perfil.getById(idp);
      res.json(row);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { idp } = req.params;
      await Perfil.update(idp, req.body);
      res.json({ message: 'Perfil atualizado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { idp } = req.params;
      await Perfil.delete(idp);
      res.json({ message: 'Perfil excluído' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
