const pool = require('../config/db');
const Perfil = require('./perfilModel');
const Permissao = require('./permissaoModel');

const PerfilPermissao = {
  // Criar um novo registro
  create: async (idPerfil, idPermissao) => {
    try {
      const [result] = await pool.query(
        'INSERT INTO perfil_permissao (idPerfil, idPermissao) VALUES (?, ?)',
        [idPerfil, idPermissao]
      );
      return { id: result.insertId, idPerfil, idPermissao };
    } catch (error) {
      throw error;
    }
  },

  // Listar todos os registros
  findAll: async () => {
    try {
      const [rows] = await pool.query(`
        SELECT pp.id, pp.idPerfil, pp.idPermissao,
               p.nome AS nomePerfil,
               pr.nome AS nomePermissao
        FROM perfil_permissao pp
        JOIN perfil p ON pp.idPerfil = p.id
        JOIN permissao pr ON pp.idPermissao = pr.id
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Buscar por ID
  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM perfil_permissao WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Atualizar um registro
  update: async (id, idPerfil, idPermissao) => {
    try {
      const [result] = await pool.query(
        'UPDATE perfil_permissao SET idPerfil = ?, idPermissao = ? WHERE id = ?',
        [idPerfil, idPermissao, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  },

  // Deletar um registro
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM perfil_permissao WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = PerfilPermissao;
