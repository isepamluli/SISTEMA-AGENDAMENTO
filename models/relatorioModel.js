const Agendamento = require('./agendamentoModel');

const Relatorio = {
  async listarAgendamentosComFiltros(filters) {
    // Chama o método do model Agendamento para aplicar os filtros
    return await Agendamento.listarFiltrado(filters);
  }
};

module.exports = Relatorio;
