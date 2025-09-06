const pool = require('./config/db');

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1+1 AS result');
    console.log('Conexão OK:', rows[0].result);
  } catch (err) {
    console.error('Erro de conexão:', err.message);
  }
}

testConnection();
