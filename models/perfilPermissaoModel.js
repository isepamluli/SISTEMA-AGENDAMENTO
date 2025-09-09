const pool = require('../config/db');

const PerfilPermissao = {
  async create(idPerfil, idPermissao) {
    const [result] = await pool.query(
      'INSERT INTO perfil_permissao (idPerfil, idPermissao) VALUES (?, ?)',
      [idPerfil, idPermissao]
    );
    return { id: result.insertId, idPerfil, idPermissao };
  },

  async findAll() {
    const [rows] = await pool.query(`
      SELECT pp.id, pp.idPerfil, pp.idPermissao,
             p.nome AS nomePerfil,
             pr.nome AS nomePermissao
      FROM perfil_permissao pp
      JOIN perfil p ON pp.idPerfil = p.id
      JOIN permissao pr ON pp.idPermissao = pr.id
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM perfil_permissao WHERE id = ?', [id]);
    return rows[0];
  },

  async update(id, idPerfil, idPermissao) {
    const [result] = await pool.query(
      'UPDATE perfil_permissao SET idPerfil = ?, idPermissao = ? WHERE id = ?',
      [idPerfil, idPermissao, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM perfil_permissao WHERE id = ?', [id]);
    return result.affectedRows;
  },

  async deleteByPerfilPermissao(idPerfil, idPermissao) {
    await pool.query(
      'DELETE FROM perfil_permissao WHERE idPerfil = ? AND idPermissao = ?',
      [idPerfil, idPermissao]
    );
  },

  async listByPerfil(idPerfil) {
    const [rows] = await pool.query(
      `SELECT pr.* 
         FROM perfil_permissao pp
         JOIN permissao pr ON pr.idPermissao = pp.idPermissao
        WHERE pp.idPerfil = ?`,
      [idPerfil]
    );
    return rows;
  }
};

module.exports = PerfilPermissao;
