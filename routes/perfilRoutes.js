const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/perfilController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:idp', ctrl.getById);
router.put('/:idp', ctrl.update);
router.delete('/:idp', ctrl.delete);

module.exports = router;
