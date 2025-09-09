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

// Recursos do agendamento
router.post('/:idag/solicitar-recurso', ctrl.solicitarRecurso);
router.get('/:idag/recursos', ctrl.listarRecursos);
router.delete('/:idag/recursos/:idr', ctrl.removerRecurso);

// Disponibilidade
router.post('/verificar-disponibilidade', ctrl.verificarDisponibilidade);

module.exports = router;
