const Relatorio = require('../models/relatorioModel');

module.exports = {
  async listarAgendamentos(req, res) {
    try {
      // Monta os filtros a partir das query params
      const filters = {
        status: req.query.status,
        ida: req.query.ida,
        idf: req.query.idf,
        dataInicio: req.query.dataInicio,
        dataFim: req.query.dataFim
      };

      const agendamentos = await Relatorio.listarAgendamentosComFiltros(filters);
      res.json(agendamentos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
