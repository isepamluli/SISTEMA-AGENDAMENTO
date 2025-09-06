const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'isepamadm',
  password: process.env.DB_PASSWORD || 'Saae@123',
  database: process.env.DB_NAME || 'agendamentos_escolares',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307, // ALTERADO PARA 3307
  connectionLimit: 10
});

module.exports = pool;
