const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// Rota para listar agendamentos com filtros
router.get('/agendamentos', relatorioController.listarAgendamentos);

module.exports = router;
