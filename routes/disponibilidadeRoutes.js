const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/disponibilidadeController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:idd', ctrl.getById);
router.put('/:idd', ctrl.update);
router.delete('/:idd', ctrl.delete);

router.post('/verificar-periodo', ctrl.verificarPeriodo); // body { datad, horainicio, horafim }

module.exports = router;
