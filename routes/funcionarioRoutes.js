const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/funcionarioController');

// Login deve vir primeiro
router.post('/login', ctrl.login);

// Rotas específicas
router.get('/:idf/perfis', ctrl.listarPerfis);
router.get('/:idf/agenda', ctrl.getAgendaByUsuario);

// CRUD
router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:idf', ctrl.getById);
router.put('/:idf', ctrl.update);
router.delete('/:idf', ctrl.delete);

module.exports = router;
