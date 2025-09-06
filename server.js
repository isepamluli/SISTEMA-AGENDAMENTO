const express = require('express');
const cors = require('cors');
require('dotenv').config();

const funcionarioRoutes = require('./routes/funcionarioRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const permissaoRoutes = require('./routes/permissaoRoutes');
const ambienteRoutes = require('./routes/ambienteRoutes');
const recursoRoutes = require('./routes/recursoRoutes');
const disponibilidadeRoutes = require('./routes/disponibilidadeRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');
const notificacaoRoutes = require('./routes/notificacaoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// rotas
app.use('/funcionarios', funcionarioRoutes);
app.use('/perfis', perfilRoutes);
app.use('/permissoes', permissaoRoutes);
app.use('/ambientes', ambienteRoutes);
app.use('/recursos', recursoRoutes);
app.use('/disponibilidades', disponibilidadeRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/notificacoes', notificacaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
