const mysql = require('mysql2/promise');
const env = require('../config/env');

// All queries go through this pool with parameter binding (NFR-01: no string-built SQL).
const pool = mysql.createPool({
  ...env.db,
  waitForConnections: true,
  connectionLimit: 10,
  decimalNumbers: true,
  dateStrings: false,
});

module.exports = pool;
