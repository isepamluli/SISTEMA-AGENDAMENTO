const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/relatorioController');

router.get('/agendamentos', ctrl.listarAgendamentos);

module.exports = router;
