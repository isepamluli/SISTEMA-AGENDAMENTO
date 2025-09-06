const express = require('express');
const router = express.Router();

// Simulação de envio de notificação
router.post('/', async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    // Simula entrega
    res.json({ success: true, to, subject, message, deliveredAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
