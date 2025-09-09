const pool = require('../config/db');

const FuncionarioPerfil = {
  async assign({ idf, idp }) {
    await pool.query(
      'INSERT INTO FuncionarioPerfil (idf, idp) VALUES (?, ?)',
      [idf, idp]
    );
    return { idf, idp };
  },

  async remove({ idf, idp }) {
    await pool.query(
      'DELETE FROM FuncionarioPerfil WHERE idf = ? AND idp = ?',
      [idf, idp]
    );
  },

  async listByFuncionario(idf) {
    const [rows] = await pool.query(
      `SELECT p.* 
         FROM Perfil p 
         JOIN FuncionarioPerfil fp ON fp.idp = p.idp
        WHERE fp.idf = ?`,
      [idf]
    );
    return rows;
  }
};

module.exports = FuncionarioPerfil;
