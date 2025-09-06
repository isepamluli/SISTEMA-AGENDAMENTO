const Funcionario = require('../models/funcionarioModel');
const bcrypt = require('bcryptjs');

module.exports = {
  // Criar novo funcionário
  async create(req, res) {
    try {
      const { nomest, email, telefone, senha } = req.body;
      if (!nomest?.trim() || !email?.trim() || !senha) {
        return res.status(400).json({ error: 'nomest, email e senha são obrigatórios' });
      }

      const hashed = await bcrypt.hash(senha, 8);
      const novo = await Funcionario.create({
        nomest: nomest.trim(),
        email: email.trim(),
        telefone: telefone || null,
        senha: hashed
      });

      res.json(novo);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'E-mail já cadastrado' });
      }
      res.status(500).json({ error: err.message });
    }
  },

  // Listar todos os funcionários
  async list(req, res) {
    try {
      const rows = await Funcionario.getAll();
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Obter funcionário por ID
  async getById(req, res) {
    try {
      const { idf } = req.params;
      const row = await Funcionario.getById(idf);
      if (!row) return res.status(404).json({ error: 'Funcionário não encontrado' });
      res.json(row);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualizar funcionário
  async update(req, res) {
    try {
      const { idf } = req.params;
      const { nomest, email, telefone, senha } = req.body;

      const funcionarioAtual = await Funcionario.getById(idf);
      if (!funcionarioAtual) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }

      const payload = {
        nomest: nomest?.trim() ?? funcionarioAtual.nomest,
        email: email?.trim() ?? funcionarioAtual.email,
        telefone: telefone !== undefined ? telefone : funcionarioAtual.telefone,
        senha: senha ? await bcrypt.hash(senha, 8) : undefined
      };

      const affected = await Funcionario.update(idf, payload);
      if (affected === 0) {
        return res.status(400).json({ error: 'Nenhum campo atualizado' });
      }

      const updated = await Funcionario.getById(idf);
      res.json(updated);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'E-mail já cadastrado' });
      }
      res.status(500).json({ error: err.message });
    }
  },

  // Excluir funcionário
  async delete(req, res) {
    try {
      const { idf } = req.params;
      await Funcionario.delete(idf);
      res.json({ message: 'Funcionário excluído' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Login
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email?.trim() || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const user = await Funcionario.findByEmail(email.trim());
      if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

      const ok = await bcrypt.compare(senha, user.senha);
      if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });

      res.json({
        message: 'Autenticado',
        user: { idf: user.idf, nomest: user.nomest, email: user.email, telefone: user.telefone }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Listar perfis do funcionário
  async listarPerfis(req, res) {
    try {
      const { idf } = req.params;
      const rows = await Funcionario.listPerfis(idf);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Obter agenda via procedure
  async getAgendaByUsuario(req, res) {
    try {
      const { idf } = req.params;
      const rows = await Funcionario.callGetAgendaPorUsuario(idf);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
