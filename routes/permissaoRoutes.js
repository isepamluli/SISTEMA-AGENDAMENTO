const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/permissaoController');

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:idperm', async (req, res) => {
  const Permissao = require('../models/permissaoModel');
  try {
    const row = await Permissao.getById(req.params.idperm);
    res.json(row);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});
router.put('/:idperm', ctrl.update);
router.delete('/:idperm', ctrl.delete);

router.post('/atribuir', ctrl.atribuir); // body { idp, idperm }
router.post('/remover', ctrl.remover);   // body { idp, idperm }
router.get('/perfil/:idp', ctrl.listarPorPerfil);

module.exports = router;
