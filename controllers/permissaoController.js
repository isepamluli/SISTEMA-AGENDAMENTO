const Permissao = require('../models/permissaoModel');
const PerfilPermissao = require('../models/perfilPermissaoModel');

module.exports = {
  async create(req, res) {
    try {
      const novo = await Permissao.create(req.body);
      res.json(novo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req, res) {
    try {
      const rows = await Permissao.getAll();
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { idperm } = req.params;
      await Permissao.update(idperm, req.body);
      res.json({ message: 'Permissão atualizada' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { idperm } = req.params;
      await Permissao.delete(idperm);
      res.json({ message: 'Permissão excluída' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async atribuir(req, res) {
    try {
      await PerfilPermissao.assign(req.body); // { idp, idperm }
      res.json({ message: 'Permissão atribuída ao perfil' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async remover(req, res) {
    try {
      await PerfilPermissao.remove(req.body);
      res.json({ message: 'Permissão removida do perfil' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async listarPorPerfil(req, res) {
    try {
      const { idp } = req.params;
      const rows = await PerfilPermissao.listByPerfil(idp);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
