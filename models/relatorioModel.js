const Agendamento = require('./agendamentoModel');

const Relatorio = {
  async listarAgendamentosComFiltros(filters) {
    return await Agendamento.listarFiltrado(filters);
  }
};

module.exports = Relatorio;
