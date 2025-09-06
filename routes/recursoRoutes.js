const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/recursoController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:idr', ctrl.getById);
router.put('/:idr', ctrl.update);
router.delete('/:idr', ctrl.delete);

module.exports = router;
