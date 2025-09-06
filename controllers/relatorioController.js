const Relatorio = require('../models/relatorioModel');

module.exports = {
  async listarAgendamentos(req, res) {
    try {
      const filters = {
        status: req.query.status,
        ida: req.query.ida,
        idf: req.query.idf,
        dataInicio: req.query.dataInicio,
        dataFim: req.query.dataFim
      };
      const rows = await Relatorio.listarAgendamentosComFiltros(filters);
      res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
};
