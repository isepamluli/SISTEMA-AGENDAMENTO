const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ambienteController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:ida', ctrl.getById);
router.put('/:ida', ctrl.update);
router.delete('/:ida', ctrl.delete);

router.post('/vincular-recurso', ctrl.vincularRecurso); // body { ida, idr }
router.post('/remover-recurso', ctrl.removerRecurso); // body { ida, idr }
router.get('/:ida/recursos', ctrl.listarRecursos);

module.exports = router;
