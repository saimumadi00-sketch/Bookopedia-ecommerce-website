const pool = require('../db/pool');

const PUBLIC_COLUMNS = 'user_id, name, email, role, phone, address, created_at';

module.exports = {
  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await pool.execute(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE user_id = ?`, [id]);
    return rows[0] || null;
  },

  async create({ name, email, passwordHash, phone = null, address = null }) {
    const [result] = await pool.execute(
      `INSERT INTO users (name, email, password_hash, role, phone, address)
       VALUES (?, ?, ?, 'Customer', ?, ?)`,
      [name, email, passwordHash, phone, address]
    );
    return this.findById(result.insertId);
  },

  async updateProfile(id, { name, phone, address }) {
    await pool.execute(
      `UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone), address = COALESCE(?, address)
       WHERE user_id = ?`,
      [name ?? null, phone ?? null, address ?? null, id]
    );
    return this.findById(id);
  },

  async updatePassword(id, passwordHash, conn = pool) {
    await conn.execute('UPDATE users SET password_hash = ? WHERE user_id = ?', [passwordHash, id]);
  },

  async listCustomers({ limit, offset }) {
    const [rows] = await pool.query(
      `SELECT ${PUBLIC_COLUMNS} FROM users WHERE role = 'Customer' ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM users WHERE role = 'Customer'`);
    return { rows, total };
  },
};
