const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/agendamentoController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/filtrar', ctrl.listarFiltrado);
router.get('/:idag', ctrl.getById);
router.put('/:idag', ctrl.update);
router.delete('/:idag', ctrl.delete);

router.post('/:idag/cancelar', ctrl.cancelar);
router.post('/:idag/confirmar', ctrl.confirmar);
router.post('/:idag/solicitar-recurso', ctrl.solicitarRecurso);

router.post('/verificar-disponibilidade', ctrl.verificarDisponibilidade);

module.exports = router;
