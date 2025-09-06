const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/funcionarioController');

// rotas específicas primeiro
router.post('/login', ctrl.login);
router.get('/:idf/perfis', ctrl.listarPerfis);
router.get('/:idf/agenda', ctrl.getAgendaByUsuario);

// CRUD
router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:idf', ctrl.getById);
router.put('/:idf', ctrl.update);
router.delete('/:idf', ctrl.delete);

module.exports = router;
